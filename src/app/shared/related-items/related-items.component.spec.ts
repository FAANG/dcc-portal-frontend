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

  it('check initial displayed column conversion_status in dataset file table', () => {
    // component.selected = new Map();
    // component.selected.set('name', true);
    // component.selected.set('description', false);
    expect(component.isDisplayed('File name')).toEqual(true);
    expect(component.isDisplayed('Archive')).toEqual(false);
    expect(component.isDisplayed('not existing field name')).toEqual(false);
  });

  it ('check all columns', () => {
    expect(component.get_all_fields()).toEqual(['File name', 'Experiment', 'Archive', 'File size', 'Checksum', 'Checksum method']);
  });

  it ('check initial displayed columns', () => {
    expect(component.get_displayed_fields()['column_names']).toEqual(['File name', 'Experiment', 'File size']);
  });

  it ('Get the field name in ES which contains the required attribute value', () => {
    expect(component.get_attr('Experiment')).toEqual('experiment');
  });

  it ('Get the field name in ES which contains the link for required attribute', () => {
    expect(component.get_field_values_for_links('Experiment')).toBeUndefined();
    const link = component.get_field_values_for_links('File name');
    expect(link['prefix']).toEqual('../file/');
    expect(link['url']).toEqual('fileId');
  });

  it ('file table has download button', () => {
    expect(component.showButton()).toEqual(true);
    component.target_type = 'specimen';
    expect(component.showButton()).toEqual(false);
  });

  it ('download button disabled when no file selected', () => {
    // default no file selected
    expect(component.disableButton()).toEqual(true);
    // simulate one file selected
    component.urls.push('http://a.zip');
    expect(component.disableButton()).toEqual(false);
  });

  it ('check length of selected file list', () => {
    // default no file selected
    expect(component.getUrlsLength()).toEqual(0);
    // simulate one file selected
    component.urls.push('http://a.zip');
    expect(component.getUrlsLength()).toEqual(1);
  });

  it ('get value from ES structure', () => {
    const record = {
      'name': 'value for name',
      'nested': {
        'another': {
          'finally': 'value'
        }
      }
    };
    expect(component.getValue(record, 'name')).toEqual('value for name');
    expect(component.getValue(record, 'nested.another.finally')).toEqual('value');
  });

  it ('capitalize first letter of given string', () => {
    expect(component.capitalizeFirstLetter('name')).toEqual('Name');
    expect(component.capitalizeFirstLetter('several words together')).toEqual('Several words together');
  });

  it ('toggle selected column', () => {
    const field = 'Archive';
    expect(component.isDisplayed(field)).toEqual(false);
    component.toggleSelectedColumn(field);
    expect(component.isDisplayed(field)).toEqual(true);
    component.toggleSelectedColumn(field);
    expect(component.isDisplayed(field)).toEqual(false);
  });
});
