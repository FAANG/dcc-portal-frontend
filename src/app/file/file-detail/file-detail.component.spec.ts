import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FileDetailComponent } from './file-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {Router} from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';
import {of as observableOf} from 'rxjs';

describe('FileDetailComponent', () => {
  let component: FileDetailComponent;
  let fixture: ComponentFixture<FileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileDetailComponent,
        HeaderComponent,
        RobustLinkComponent,
        RelatedItemsComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checkIsObject should return true if input is object', () => {
    expect(component.checkIsObject({})).toEqual(true);
  });

  it('checkIsObject should return false if input is not object', () => {
    expect(component.checkIsObject('')).toEqual(false);
  });

  it('should set file data', () => {
    const service = TestBed.get(ApiDataService);
    const response = {
      hits: {
        hits: [
          {
            _source: {
              id: 'testId1',
              publishedArticles: [
                {year: 2019},
                {year: 2020},
                {year: 2018}
              ]
            }
          }
        ]
      }
    };
    spyOn(service, 'getFile').and.returnValue(observableOf(response));
    component.ngOnInit();
    expect(service.getFile).toHaveBeenCalled();
    expect(component.file).toEqual({id: 'testId1', publishedArticles: [{year: 2020}, {year: 2019}, {year: 2018}]});
  });

  it('should set file data', () => {
    const service = TestBed.get(ApiDataService);
    const response = {
      hits: {
        hits: [
          {
            _source: {
              id: 'testId1',
              experiment: {
                accession: 'acc1'
              }
            }
          }
        ]
      }
    }
    const expResponse = {
      hits: {
        hits: [
          {
            _source: {
              id: 'testExpId'
            }
          }
        ]
      }
    };
    spyOn(service, 'getFile').and.returnValue(observableOf(response));
    spyOn(service, 'getExperimentByAccession').and.returnValue(observableOf(expResponse));
    component.ngOnInit();
    expect(service.getFile).toHaveBeenCalled();
    expect(component.file).toEqual({id: 'testId1', experiment: {accession: 'acc1'}});
    expect(service.getExperimentByAccession).toHaveBeenCalledWith('acc1');
  });

  it('should navigate to 404 when file not found', () => {
    const service = TestBed.get(ApiDataService);
    const router = TestBed.get(Router);
    const response = {
      hits: {
        hits: []
      }
    }
    spyOn(service, 'getFile').and.returnValue(observableOf(response));
    spyOn(router, 'navigate').and.stub();
    component.ngOnInit();
    expect(service.getFile).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['404']);
  });

  it('should toggle experiment detail', () => {
    component.showExperimentDetail = true;
    component.toggleExperiment();
    expect(component.showExperimentDetail).toEqual(false);
    component.toggleExperiment();
    expect(component.showExperimentDetail).toEqual(true);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
