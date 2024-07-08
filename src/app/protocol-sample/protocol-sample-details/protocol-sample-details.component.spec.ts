import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProtocolSampleDetailsComponent } from './protocol-sample-details.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProtocolSampleDetailsComponent', () => {
  let component: ProtocolSampleDetailsComponent;
  let fixture: ComponentFixture<ProtocolSampleDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        ProtocolSampleDetailsComponent,
        HeaderComponent,
        RobustLinkComponent
    ],
    imports: [NgxPaginationModule,
        RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolSampleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
