import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('should clear chart data', () => {
    component.assayTypeChartLabels = ['whole genome sequencing assay'];
    component.assayTypeChartData = [1];
    component.paperChartLabels = ['Yes'];
    component.paperChartData = [1];
    component.standardChartLabels = ['FAANG'];
    component.standardChartData = [1];
    component.speciesChartLabels = ['Bos taurus'];
    component.speciesChartData = [1];

    component.clearChartData();
    
    expect(component.assayTypeChartLabels).toEqual([]);
    expect(component.assayTypeChartData).toEqual([]);
    expect(component.paperChartLabels).toEqual([]);
    expect(component.paperChartData).toEqual([]);
    expect(component.standardChartLabels).toEqual([]);
    expect(component.standardChartData).toEqual([]);
    expect(component.speciesChartLabels).toEqual([]);
    expect(component.speciesChartData).toEqual([]);
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

  it('should create data for charts excluding legacy data', () => {
    const data = {
      standardSummary: [
        {
          name: 'FAANG',
          value: 10
        }
      ],
      standardSummaryFAANGOnly: [
        {
          name: 'FAANG',
          value: 7
        }
      ],
      paperPublishedSummaryFAANGOnly: [
        {
          name: 'Yes',
          value: 2
        }
      ],
      specieSummaryFAANGOnly: [
        {
          name: 'Bos taurus',
          value: 1
        }
      ],
      assayTypeSummaryFAANGOnly: [
        {
          name: 'whole genome sequencing assay',
          value: 1
        }
      ]
    };
    component.assignChartData(data, true);
    expect(component.standardChartLabels).toEqual(['FAANG']);
    expect(component.standardChartData).toEqual([7]);

    expect(component.paperChartLabels).toEqual(['Yes']);
    expect(component.paperChartData).toEqual([2]);

    expect(component.speciesChartLabels).toEqual(['Bos taurus']);
    expect(component.speciesChartData).toEqual([1]);

    expect(component.assayTypeChartLabels).toEqual(['whole genome sequencing assay']);
    expect(component.assayTypeChartData).toEqual([1]);
  });


  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
