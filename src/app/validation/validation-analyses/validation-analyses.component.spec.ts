import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidationAnalysesComponent } from './validation-analyses.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ValidationAnalysesComponent', () => {
  let component: ValidationAnalysesComponent;
  let fixture: ComponentFixture<ValidationAnalysesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ValidationAnalysesComponent],
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
    fixture = TestBed.createComponent(ValidationAnalysesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
