import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchComponent } from './search.component';
import {HeaderComponent} from '../shared/header/header.component';
import {SearchTemplateComponent} from './search-template/search-template.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SearchService} from '../services/search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        HeaderComponent,
        SearchTemplateComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preventReload should return false if event.code equals to Enter', () => {
    const event = {
     code: 'Enter'
    };
    expect(component.preventReload(event)).toEqual(false);
     expect(component.preventReload({code: 'test'})).toBeUndefined();
  });

  it('addValue should add text to searchText variable', () => {
    component.addValue('test');
    expect(component.searchText).toEqual('test');
  });

  it('should update search text in search service', () => {
    const searchService = TestBed.get(SearchService);
    component.search('testSearchText');
    searchService.searchText$.subscribe((text) => {
      expect(text).toEqual('testSearchText');
    });
  });

  it('should update search service on checkbox click', () => {
    const searchService = TestBed.get(SearchService);
    component.clicked = true;
    component.searchText = 'testSearchText';
    component.onCheckboxClick();
    expect(component.clicked).toEqual(false);
    searchService.clicked.subscribe((clicked) => {
      expect(clicked).toEqual(false);
    });
    searchService.searchText$.subscribe((text) => {
      setTimeout(() => {
        expect(text).toEqual('testSearchText');
      }, 1000);
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
