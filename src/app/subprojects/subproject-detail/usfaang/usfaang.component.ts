import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface DatasetElement {
  accession: string;
  title: string;
  species: string;
  archive: string;
  assayType: string;
  experimentsNumber: string;
  specimensNumber: string;
  filesNumber: string;
  standard: string;
}

@Component({
  selector: 'app-usfaang',
  templateUrl: './usfaang.component.html',
  styleUrl: './usfaang.component.css'
})
export class UsfaangComponent implements AfterViewInit {
  DATASET_DATA: DatasetElement[] = [
    {
      accession: 'PRJEB68308',
      title: 'Chromatin accessibility landscape of unstimulated porcine circulating immune cells at single cell resolution',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'snATAC-seq', experimentsNumber: '1',
      specimensNumber: '1', filesNumber: '8', standard: 'FAANG'
    },
    {
      accession: 'PRJEB68307',
      title: 'Chromatin accessibility landscape of unstimulated porcine circulating immune cells at single cell resolution',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'snATAC-seq', experimentsNumber: '1',
      specimensNumber: '1', filesNumber: '8', standard: 'FAANG'
    },
    {
      accession: 'PRJEB57595',
      title: 'Transcriptome profiling of porcine neutrophils',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'transcription profiling by high throughput sequencing', experimentsNumber: '2',
      specimensNumber: '2', filesNumber: '4', standard: 'FAANG'
    },
    {
      accession: 'PRJEB51699',
      title: 'Characteriziation of regulatory elements in sorted porcine immune cells',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'ChIP-seq,ATAC-seq', experimentsNumber: '105',
      specimensNumber: '15', filesNumber: '924', standard: 'FAANG'
    },
    {
      accession: 'PRJEB49412',
      title: 'Characteriziation of allele-biased expression and methylation events in porcine fetal tissues',
      species: 'Sus scrofa',
      archive: 'ENA',
      assayType: 'whole genome sequencing assay,RNA-seq of coding RNA,methylation profiling by high throughput sequencing',
      experimentsNumber: '78',
      specimensNumber: '38',
      filesNumber: '1102',
      standard: 'FAANG'
    },
    {
      accession: 'PRJEB47517',
      title: 'Assessment of DNA methylation in porcine immune cells',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'methylation profiling by high throughput sequencing', experimentsNumber: '41',
      specimensNumber: '15', filesNumber: '82', standard: 'FAANG'
    },
    {
      accession: 'PRJEB43826',
      title: 'Transcriptional landscape of porcine circulating immune cells',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'transcription profiling by high throughput sequencing', experimentsNumber: '22',
      specimensNumber: '22', filesNumber: '44', standard: 'FAANG'
    },
    {
      accession: 'PRJEB37735',
      title: 'Identification of genome-wide regulatory elements of gut tissues in livestock species',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'ChIP-seq,RNA-seq of total RNA', experimentsNumber: '77',
      specimensNumber: '13', filesNumber: '89', standard: 'FAANG'
    },
    {
      accession: 'PRJEB37103',
      title: 'Pig fetal histone modification altas',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'ChIP-seq', experimentsNumber: '20',
      specimensNumber: '4', filesNumber: '40', standard: 'FAANG'
    },
    {
      accession: 'PRJEB31483',
      title: 'Pig histone marks',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'ChIP-seq', experimentsNumber: '72',
      specimensNumber: '24', filesNumber: '144', standard: 'FAANG'
    },
    {
      accession: 'PRJEB31482',
      title: 'Pig histone modification alias',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'ChIP-seq', experimentsNumber: '20',
      specimensNumber: '4', filesNumber: '40', standard: 'FAANG'
    },
    {
      accession: 'PRJEB31481',
      title: 'RNA-seq of pig alveolar macrophages stimulated with LPS and Poly (I:C)',
      species: 'Sus scrofa', archive: 'ENA', assayType: 'transcription profiling by high throughput sequencing', experimentsNumber: '24',
      specimensNumber: '24', filesNumber: '48', standard: 'FAANG'
    }
  ];
  displayedColumns: string[] = ['accession', 'title', 'species', 'archive', 'assayType', 'experimentsNumber',
    'specimensNumber', 'filesNumber', 'standard'];
  dataSource = new MatTableDataSource(this.DATASET_DATA);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


}
