import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolExperimentDetailsComponent } from './protocol-experiment-details.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSmartModalModule, NgxSmartModalService, ɵa as NgxSmartModalStackService} from 'ngx-smart-modal';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';
import {of as observableOf} from 'rxjs';

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

  it('should set protocol experiments data', () => {
    const service = TestBed.get(ApiDataService);
    const response = {
      hits: {
        hits: [
          {
            _source: {
              id: 'testId1',
              url: 'testurl1'
            }
          }
        ]
      }
    }
    spyOn(service, 'getExperimentProtocol').and.returnValue(observableOf(response));
    component.ngOnInit();
    expect(service.getExperimentProtocol).toHaveBeenCalled();
    expect(component.protocol).toEqual({id: 'testId1', url: 'testurl1'});
  });

  it('should navigate to 404 when protocol experiments not found', () => {
    const service = TestBed.get(ApiDataService);
    const router = TestBed.get(Router);
    const response = {
      hits: {
        hits: []
      }
    }
    spyOn(service, 'getExperimentProtocol').and.returnValue(observableOf(response));
    spyOn(router, 'navigate').and.stub();
    component.ngOnInit();
    expect(service.getExperimentProtocol).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['404']);
  });

  it('should get experiment on click', () => {
    const service = TestBed.get(ApiDataService);
    const response = {
      hits: {
        hits: [
          {
            _source: {
              id: 'testId1',
              url: 'testurl1'
            }
          }
        ]
      }
    }
    spyOn(service, 'getExperimentByAccession').and.returnValue(observableOf(response));
    component.onClick('acc1');
    expect(service.getExperimentByAccession).toHaveBeenCalledWith('acc1');  
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
