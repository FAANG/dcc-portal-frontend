import {DatasetPage} from "./dataset"

describe('Dataset Page', () => {
  beforeEach(() => {
    cy.visit('/dataset');
  })

  let datasetPage = new DatasetPage()

  it('should display "FAANG Datasets"', () => {
    datasetPage.check_title()
  });

  it('should sort table on column BioSample ID', () => {
    datasetPage.compare_value('.cdk-column-datasetAccession')
  });

  /* sort table */
  it('should sort table on column Title', () => {
    datasetPage.compare_value('.cdk-column-title')
  });

  it('should sort table on column Species', () => {
    datasetPage.compare_value('.cdk-column-species')
  });

  it('should sort table on column Archive', () => {
    datasetPage.compare_value('.cdk-column-archive')
  });

  it('should sort table on column Assay Type', () => {
    datasetPage.compare_value('.cdk-column-assayType')
  });

  it('should sort table on column Number of Experiments', () => {
    datasetPage.compare_value('.cdk-column-numberOfExperiments')
  });

  it('should sort table on column Number of Specimens', () => {
    datasetPage.compare_value('.cdk-column-numberOfSpecimens')
  });

  it('should sort table on column Number of Files', () => {
    datasetPage.compare_value('.cdk-column-numberOfFiles')
  });
  it('should sort table on column Standard', () => {
    datasetPage.compare_value('.cdk-column-standard')
  });

  /* filter table */
  it('should filter table by Species - Gallus gallus', () => {
    datasetPage.compare_filter_value('[title="Species"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?species=Gallus%20gallus')
  });

  it('should filter table by Assay Type - RNA-Seq', () => {
    datasetPage.compare_filter_value('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?assayType=RNA-Seq')
  });

  it('should filter table by Archive - ENA', () => {
    datasetPage.compare_filter_value('[title="Archive"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?archive=ENA')
  });

  it('should filter table by Paper published - Yes', () => {
    datasetPage.compare_filter_value('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?paper_published=Yes')
  });

  it('should allow multiple filters', () => {
    datasetPage.allow_multiple_filters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Archive"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '?archive=ENA&paper_published=Yes',
      ['ena', 'yes'])
  });

  it('should remove filters', () => {
    datasetPage.removeFilters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Archive"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '/dataset')
  });

  /* pagination & file download */
  it('should verify pagination', () => {
    datasetPage.verify_pagination()
  });

  it('should export data as CSV', () => {
    datasetPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  });

  it('should export data as txt', () => {
    datasetPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  });
})
