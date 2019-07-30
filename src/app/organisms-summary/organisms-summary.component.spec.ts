import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismsSummaryComponent } from './organisms-summary.component';
import {HeaderComponent} from '../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ChartsModule} from 'ng2-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
      ]
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
    expect(component.standardChartData).toEqual([1]);
  });
});
