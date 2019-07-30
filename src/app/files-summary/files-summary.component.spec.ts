import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesSummaryComponent } from './files-summary.component';
import {HeaderComponent} from '../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ChartsModule} from 'ng2-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FilesSummaryComponent', () => {
  let component: FilesSummaryComponent;
  let fixture: ComponentFixture<FilesSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilesSummaryComponent,
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
    fixture = TestBed.createComponent(FilesSummaryComponent);
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
          value: 1
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
    expect(component.standardChartData).toEqual([1]);

    expect(component.paperChartLabels).toEqual(['Yes']);
    expect(component.paperChartData).toEqual([1]);

    expect(component.speciesChartLabels).toEqual(['Bos taurus']);
    expect(component.speciesChartData).toEqual([1]);

    expect(component.assayTypeChartLabels).toEqual(['whole genome sequencing assay']);
    expect(component.assayTypeChartData).toEqual([1]);
  });
});
