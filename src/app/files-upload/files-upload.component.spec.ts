import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {validation_service_url, validation_ws_url} from '../shared/constants';
import { FilesUploadComponent } from './files-upload.component';
import {FileUploadModule} from 'ng2-file-upload';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'container',
  template: `<input type="file" ng2FileSelect [uploader]="uploader" />`
})
export class ContainerComponent {
  public uploader:FileUploader = new FileUploader({url: 'localhost:3000'});
}

describe('FilesUploadComponent', () => {
  let component: FilesUploadComponent;
  let fixture: ComponentFixture<FilesUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesUploadComponent, ContainerComponent ],
      imports: [FileUploadModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ContainerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the right alert class', () => {
    component.submission_message = 'Starting to validate protocol';
    expect(component.getAlertClass()).toEqual('alert alert-info');
    component.submission_message = 'Uploading protocol';
    expect(component.getAlertClass()).toEqual('alert alert-info');
    component.submission_message = 'Protocol upload failed, please contact faang-dcc@ebi.ac.uk';
    expect(component.getAlertClass()).toEqual('alert alert-danger');
    component.submission_message = 'Successful';
    expect(component.getAlertClass()).toEqual('alert alert-success');
    component.submission_message = '';
    expect(component.getAlertClass()).toBeUndefined();
  });

  it('should set upload url on chooseProtocolType', inject([ContainerComponent], (uploader: ContainerComponent) => {
   component.chooseProtocolType('samples');
    expect(component.UploadURL).toEqual('https://data.faang.org/validation_api/protocols_upload/samples');
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
