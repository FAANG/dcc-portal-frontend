import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrganismDetailComponent } from './organism-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {Router} from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';
import {of as observableOf} from 'rxjs';

describe('OrganismDetailComponent', () => {
  let component: OrganismDetailComponent;
  let fixture: ComponentFixture<OrganismDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrganismDetailComponent,
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
    fixture = TestBed.createComponent(OrganismDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dealWithAvailability', () => {
    expect(component.dealWithAvailability('mailto:test@test.com')).toEqual('test@test.com');
    expect(component.dealWithAvailability('test@test.com')).toEqual('test@test.com');
  });

  it('should set organism data', () => {
    const service = TestBed.get(ApiDataService);
    const response = {
      hits: {
        hits: [
          {
            _source: {
              biosampleId: 'SAMEA7628708',
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
    spyOn(service, 'getOrganism').and.returnValue(observableOf(response));
    component.ngOnInit();
    expect(service.getOrganism).toHaveBeenCalled();
    expect(component.organism).toEqual({biosampleId: 'SAMEA7628708', publishedArticles: [{year: 2020}, {year: 2019}, {year: 2018}]});
  });

  it('should navigate to 404 when organism not found', () => {
    const service = TestBed.get(ApiDataService);
    const router = TestBed.get(Router);
    const response = {
      hits: {
        hits: []
      }
    }
    spyOn(service, 'getOrganism').and.returnValue(observableOf(response));
    spyOn(router, 'navigate').and.stub();
    component.ngOnInit();
    expect(service.getOrganism).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['404']);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
