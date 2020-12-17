import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolExperimentDetailsComponent } from './protocol-experiment-details.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSmartModalModule, NgxSmartModalService, ɵa as NgxSmartModalStackService} from 'ngx-smart-modal';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ProtocolExperimentDetailsComponent', () => {
  let component: ProtocolExperimentDetailsComponent;
  let fixture: ComponentFixture<ProtocolExperimentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProtocolExperimentDetailsComponent,
        HeaderComponent,
        RobustLinkComponent
      ],
      imports: [
        NgxPaginationModule,
        NgxSmartModalModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        NgxSmartModalService,
        NgxSmartModalStackService,
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
