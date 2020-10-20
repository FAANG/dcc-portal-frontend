import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsdaBovineComponent } from './usda-bovine.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UsdaBovineComponent', () => {
  let component: UsdaBovineComponent;
  let fixture: ComponentFixture<UsdaBovineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsdaBovineComponent,
        HeaderComponent,
        RelatedItemsComponent,
        RobustLinkComponent
      ],
      imports: [
        RouterTestingModule,
        NgxPaginationModule,
        HttpClientTestingModule
      ]
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
