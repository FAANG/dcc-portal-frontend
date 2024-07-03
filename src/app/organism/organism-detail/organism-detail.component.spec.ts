import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganismDetailComponent } from './organism-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('OrganismDetailComponent', () => {
  let component: OrganismDetailComponent;
  let fixture: ComponentFixture<OrganismDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [OrganismDetailComponent,
        RobustLinkComponent,
        RelatedItemsComponent, ],
    imports: [NgxPaginationModule,
        RouterTestingModule, HeaderComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
  });
});
