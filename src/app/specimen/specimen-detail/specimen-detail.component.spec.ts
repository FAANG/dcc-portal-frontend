import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimenDetailComponent } from './specimen-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';

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
      ]
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
});
