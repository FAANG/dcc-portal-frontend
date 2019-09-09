import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedItemsComponent } from './related-items.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HeaderComponent} from '../header/header.component';

describe('RelatedItemsComponent', () => {
  let component: RelatedItemsComponent;
  let fixture: ComponentFixture<RelatedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelatedItemsComponent,
        HeaderComponent,
        RobustLinkComponent,
      ],
      imports: [
        NgxPaginationModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('check display status, name should be true and description expected to be false', () => {
    component.selected = new Map();
    component.selected.set('name', true);
    component.selected.set('description', false);
    expect(component.isDisplayed('name')).toEqual(true);
    expect(component.isDisplayed('description')).toEqual(false);
  });

});
