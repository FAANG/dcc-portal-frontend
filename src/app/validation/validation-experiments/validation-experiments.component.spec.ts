import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidationExperimentsComponent } from './validation-experiments.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ValidationExperimentsComponent', () => {
  let component: ValidationExperimentsComponent;
  let fixture: ComponentFixture<ValidationExperimentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ValidationExperimentsComponent],
    imports: [RouterTestingModule,
        FileUploadModule,
        NgxSmartModalModule, HeaderComponent],
    providers: [
        NgxSmartModalService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
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
});
