import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RulesetSampleComponent } from './ruleset-sample.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HeaderComponent} from '../../shared/header/header.component';
import {ApiDataService} from '../../services/api-data.service'
import {of as observableOf} from 'rxjs';

describe('RulesetSampleComponent', () => {
  let component: RulesetSampleComponent;
  let fixture: ComponentFixture<RulesetSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RulesetSampleComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesetSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get ruleset for samples', inject([ApiDataService], (service: ApiDataService) => {
    let response = {
      "title": "Sample core metadata rules",
      "description": 'description1',
      "properties": {
        "schema_version": {
          "type": "string"
        },
        "describedBy": {
          "const": 'https://github.com/FAANG/faang-metadata/blob/master/docs/faang_sample_metadata.md'
        },
        "project": {
          "type": "object",
          "name": "Project",
          "properties": {
            "value": {
              "const": "FAANG"
            },
            "mandatory": {
              "const": "mandatory"
            }
          }
        },
        "secondary_project": {
          "name": "Secondary project",
          "items": {
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "enum": ["AQUA-FAANG", "GENE-SWitCH", "BovReg"]
              },
              "mandatory": {
                "const": "mandatory"
              }
            }
          }
        },
        "availability": {
          "type": "object",
          "name": "Availability",
          "properties": {
            "value": {
              "type": "string",
              "format": "uri"
            },
            "mandatory": {
              "const": "optional"
            }
          }
        }
      }
    };
    spyOn(service, 'getRulesetSample').and.returnValue(observableOf(response));
    component.ngOnInit();
    expect(service.getRulesetSample).toHaveBeenCalledWith('standard');
    expect(component.name).toEqual('Sample core metadata rules');
    expect(component.description).toEqual('description1');
    expect(component.details).toEqual('https://github.com/FAANG/faang-metadata/blob/master/docs/faang_sample_metadata.md');
    expect(component.length).toEqual(3);
    expect(component.rules.length).toEqual(5);
  }));

  it('should get condition', () => {
    component.active_rule = 'Organism';
    expect(component.getCondition('child_of')).toEqual('Must meet condition: Material is organism');
    expect(component.getCondition('self')).toEqual('organism');
    component.active_rule = 'Specimen';
    expect(component.getCondition('derived_from')).toEqual('Must meet condition: Material is organism');
    expect(component.getCondition('self')).toEqual('specimen from organism');
    component.active_rule = 'Pool of specimens';
    expect(component.getCondition('derived_from')).toEqual('Must meet condition: Material is specimen from organism');
    expect(component.getCondition('self')).toEqual('pool of specimens');
    component.active_rule = 'Purified cells';
    expect(component.getCondition('derived_from')).toEqual('Must meet condition: Material is specimen from organism');
    expect(component.getCondition('self')).toEqual('cell specimen');
    component.active_rule = 'Cell culture';
    expect(component.getCondition('derived_from')).toEqual('Must meet condition: Material is one of specimen from organism or cell specimen');
    expect(component.getCondition('self')).toEqual('cell culture');
    component.active_rule = 'Cell line';
    expect(component.getCondition('self')).toEqual('cell line');
    expect(component.getCondition('derived_from')).toBeUndefined();
  });

  it('should get type', () => {
    let data1 = {
      "properties": {
        "value": {
          "type": "string",
          "format": "uri"
        }
      }
    }
    expect(component.getType(data1)).toEqual('uri');
    let data2 = {
      "items": {
        "properties": {
          "value": {
            "type": "string",
            "format": "uri"
          }
        }
      }
    }
    expect(component.getType(data2)).toEqual('uri');
    let data3 = {
      "properties": {
        "value": {
          "type": "string"
        }
      }
    }
    expect(component.getType(data3)).toEqual('string');
    let data4 = {
      "properties": {
        "value": {
          "const": "test"
        }
      }
    }
    expect(component.getType(data4)).toEqual('constant');
    let data5 = {
      "properties": {
        "text": "sampleText",
        "term": "sampleTerm"
      }
    }
    expect(component.getType(data5)).toEqual('ontology id');
    let data6 = {
      "properties": {
        "value": {
          "oneOf": [
            {"type": "type1"},
            {"type": "type2"}
          ]
        }
      }
    }
    expect(component.getType(data6)).toEqual('type1');
    let data7 = {
      "properties": {
        "value": {
          "oneOf": [{}]
        }
      }
    }
    expect(component.getType(data7)).toBeUndefined();
    let data8 = {
      "properties": {
        "value": {}
      }
    }
    expect(component.getType(data8)).toBeUndefined();
  });

  it('should get mandatory field', () => {
    let data1 = {
      "properties": {
        "mandatory": {
          "const": "optional"
        }
      }
    }
    expect(component.getMandatoryField(data1)).toEqual('optional');
    let data2 = {
      "items": {
        "properties": {
          "mandatory": {
            "const": "mandatory"
          }
        }
      }
    }
    expect(component.getMandatoryField(data2)).toEqual('mandatory');
  });

  it('should get valid values', () => {
    let data1 = {
      "properties": {
        "value": {
          "enum": ['val1', 'val2']
        }
      }
    }
    expect(component.getValidValues(data1)).toEqual('val1, val2');
    let data2 = {
      "items": {
        "properties": {
          "value": {
            "enum": ['val1', 'val2']
          }
        }
      }
    }
    expect(component.getValidValues(data2)).toEqual('val1, val2');
    let data3 = {
      "properties": {
        "value": {
          "const": "test"
        }
      }
    }
    expect(component.getValidValues(data3)).toEqual('test');
    let data4 = {
      "properties": {
        "text": {
          "enum": ['text1', 'text2']
        }
      }
    }
    expect(component.getValidValues(data4)).toEqual('text1, text2');
    let data5 = {
      "properties": {
        "value": {}
      }
    }
    expect(component.getValidValues(data5)).toBeUndefined();
  });

  it('should get valid units', () => {
    let data1 = {
      "properties": {
        "units": {
          "enum": ['val1', 'val2']
        }
      }
    }
    expect(component.getValidUnits(data1)).toEqual('val1, val2');
    let data2 = {
      "items": {
        "properties": {
          "units": {
            "enum": ['val1', 'val2']
          }
        }
      }
    }
    expect(component.getValidUnits(data2)).toEqual('val1, val2');
    let data3 = {
      "properties": {
        "units": {
          "const": "test"
        }
      }
    }
    expect(component.getValidUnits(data3)).toEqual('test');
    let data4 = {
      "properties": {
        "value": {}
      }
    }
    expect(component.getValidUnits(data4)).toBeUndefined();
  });

  it('should get valid terms', () => {
    let data1 = {
      "properties": {
        "term": {
          "enum": ['val1', 'val2']
        }
      }
    }
    expect(component.getValidTerms(data1)).toEqual(['val1', 'val2']);
    let data2 = {
      "items": {
        "properties": {
          "term": {
            "enum": ['val1', 'val2']
          }
        }
      }
    }
    expect(component.getValidTerms(data2)).toEqual(['val1', 'val2']);
    let data3 = {
      "properties": {
        "term": {
          "graph_restriction": {
            "classes": ["class1", "class2"]
          }
        }
      }
    }
    expect(component.getValidTerms(data3)).toEqual(["class1", "class2"]);
    let data4 = {
      "properties": {
        "term": {
          "oneOf": [
            {"graph_restriction": {
              "classes": ["class1", "class2"]
            }}
          ]
        }
      }
    }
    expect(component.getValidTerms(data4)).toEqual(["class1", "class2"]);
    let data5 = {
      "properties": {
        "term": {
          "oneOf": [{}]
        }
      }
    }
    expect(component.getValidTerms(data5)).toBeUndefined();
    let data6 = {
      "properties": {
        "value": {}
      }
    }
    expect(component.getValidTerms(data6)).toBeUndefined();
  });

  it('should get ontology name', () => {
    let data1 = {
      "properties": {
        "ontology_name": {
          "const": "testName"
        }
      }
    }
    expect(component.getOntologyName(data1)).toEqual(['testName']);
    let data2 = {
      "items": {
        "properties": {
          "ontology_name": {
            "const": "testName"
          }
        }
      }
    }
    expect(component.getOntologyName(data2)).toEqual(['testName']);
    let data3 = {
      "properties": {
        "ontology_name": {
          "enum": ['val1', 'val2']
        }
      }
    }
    expect(component.getOntologyName(data3)).toEqual(['val1', 'val2']);
    let data4 = {
      "properties": {
        "ontology_name": {}
      }
    }
    expect(component.getOntologyName(data4)).toBeUndefined();
    let data5 = {
      "properties": {
      }
    }
    expect(component.getOntologyName(data5)).toBeUndefined();
  });

  it('should check if rule is active', () => {
    component.active_rule = 'rule1';
    expect(component.checkIsActive('rule1')).toEqual(true);
    expect(component.checkIsActive('rule2')).toEqual(false);
  });

  it('should get rule', inject([ApiDataService], (service: ApiDataService) => {
    let response = {
      "title": "Sample core metadata rules",
      "description": 'description1',
      "properties": {
        "describedBy": {
          "const": 'https://github.com/FAANG/faang-metadata/blob/master/docs/faang_sample_metadata.md'
        },
        "project": {
          "type": "object",
          "name": "Project",
          "properties": {
            "value": {
              "const": "FAANG"
            },
            "mandatory": {
              "const": "mandatory"
            }
          }
        },
        "secondary_project": {
          "name": "Secondary project",
          "items": {
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "enum": ["AQUA-FAANG", "GENE-SWitCH", "BovReg"]
              },
              "mandatory": {
                "const": "mandatory"
              }
            }
          }
        }
      }
    };
    spyOn(service, 'getRulesetSample').and.returnValue(observableOf(response));
    component.clickOnRule('Standard rules');
    expect(service.getRulesetSample).toHaveBeenCalledWith('standard_rules');
    expect(component.length).toEqual(2);
    expect(component.rules.length).toEqual(3);
  }));

  it('should toggle mandatory only', () => {
    component.mandatory_only = false;
    component.mandatory_data = {
      "title": "Sample core metadata rules",
      "description": 'description1',
      "properties": {
        "schema_version": {
          "type": "string"
        },
        "describedBy": {
          "const": 'https://github.com/FAANG/faang-metadata/blob/master/docs/faang_sample_metadata.md'
        },
        "project": {
          "type": "object",
          "name": "Project",
          "properties": {
            "value": {
              "const": "FAANG"
            },
            "mandatory": {
              "const": "mandatory"
            }
          }
        },
        "secondary_project": {
          "name": "Secondary project",
          "items": {
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "enum": ["AQUA-FAANG", "GENE-SWitCH", "BovReg"]
              },
              "mandatory": {
                "const": "mandatory"
              }
            }
          }
        }
      }
    };
    component.all_data = {
      "title": "Sample core metadata rules",
      "description": 'description1',
      "properties": {
        "schema_version": {
          "type": "string"
        },
        "describedBy": {
          "const": 'https://github.com/FAANG/faang-metadata/blob/master/docs/faang_sample_metadata.md'
        },
        "project": {
          "type": "object",
          "name": "Project",
          "properties": {
            "value": {
              "const": "FAANG"
            },
            "mandatory": {
              "const": "mandatory"
            }
          }
        },
        "secondary_project": {
          "name": "Secondary project",
          "items": {
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "enum": ["AQUA-FAANG", "GENE-SWitCH", "BovReg"]
              },
              "mandatory": {
                "const": "mandatory"
              }
            }
          }
        },
        "availability": {
          "type": "object",
          "name": "Availability",
          "properties": {
            "value": {
              "type": "string",
              "format": "uri"
            },
            "mandatory": {
              "const": "optional"
            }
          }
        }
      }
    };
    component.mandatoryOnlyToggle();
    expect(component.mandatory_only).toEqual(true);
    expect(component.length).toEqual(2);
    expect(component.rules.length).toEqual(4);
    component.mandatoryOnlyToggle();
    expect(component.mandatory_only).toEqual(false);
    expect(component.length).toEqual(3);
    expect(component.rules.length).toEqual(5);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
