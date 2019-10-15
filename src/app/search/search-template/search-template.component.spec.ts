import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTemplateComponent } from './search-template.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SearchTemplateComponent', () => {
  let component: SearchTemplateComponent;
  let fixture: ComponentFixture<SearchTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchTemplateComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleDisplay should toggle a value of display', () => {
    expect(component.display).toEqual(false);
    component.toggleDisplay();
    expect(component.display).toEqual(true);
    component.toggleDisplay();
    expect(component.display).toEqual(false);
  });

  it('getCellType should get cell type from data with specimenFromOrganism field', () => {
    const hit = {
      _source: {
        specimenFromOrganism: {
          organismPart: {
            text: 'test'
          }
        }
      }
    };
    expect(component.getCellType(hit)).toEqual('test');
  });

  it('getCellType should get cell type from data with cellSpecimen field', () => {
    const hit = {
      _source: {
        cellSpecimen: {
          cellType: [
            {
              text: 'test'
            }
          ]
        }
      }
    };
    expect(component.getCellType(hit)).toEqual('test');
  });

  it('getCellType should get cell type from data with cellCulture field', () => {
    const hit = {
      _source: {
        cellCulture: {
          cellType: {
            text: 'test'
          }
        }
      }
    };
    expect(component.getCellType(hit)).toEqual('test');
  });

  it('getCellType should get cell type from data with cellLine field', () => {
    const hit = {
      _source: {
        cellLine: {
          cellType: {
            text: 'test'
          }
        }
      }
    };
    expect(component.getCellType(hit)).toEqual('test');
  });

  it ('getStrFromArray should return empty string on undefined parameter', () => {
    // tslint:disable-next-line:prefer-const
    let data;
    expect(component.getStrFromArray(data, '')).toEqual('');
  });

  it ('getStrFromArray should return empty string on empty array', () => {
    const data = [];
    expect(component.getStrFromArray(data, '')).toEqual('');
  });

  it('getStrFromArray should return string representation of array without subelement', () => {
    const data = ['test1', 'test2'];
    expect(component.getStrFromArray(data, '')).toEqual('test1, test2');
  });

  it('getStrFromArray should return string representation of array with subelement', () => {
    const data = [{'text': 'abc'}, {'text': 'efg'}];
    expect(component.getStrFromArray(data, 'text')).toEqual('abc, efg');
  });

  it('getStrFromArray should return string representation of array with subelement, some may not having subelement', () => {
    const data = [{'text': 'abc'}, {'txt': 'efg'}];
    expect(component.getStrFromArray(data, 'text')).toEqual('abc');
  });
});
