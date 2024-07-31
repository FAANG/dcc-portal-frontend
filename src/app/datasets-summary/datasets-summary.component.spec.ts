import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatasetsSummaryComponent } from './datasets-summary.component';
import {HeaderComponent} from '../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ChartsModule} from 'ng2-charts';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DatasetsSummaryComponent', () => {
  let component: DatasetsSummaryComponent;
  let fixture: ComponentFixture<DatasetsSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        DatasetsSummaryComponent,
        HeaderComponent
    ],
    imports: [RouterTestingModule,
        ChartsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create data for charts', () => {
    const data = {
      standardSummary: [
        {
          name: 'FAANG',
          value: 10
        }
      ],
      paperPublishedSummary: [
        {
          name: 'Yes',
          value: 1
        }
      ],
      specieSummary: [
        {
          name: 'Bos taurus',
          value: 1
        }
      ],
      assayTypeSummary: [
        {
          name: 'whole genome sequencing assay',
          value: 1
        }
      ]
    };
    component.assignChartData(data, false);
    expect(component.standardChartLabels).toEqual(['FAANG']);
    expect(component.standardChartData).toEqual([10]);

    expect(component.paperChartLabels).toEqual(['Yes']);
    expect(component.paperChartData).toEqual([1]);

    expect(component.speciesChartLabels).toEqual(['Bos taurus']);
    expect(component.speciesChartData).toEqual([1]);

    expect(component.assayTypeChartLabels).toEqual(['whole genome sequencing assay']);
    expect(component.assayTypeChartData).toEqual([1]);
  });
});
