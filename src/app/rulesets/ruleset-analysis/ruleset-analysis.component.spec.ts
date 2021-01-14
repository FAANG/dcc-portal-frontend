import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RulesetAnalysisComponent } from './ruleset-analysis.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HeaderComponent} from '../../shared/header/header.component';
import {ApiDataService} from '../../services/api-data.service'
import {of as observableOf} from 'rxjs';

describe('RulesetAnalysisComponent', () => {
  let component: RulesetAnalysisComponent;
  let fixture: ComponentFixture<RulesetAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RulesetAnalysisComponent,
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
    fixture = TestBed.createComponent(RulesetAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get ruleset for analysis', inject([ApiDataService], (service: ApiDataService) => {
    const response = {
      "title": "Rules",
      "description": 'description1',
      "rule_groups": {
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
                "const": "optional"
              }
            }
          }
        }
      }
    };
    spyOn(service, 'getRulesetAnalysis').and.returnValue(observableOf(response));
    component.ngOnInit();
    expect(service.getRulesetAnalysis).toHaveBeenCalled();
  }));

  it('should check if rule is active', () => {
    component.fragment = 'rule1';
    expect(component.checkIsActive('rule1')).toEqual(true);
    expect(component.checkIsActive('rule2')).toEqual(false);
  });

  it('should toggle mandatory only', () => {
    component.mandatory_only = false;
    component.mandatory_data = {
      "title": "Rules",
      "description": 'description1',
      "properties": {
        "schema_version": {
          "type": "string"
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
        }
      }
    };
    component.all_data = {
      "title": "Rules",
      "description": 'description1',
      "properties": {
        "schema_version": {
          "type": "string"
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
                "const": "optional"
              }
            }
          }
        }
      }
    };
    component.mandatoryOnlyToggle();
    expect(component.mandatory_only).toEqual(true);
    expect(component.data).toEqual(component.mandatory_data);
    component.mandatoryOnlyToggle();
    expect(component.mandatory_only).toEqual(false);
    expect(component.data).toEqual(component.all_data);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
