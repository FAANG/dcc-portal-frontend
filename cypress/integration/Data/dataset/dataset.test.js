import {DatasetPage} from "./dataset"

describe('Dataset Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/dataset/_search/*&sort=accession:desc&*', {fixture: 'dataset.json'}).as("datasetList")
    cy.visit('/dataset');
  })

  let datasetPage = new DatasetPage()

  it('should display "FAANG Datasets"', () => {
    datasetPage.check_title()
  });

  it('should sort table on column Dataset Accession asc', () => {
    datasetPage.check_header_sort_asc('.cdk-column-datasetAccession', 'accession')
  });

  it('should sort table on column Dataset Accession desc', () => {
    datasetPage.check_header_sort_desc('.cdk-column-datasetAccession', 'accession')
  });

  // --------------------
  it('should sort table on column Title asc', () => {
    datasetPage.check_header_sort_asc('.cdk-column-title', 'title')
  });

  it('should sort table on column Title desc', () => {
    datasetPage.check_header_sort_desc('.cdk-column-title', 'title')
  });

  // --------------------
  it('should sort table on column Species asc', () => {
    datasetPage.check_header_sort_asc('.cdk-column-species', 'species.text')
  });

  it('should sort table on column Species desc', () => {
    datasetPage.check_header_sort_desc('.cdk-column-species', 'species.text')
  });

  // --------------------
  it('should sort table on column Archive asc', () => {
    datasetPage.check_header_sort_asc('.cdk-column-archive', 'archive')
  });

  it('should sort table on column Archive desc', () => {
    datasetPage.check_header_sort_desc('.cdk-column-archive', 'archive')
  });

  // --------------------
  it('should sort table on column Assay Type asc', () => {
    datasetPage.check_header_sort_asc('.cdk-column-assayType', 'assayType')
  });

  it('should sort table on column Assay Type desc', () => {
    datasetPage.check_header_sort_desc('.cdk-column-assayType', 'assayType')
  });

  // --------------------
  it('should sort table on column Number of Experiments asc', () => {
    datasetPage.check_header_sort_asc('.cdk-column-numberOfExperiments', 'experiment')
  });

  it('should sort table on column Number of Experiments desc', () => {
    datasetPage.check_header_sort_desc('.cdk-column-numberOfExperiments', 'experiment')
  });

  // --------------------
  it('should sort table on column Number of Specimens asc', () => {
    datasetPage.check_header_sort_asc('.cdk-column-numberOfSpecimens', 'specimen')
  });

  it('should sort table on column Number of Specimens desc', () => {
    datasetPage.check_header_sort_desc('.cdk-column-numberOfSpecimens', 'specimen')
  });

  // --------------------
  it('should sort table on column Number of Files asc', () => {
    datasetPage.check_header_sort_asc('.cdk-column-numberOfFiles', 'file')
  });

  it('should sort table on column Number of Files desc', () => {
    datasetPage.check_header_sort_desc('.cdk-column-numberOfFiles', 'file')
  });

  // --------------------
  it('should sort table on column Number of Standard asc', () => {
    datasetPage.check_header_sort_asc('.cdk-column-standard', 'standardMet')
  });

  it('should sort table on column Number of Standard desc', () => {
    datasetPage.check_header_sort_desc('.cdk-column-standard', 'standardMet')
  });

  // --------------------

  it('should filter table by Species - Gallus gallus', () => {
    datasetPage.check_url_filter('[title="Species"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path',  'species.text')
  });

  it('should filter table by Assay Type - RNA-Seq', () => {
    datasetPage.check_url_filter('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'assayType')
  });

  it('should filter table by Archive - ENA', () => {
    datasetPage.check_url_filter('[title="Archive"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'archive')
  });

  it('should filter table by Paper published - Yes', () => {
    datasetPage.check_url_filter('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'paperPublished')
  });

  it('should allow multiple filters', () => {
    datasetPage.allow_multiple_filters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Archive"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'paperPublished',
      'archive',
      ['ena', 'yes'])
  });

  it('should remove filters', () => {
    datasetPage.removeFilters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Archive"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'paperPublished',
      'archive')
  });

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
