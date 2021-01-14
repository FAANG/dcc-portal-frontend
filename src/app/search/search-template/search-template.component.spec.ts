import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import {SearchService} from '../../services/search.service';
import { SearchTemplateComponent } from './search-template.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ComponentFactoryResolver } from '@angular/core';

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

  it ('search service should pass data to component', inject([SearchService], (service: SearchService) => {
    service.clicked.next(true);
    expect(component.clicked).toEqual(true);
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
