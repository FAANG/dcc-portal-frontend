import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatasetDetailComponent } from './dataset-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {Router} from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';
import {of as observableOf} from 'rxjs';

describe('DatasetDetailComponent', () => {
  let component: DatasetDetailComponent;
  let fixture: ComponentFixture<DatasetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatasetDetailComponent,
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
    fixture = TestBed.createComponent(DatasetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dataset data', () => {
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
    }
    spyOn(service, 'getDataset').and.returnValue(observableOf(response));
    component.ngOnInit();
    expect(service.getDataset).toHaveBeenCalled();
    expect(component.dataset).toEqual({id: 'testId1', publishedArticles: [{year: 2020}, {year: 2019}, {year: 2018}]});
  });

  it('should navigate to 404 when dataset not found', () => {
    const service = TestBed.get(ApiDataService);
    const router = TestBed.get(Router);
    const response = {
      hits: {
        hits: []
      }
    }
    spyOn(service, 'getDataset').and.returnValue(observableOf(response));
    spyOn(router, 'navigate').and.stub();
    component.ngOnInit();
    expect(service.getDataset).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['404']);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
