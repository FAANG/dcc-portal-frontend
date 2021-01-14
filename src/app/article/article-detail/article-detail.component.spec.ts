import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArticleDetailComponent } from './article-detail.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RelatedItemsComponent } from '../../shared/related-items/related-items.component';
import {Router} from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';
import {of as observableOf} from 'rxjs';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArticleDetailComponent,
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
    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set article data', () => {
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
    spyOn(service, 'getArticle').and.returnValue(observableOf(response));
    component.ngOnInit();
    expect(service.getArticle).toHaveBeenCalled();
    expect(component.article).toEqual({id: 'testId1'});
  });

  it('should navigate to 404 when article not found', () => {
    const service = TestBed.get(ApiDataService);
    const router = TestBed.get(Router);
    const response = {
      hits: {
        hits: []
      }
    }
    spyOn(service, 'getArticle').and.returnValue(observableOf(response));
    spyOn(router, 'navigate').and.stub();
    component.ngOnInit();
    expect(service.getArticle).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['404']);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
