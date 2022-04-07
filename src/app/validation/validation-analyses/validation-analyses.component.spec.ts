import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidationAnalysesComponent } from './validation-analyses.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ValidationAnalysesComponent', () => {
  let component: ValidationAnalysesComponent;
  let fixture: ComponentFixture<ValidationAnalysesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ValidationAnalysesComponent,
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
    fixture = TestBed.createComponent(ValidationAnalysesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
