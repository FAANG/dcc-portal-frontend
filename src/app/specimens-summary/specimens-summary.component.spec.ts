import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SpecimensSummaryComponent } from './specimens-summary.component';
import {HeaderComponent} from '../shared/header/header.component';
import {ChartsModule} from 'ng2-charts';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SpecimensSummaryComponent', () => {
  let component: SpecimensSummaryComponent;
  let fixture: ComponentFixture<SpecimensSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpecimensSummaryComponent,
        HeaderComponent
      ],
      imports: [
        ChartsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecimensSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create data for charts', () => {
    const data = {
      sexSummary: [
        {
          name: 'male',
          value: 1
        }
      ],
      paperPublishedSummary: [
        {
          name: 'Yes',
          value: 1
        }
      ],
      standardSummary: [
        {
          name: 'FAANG',
          value: 1
        }
      ],
      cellTypeSummary: [
        {
          name: 'blood',
          value: 1
        },
        {
          name: 'bone',
          value: 2
        }
      ],
      organismSummary: [
        {
          name: 'Bos taurus',
          value: 1
        }
      ],
      materialSummary: [
        {
          name: 'specimen from organism',
          value: 1
        }
      ],
      breedSummary: [
        {
          speciesName: 'Bos taurus',
          speciesValue: [
            {
              breedsName: 'Brahman',
              breedsValue: 1
            },
            {
              breedsName: 'Holstein',
              breedsValue: 2
            }
          ]
        }
      ]
    };
    component.assignChartData(data, false);
    expect(component.sexChartLabels).toEqual(['male']);
    expect(component.sexChartData).toEqual([1]);

    expect(component.paperChartLabels).toEqual(['Yes']);
    expect(component.paperChartData).toEqual([1]);

    expect(component.standardChartLabels).toEqual(['FAANG']);
    expect(component.standardChartData).toEqual([1]);

    expect(component.cellsChartLabels).toEqual(['bone', 'blood']);
    expect(component.cellsChartData).toEqual([2, 1]);

    expect(component.organismChartLabels).toEqual(['Bos taurus']);
    expect(component.organismChartData).toEqual([1]);

    expect(component.materialChartLabels).toEqual(['specimen from organism']);
    expect(component.materialChartData).toEqual([1]);

    expect(component.breedChartLabels).toEqual(['Holstein','Brahman']);
    expect(component.breedChartData).toEqual([2, 1]);
  }); 

  it('should change excludeLegacyData refresh chart data', () => {
    spyOn(component, 'clearChartData').and.callThrough();
    spyOn(component, 'assignChartData').and.callThrough(); 
    component.excludeLegacyData = false;

    component.onCheckboxClick();

    expect(component.excludeLegacyData).toEqual(true);
    expect(component.clearChartData).toHaveBeenCalled();
    expect(component.assignChartData).toHaveBeenCalled();
  }); 

  it('should get breed chart data and labels based on selected breed', () => {
    component.breedData = {
      'Breed1': {
        'labels': ['breed1'],
        'data': [1]
      },
      'Breed2': {
        'labels': ['breed2'],
        'data': [2]
      }
    };

    component.onItemClick('Breed1');
    expect(component.name).toEqual('Breed1');
    expect(component.breedChartData).toEqual([1]);
    expect(component.breedChartLabels).toEqual(['breed1']);
    component.onItemClick('Breed2');

    expect(component.name).toEqual('Breed2');
    expect(component.breedChartData).toEqual([2]);
    expect(component.breedChartLabels).toEqual(['breed2']);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
