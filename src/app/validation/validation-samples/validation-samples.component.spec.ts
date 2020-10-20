import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationSamplesComponent } from './validation-samples.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ValidationSamplesComponent', () => {
  let component: ValidationSamplesComponent;
  let fixture: ComponentFixture<ValidationSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ValidationSamplesComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        FileUploadModule,
        NgxSmartModalModule,
        HttpClientTestingModule
      ],
      providers: [
        NgxSmartModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
