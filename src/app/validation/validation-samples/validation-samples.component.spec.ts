import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidationSamplesComponent } from './validation-samples.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ValidationSamplesComponent', () => {
  let component: ValidationSamplesComponent;
  let fixture: ComponentFixture<ValidationSamplesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        ValidationSamplesComponent,
        HeaderComponent
    ],
    imports: [RouterTestingModule,
        FileUploadModule,
        NgxSmartModalModule],
    providers: [
        NgxSmartModalService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
