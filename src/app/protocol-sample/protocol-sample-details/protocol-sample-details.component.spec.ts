import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProtocolSampleDetailsComponent } from './protocol-sample-details.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';
import {of as observableOf} from 'rxjs';

describe('ProtocolSampleDetailsComponent', () => {
  let component: ProtocolSampleDetailsComponent;
  let fixture: ComponentFixture<ProtocolSampleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProtocolSampleDetailsComponent,
        HeaderComponent,
        RobustLinkComponent
      ],
      imports: [
        NgxPaginationModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('should set protocol sample data', () => {
    const service = TestBed.get(ApiDataService);
    const response = {
      hits: {
        hits: [
          {
            _source: {
              id: 'testId1',
              url: 'testUrl1'
            }
          }
        ]
      }
    }
    spyOn(service, 'getSampleProtocol').and.returnValue(observableOf(response));
    component.ngOnInit();
    expect(service.getSampleProtocol).toHaveBeenCalled();
    expect(component.file).toEqual({id: 'testId1', url: 'testUrl1'});
  });

  it('should navigate to 404 when protocol sample not found', () => {
    const service = TestBed.get(ApiDataService);
    const router = TestBed.get(Router);
    const response = {
      hits: {
        hits: []
      }
    }
    spyOn(service, 'getSampleProtocol').and.returnValue(observableOf(response));
    spyOn(router, 'navigate').and.stub();
    component.ngOnInit();
    expect(service.getSampleProtocol).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['404']);
  });

  it('should check if array', () => {
    expect(component.checkIsArray(['test'])).toEqual(true);
    expect(component.checkIsArray([])).toEqual(true);
    expect(component.checkIsArray('test')).toEqual(false);
    expect(component.checkIsArray({id: 'test'})).toEqual(false);
  })

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
