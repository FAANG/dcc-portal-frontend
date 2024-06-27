import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubprojectDetailComponent } from './subproject-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxPaginationModule} from 'ngx-pagination';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SubprojectDetailComponent', () => {
  let component: SubprojectDetailComponent;
  let fixture: ComponentFixture<SubprojectDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        SubprojectDetailComponent,
        HeaderComponent,
        RelatedItemsComponent,
        RobustLinkComponent
    ],
    imports: [RouterTestingModule,
        NgxPaginationModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprojectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
