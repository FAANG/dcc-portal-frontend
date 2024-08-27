import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsdaBovineComponent } from './usda-bovine.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxPaginationModule} from 'ngx-pagination';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UsdaBovineComponent', () => {
  let component: UsdaBovineComponent;
  let fixture: ComponentFixture<UsdaBovineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        UsdaBovineComponent,
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
    fixture = TestBed.createComponent(UsdaBovineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
