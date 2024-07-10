import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpecimensSummaryComponent } from './specimens-summary.component';
import {HeaderComponent} from '../shared/header/header.component';
import {ChartsModule} from 'ng2-charts';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SpecimensSummaryComponent', () => {
  let component: SpecimensSummaryComponent;
  let fixture: ComponentFixture<SpecimensSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        SpecimensSummaryComponent,
        HeaderComponent
    ],
    imports: [ChartsModule,
        RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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

    expect(component.cellsChartLabels).toEqual(['blood']);
    expect(component.cellsChartData).toEqual([1]);

    expect(component.organismChartLabels).toEqual(['Bos taurus']);
    expect(component.organismChartData).toEqual([1]);

    expect(component.materialChartLabels).toEqual(['specimen from organism']);
    expect(component.materialChartData).toEqual([1]);

    expect(component.breedChartLabels).toEqual(['Brahman']);
    expect(component.standardChartData).toEqual([1]);
  });
});
