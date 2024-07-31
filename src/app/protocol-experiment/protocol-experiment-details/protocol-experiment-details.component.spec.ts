import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProtocolExperimentDetailsComponent } from './protocol-experiment-details.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProtocolExperimentDetailsComponent', () => {
  let component: ProtocolExperimentDetailsComponent;
  let fixture: ComponentFixture<ProtocolExperimentDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        ProtocolExperimentDetailsComponent,
        HeaderComponent,
        RobustLinkComponent
    ],
    imports: [NgxPaginationModule,
        NgxSmartModalModule,
        RouterTestingModule],
    providers: [
        NgxSmartModalService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolExperimentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getHumanName should return human readable name for protocol', () => {
    expect(component.getHumanName('rnaPreparation3AdapterLigationProtocol')).toEqual('Rna preparation 3\' adapter ligation protocol');
  });

  it('checkIsObject should return true if input is object', () => {
    expect(component.checkIsObject({})).toEqual(true);
  });

  it('checkIsObject should return false if input is not object', () => {
    expect(component.checkIsObject('')).toEqual(false);
  });
});
