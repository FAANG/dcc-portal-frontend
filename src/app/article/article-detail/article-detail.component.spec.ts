import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArticleDetailComponent } from './article-detail.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RelatedItemsComponent } from '../../shared/related-items/related-items.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        ArticleDetailComponent,
        HeaderComponent,
        RobustLinkComponent,
        RelatedItemsComponent,
    ],
    imports: [NgxPaginationModule,
        RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
});
