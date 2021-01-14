import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrganismsSummaryComponent } from './organisms-summary.component';
import {HeaderComponent} from '../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ChartsModule} from 'ng2-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ApiDataService } from '../services/api-data.service';

describe('OrganismsSummaryComponent', () => {
  let component: OrganismsSummaryComponent;
  let fixture: ComponentFixture<OrganismsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrganismsSummaryComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        ChartsModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismsSummaryComponent);
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
      organismSummary: [
        {
          name: 'Bos taurus',
          value: 1
        }
      ],
      standardSummary: [
        {
          name: 'FAANG',
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

    expect(component.organismChartLabels).toEqual(['Bos taurus']);
    expect(component.organismChartData).toEqual([1]);

    expect(component.standardChartLabels).toEqual(['FAANG']);
    expect(component.standardChartData).toEqual([1]);

    expect(component.breedChartLabels).toEqual(['Brahman']);
    expect(component.breedChartData).toEqual([1]);
  });

  it('should create data for charts excluding legacy data', () => {
    const data = {
      sexSummaryFAANGOnly: [
        {
          name: 'male',
          value: 1
        }
      ],
      sexSummary: [
        {
          name: 'female',
          value: 2
        }
      ],
      paperPublishedSummaryFAANGOnly: [
        {
          name: 'Yes',
          value: 1
        },
        {
          name: 'No',
          value: 2
        }
      ],
      organismSummaryFAANGOnly: [
        {
          name: 'Bos taurus',
          value: 1
        }
      ],
      standardSummaryFAANGOnly: [
        {
          name: 'FAANG',
          value: 1
        }
      ],
      breedSummaryFAANGOnly: [
        {
          speciesName: 'Bos taurus',
          speciesValue: [
            {
              breedsName: 'Brahman',
              breedsValue: 1
            }
          ]
        }
      ]
    };
    component.assignChartData(data, true);
    expect(component.sexChartLabels).toEqual(['male']);
    expect(component.sexChartData).toEqual([1]);

    expect(component.paperChartLabels).toEqual(['Yes', 'No']);
    expect(component.paperChartData).toEqual([1, 2]);

    expect(component.organismChartLabels).toEqual(['Bos taurus']);
    expect(component.organismChartData).toEqual([1]);

    expect(component.standardChartLabels).toEqual(['FAANG']);
    expect(component.standardChartData).toEqual([1]);

    expect(component.breedChartLabels).toEqual(['Brahman']);
    expect(component.breedChartData).toEqual([1]);
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
    component.breedsData = {
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

  it('should clear chart data', () => {
    component.sexChartLabels = ['male'];
    component.sexChartData = [1];
    component.paperChartLabels = ['Yes'];
    component.paperChartData = [1];
    component.organismChartLabels = ['Bos taurus'];
    component.organismChartData = [1];
    component.standardChartLabels = ['FAANG'];
    component.standardChartData = [1];
    component.breedChartLabels = ['Brahman'];
    component.breedChartData = [1];

    component.clearChartData();
    
    expect(component.sexChartLabels).toEqual([]);
    expect(component.sexChartData).toEqual([]);
    expect(component.paperChartLabels).toEqual([]);
    expect(component.paperChartData).toEqual([]);
    expect(component.organismChartLabels).toEqual([]);
    expect(component.organismChartData).toEqual([]);
    expect(component.standardChartLabels).toEqual([]);
    expect(component.standardChartData).toEqual([]);
    expect(component.breedChartLabels).toEqual([]);
    expect(component.breedChartData).toEqual([]);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
