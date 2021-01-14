import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnalysisDetailComponent } from './analysis-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {Router} from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';
import {of as observableOf} from 'rxjs';

describe('AnalysisDetailComponent', () => {
  let component: AnalysisDetailComponent;
  let fixture: ComponentFixture<AnalysisDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AnalysisDetailComponent,
        HeaderComponent,
        RobustLinkComponent,
        RelatedItemsComponent,
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
    fixture = TestBed.createComponent(AnalysisDetailComponent);
    component = fixture.componentInstance;
    component.accession = 'ERZ887818';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set analysis data', () => {
    const service = TestBed.get(ApiDataService);
    const response = {
      hits: {
        hits: [
          {
            _source: {id: 'testId1'}
          }
        ]
      }
    }
    spyOn(service, 'getAnalysis').and.returnValue(observableOf(response));
    component.ngOnInit();
    expect(service.getAnalysis).toHaveBeenCalled();
    expect(component.analysis).toEqual({id: 'testId1'});
  });

  it('should navigate to 404 when analysis not found', () => {
    const service = TestBed.get(ApiDataService);
    const router = TestBed.get(Router);
    const response = {
      hits: {
        hits: []
      }
    }
    spyOn(service, 'getAnalysis').and.returnValue(observableOf(response));
    spyOn(router, 'navigate').and.stub();
    component.ngOnInit();
    expect(service.getAnalysis).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['404']);
  });

  it('should return false', () => {
    expect(component.sampleInES('testId')).toEqual(false);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
