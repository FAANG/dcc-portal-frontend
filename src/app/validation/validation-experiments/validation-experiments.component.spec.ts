import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { ValidationExperimentsComponent } from './validation-experiments.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxSmartModalModule, NgxSmartModalService, ɵa as NgxSmartModalStackService} from 'ngx-smart-modal';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import {ApiDataService} from '../../services/api-data.service'
import {of as observableOf} from 'rxjs';

describe('ValidationExperimentsComponent', () => {
  let component: ValidationExperimentsComponent;
  let fixture: ComponentFixture<ValidationExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ValidationExperimentsComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        FileUploadModule,
        NgxSmartModalModule,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        NgxSmartModalService,
        NgxSmartModalStackService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set validation message', () => {
    expect(component.setValidationResults()).toBeUndefined();
    component.validation_results = {
      sample_data: [
        {
          prop1: 'rec1', 
          prop2: 'test1', 
          experiments_core: {
            assayType: {value: 'test'},
          },
          input_dna: {
            sample: ['test1', 'test2']
          },
          'dna-binding_proteins': {
            sample: {value: 'test'}
          }
        },
        {
          prop1: 'rec2', 
          prop2: 'test2', 
          experiments_core: {
            assayType: {
              value: 'test',
              errors: ['err1', 'err2']
            },
          },
          input_dna: {
            sample: {value: 'test'}
          },
          'dna-binding_proteins': {
            sample: {value: 'test'}
          }
        }
      ]
    }
    spyOn(component, 'setTables').and.callThrough();
    component.setValidationResults();
    expect(component.record_types).toEqual(['sample_data']);
    expect(component.active_key).toEqual('sample_data');
    expect(component.active_table.length).toEqual(2)
    expect(component.setTables).toHaveBeenCalled();
  })

  it('should go back', () => {
    component.goBack();
    expect(component.disableAuthForm).toEqual(false);
    expect(component.submission_message).toEqual('Please login');
    expect(component.submissionResults.length).toEqual(0);
  })

  it('should trigger false click', () => {
    component.myButton = new ElementRef<HTMLElement>(document.createElement("BUTTON"));
    spyOn(component.myButton.nativeElement, 'click');
    component.triggerFalseClick();
    expect(component.myButton.nativeElement.click).toHaveBeenCalled();
  });

  it('should get submission results link for download', () => {
    component.submission_task_id = 'SUB_1';
    const expected_download_link = 'http://data.faang.org/validation_api/submission/download_submission_results/experiments/SUB_1';
    expect(component.downloadSubmissionResults()).toEqual(expected_download_link);
  });

  it('should toggle submissionStarted on click', () => {
    component.submissionStarted = false;
    component.onStartSubmissionClick();
    expect(component.submissionStarted).toEqual(true);
  });

  it('should set model mode', () => {
    component.onChooseModeClick('mode1');
    expect(component.model.mode).toEqual('mode1');
  });

  it('should submit records', inject([ApiDataService], (service: ApiDataService) => {
    spyOn(service, 'submitRecords').and.returnValue(observableOf({id: 'task_id_1'}));
    component.model.username = 'user1';
    component.model.password = 'pwd';
    component.model.mode = 'mode1';
    component.fileid = 'file1';
    component.conversion_task_id = 'conv_task_1';
    component.onSubmit();
    expect(component.disableAuthForm).toEqual(true);
    expect(service.submitRecords).toHaveBeenCalledWith('user1', 'pwd', 'mode1', '', 'file1', 'conv_task_1', 'experiments');
    expect(component.submission_task_id).toEqual('task_id_1');
  }));

  it('should set the right alert message class', () => {
    component.submission_message = 'Error in submission';
    expect(component.submissionMessageClass()).toEqual('alert alert-danger');
    component.submission_message = 'Waiting for submission to complete';
    expect(component.submissionMessageClass()).toEqual('alert alert-warning');
    component.submission_message = 'Successfully completed submission';
    expect(component.submissionMessageClass()).toEqual('alert alert-success');
    component.submission_message = '';
    expect(component.submissionMessageClass()).toEqual('alert alert-primary');
  })

  it('should get download link', () => {
    component.download_data_task_id = 'task_1';
    const expected_download_link = 'http://data.faang.org/validation_api/submission/get_data/task_1';
    expect(component.constructDownloadLink()).toEqual(expected_download_link);
  });

  it('should get download template link', () => {
    component.fileid = 'file_1';
    const expected_template_link = 'http://data.faang.org/validation_api/submission/download_template/file_1';
    expect(component.constructDownloadTemplateLink()).toEqual(expected_template_link);
  });

  it('should check if submission is disabled', () => {
    expect(component.isSubmissionDisabled('Fix issues')).toEqual(true);
    expect(component.isSubmissionDisabled('Done')).toEqual(false);
  });

  it('should get template', inject([ApiDataService], (service: ApiDataService) => {
    spyOn(service, 'getTemplate').and.returnValue(observableOf({id: 'template1'}));
    component.validation_task_id = 'task1';
    component.fileid = 'file1';
    component.getTemplateFile();
    expect(service.getTemplate).toHaveBeenCalledWith('task1', 'file1', 'experiments');
  }));

  it('should start conversion', inject([ApiDataService], (service: ApiDataService) => {
    spyOn(service, 'startConversion').and.returnValue(observableOf({id: 'conv_task_1'}));
    component.conversion_task_id = 'task1';
    component.fileid = 'file1';
    component.startConversion();
    expect(service.startConversion).toHaveBeenCalledWith('task1', 'file1', 'experiments');
    expect(component.download_data_task_id).toEqual('conv_task_1');
  }));

  it('should start validation', inject([ApiDataService], (service: ApiDataService) => {
    spyOn(service, 'startValidation').and.returnValue(observableOf({id: 'val_task_1'}));
    component.conversion_task_id = 'task1';
    component.fileid = 'file1';
    component.startValidation();
    expect(component.validation_started).toEqual(true);
    expect(service.startValidation).toHaveBeenCalledWith('task1', 'file1', 'experiments');
    expect(component.validation_task_id).toEqual('val_task_1');
  }));

  it('should get the right status class', () => {
    expect(component.statusClass('Undefined')).toEqual('badge badge-pill badge-info');
    expect(component.statusClass('Finished')).toEqual('badge badge-pill badge-info');
    expect(component.statusClass('Waiting')).toEqual('badge badge-pill badge-warning');
    expect(component.statusClass('Preparing data')).toEqual('badge badge-pill badge-warning');
    expect(component.statusClass('Success')).toEqual('badge badge-pill badge-success');
    expect(component.statusClass('Ready for submission')).toEqual('badge badge-pill badge-success');
    expect(component.statusClass('Data is ready')).toEqual('badge badge-pill badge-success');
    expect(component.statusClass('Error')).toEqual('badge badge-pill badge-danger');
    expect(component.statusClass('Fix issues')).toEqual('badge badge-pill badge-danger');
    expect(component.statusClass('Failed to convert data')).toEqual('badge badge-pill badge-danger');
    expect(component.statusClass('invalid status')).toBeUndefined();
  });

  it('should show records that passed/failed validation test', () => {
    component.records_that_pass = [{id: 'rec1'}, {id: 'rec2'}];
    component.records_with_issues = [{id: 'rec3'}, {id: 'rec4'}];
    component.onValidationResultsButtonClick('passed');
    expect(component.records_to_show).toEqual([{id: 'rec1'}, {id: 'rec2'}]);
    component.onValidationResultsButtonClick('failed');
    expect(component.records_to_show).toEqual([{id: 'rec3'}, {id: 'rec4'}]);
  });

  it('should set active records on record button click', () => {
    component.validation_results = {
      sample_data: [
        {prop1: 'rec1', prop2: 'test1', custom: {sample_descriptor: {value: 'sample_val1'}}},
        {prop1: 'rec2', prop2: 'test2', custom: {sample_descriptor: {value: 'sample_val2'}}}
      ],
      sample_data2: [
        {prop1: 'rec21', prop2: 'test21', custom: {sample_descriptor: {value: 'sample_val22'}}},
      ]
    }
    spyOn(component, 'setTables').and.callThrough();
    component.onRecordButtonClick('sample_data2');
    expect(component.active_key).toEqual('sample_data2');
    expect(component.active_table.length).toEqual(1);
    expect(component.show_table).toEqual(false);
    expect(component.setTables).toHaveBeenCalled();
  });

  it('should check if records button is active', () => {
    component.active_issue = 'issues';
    expect(component.isRecordsButtonActive('issues')).toEqual('active');
    expect(component.isRecordsButtonActive('passed')).toEqual('inactive');
  });

  it('should check if button is active', () => {
    component.active_key = 'sample_data1';
    expect(component.isButtonActive('sample_data1')).toEqual('active');
    expect(component.isButtonActive('sample_data2')).toEqual('inactive');
  });

  it('should remove underscores', () => {
    expect(component.remove_underscores('test_data')).toEqual('test data');
    expect(component.remove_underscores('test data')).toEqual('test data');
    expect(component.remove_underscores('test__data')).toEqual('test  data');
    expect(component.remove_underscores('_')).toEqual(' ');
    expect(component.remove_underscores('')).toEqual('');
  });

  it('should get cell style', () => {
    component.table_errors = [
      ['valid', 'invalid'],
      ['invalid', 'valid']
    ];
    component.table_warnings = [
      ['invalid', 'valid'],
      ['valid', 'valid']
    ];
    component.active_issue = 'issues';
    expect(component.getCellStyle(0,1)).toEqual('pointer');
    expect(component.getCellStyle(0,0)).toEqual('pointer');
    expect(component.getCellStyle(1,1)).toEqual('auto');
    component.active_issue = 'passed';
    expect(component.getCellStyle(0,1)).toEqual('auto');
    expect(component.getCellStyle(0,0)).toEqual('auto');
    expect(component.getCellStyle(1,1)).toEqual('auto');
  });

  it('should get cell class', () => {
    component.table_errors = [
      ['valid', 'invalid'],
      ['invalid', 'valid']
    ];
    component.table_warnings = [
      ['invalid', 'valid'],
      ['valid', 'valid']
    ];
    component.active_issue = 'issues';
    expect(component.getCellClass(0,1)).toEqual('table-danger');
    expect(component.getCellClass(0,0)).toEqual('table-warning');
    expect(component.getCellClass(1,1)).toBeUndefined();
    component.active_issue = 'passed';
    expect(component.getCellClass(0,1)).toBeUndefined();
    expect(component.getCellClass(0,0)).toBeUndefined();
    expect(component.getCellClass(1,1)).toBeUndefined();
  });

  it('should check if data has errors/warnings', () => {
    let data = {id: 'rec1', errors: ['error1', 'error2']};
    expect(component.dataHasErrors(data, 'errors')).toEqual(['error1', 'error2']);
    expect(component.dataHasErrors(data, 'warnings')).toEqual('valid');
  });

  it('should parse column names', () => {
    let data = {
            assayType: {value: 'test'},
            sample: ['test1'],
            prop: {
              term: 'testTerm',
              units: 'testUnits'
            }
    }
    component.parseColumnNames(data);
    expect(component.column_names).toEqual(['AssayType', 'Sample', 'Prop', 'Term Source ID', 'Unit']);
  });

  it('should parse column data', () => {
    let data = {
            prop1: {
              term: 'testTerm'
            },
            prop2: {
              text: 'testText',
              errors: 'err1'
            },
            prop3: {
              value: 'testValue',
              errors: 'err2',
              warnings: 'warn1'
            },
            prop4: {
              units: 'testUnits',
              warnings: 'warn2'
            }
    }
    let response = component.parseColumnData(data);
    expect(response).toEqual({
      data: ['testTerm', 'testText', 'testValue', 'testUnits'],
      errors: ['valid', 'err1', 'err2', 'valid'],
      warnings: ['valid', 'valid', 'warn1', 'warn2']
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
