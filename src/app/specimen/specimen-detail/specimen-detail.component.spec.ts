import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SpecimenDetailComponent } from './specimen-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {Router} from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';
import {of as observableOf} from 'rxjs';
import {getProtocolLink} from '../../shared/common_functions';

describe('SpecimenDetailComponent', () => {
  let component: SpecimenDetailComponent;
  let fixture: ComponentFixture<SpecimenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpecimenDetailComponent,
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
    fixture = TestBed.createComponent(SpecimenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dealWithAvailability should return email', () => {
    expect(component.dealWithAvailability('mailto:test@test.com')).toEqual('test@test.com');
    expect(component.dealWithAvailability('test@test.com')).toEqual('test@test.com');
  });

  it('should set specimen data', () => {
    const service = TestBed.get(ApiDataService);
    const response = {
      hits: {
        hits: [
          {
            _source: {
              biosampleId: 'SAMEA104728909',
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
    spyOn(service, 'getSpecimen').and.returnValue(observableOf(response));
    component.ngOnInit();
    expect(service.getSpecimen).toHaveBeenCalled();
    expect(component.specimen).toEqual({biosampleId: 'SAMEA104728909', publishedArticles: [{year: 2020}, {year: 2019}, {year: 2018}]});
  });

  it('should navigate to 404 when specimen not found', () => {
    const service = TestBed.get(ApiDataService);
    const router = TestBed.get(Router);
    const response = {
      hits: {
        hits: []
      }
    }
    spyOn(service, 'getSpecimen').and.returnValue(observableOf(response));
    spyOn(router, 'navigate').and.stub();
    component.ngOnInit();
    expect(service.getSpecimen).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['404']);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
