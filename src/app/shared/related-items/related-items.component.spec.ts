import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedItemsComponent } from './related-items.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import setting from './related-items.component.setting.json';

describe('RelatedItemsComponent', () => {
  let component: RelatedItemsComponent;
  let fixture: ComponentFixture<RelatedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelatedItemsComponent,
        RobustLinkComponent
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
    fixture = TestBed.createComponent(RelatedItemsComponent);
    component = fixture.componentInstance;
    component.source_type = 'dataset';
    component.target_type = 'file';
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('check display status, name should be true and description expected to be false', () => {
    // component.selected = new Map();
    // component.selected.set('name', true);
    // component.selected.set('description', false);
    expect(component.isDisplayed('File name')).toEqual(true);
    expect(component.isDisplayed('Archive')).toEqual(false);
    expect(component.isDisplayed('not existing field name')).toEqual(false);
  });

});
