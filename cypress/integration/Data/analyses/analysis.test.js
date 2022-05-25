import {AnalysisPage} from "./analysis"

describe('Analysis Page', () => {
  beforeEach(() => {
    cy.visit('/analysis');
  })

  let analysisPage = new AnalysisPage
  ()

  it('should display "FAANG Analyses"', () => {
    analysisPage.check_title()
  });

  it('should sort table on column Analysis accession', () => {
    analysisPage.compare_value('.cdk-column-accession')
  });

  /* sort table */
  it('should sort table on column Dataset', () => {
    analysisPage.sort_column('.cdk-column-datasetAccession', 'xxx', 'xxx')
  });

  it('should sort table on column Title', () => {
    analysisPage.sort_column('.cdk-column-title', 'xxx', 'xxx')
  });

  it('should sort table on column Species', () => {
    analysisPage.sort_column('.cdk-column-species', 'xxx', 'xxx')
  });

  it('should sort table on column Assay Type', () => {
    analysisPage.sort_column('.cdk-column-assayType', 'xxx', 'xxx')
  });

  it('should sort table on column Analysis Type', () => {
    analysisPage.sort_column('.cdk-column-analysisType', 'xxx', 'xxx')
  });

  it('should sort table on column Standard', () => {
    analysisPage.sort_column('.cdk-column-standard', 'xxx', 'xxx')
  });

  /* filter table */
  it('should filter table by Species - Sus scrofa', () => {
    analysisPage.compare_filter_value('[title="Species"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?species=Sus%20scrofa')
  });

  it('should filter table by Assay Type - microRNA profiling by high throughput sequencing', () => {
    analysisPage.compare_filter_value('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?assayType=microRNA%20profiling%20by%20high%20throughput%20sequencing')
  });

  it('should filter table by Dataset - PRJEB19199', () => {
    analysisPage.compare_filter_value('[title="Dataset"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?datasetAccession=PRJEB19199')
  });

  it('should filter table by Analysis Type - SEQUENCE_ANNOTATION', () => {
    analysisPage.compare_filter_value('[title="Analysis type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?analysisType=SEQUENCE_ANNOTATION')
  });


  it('should allow multiple filters', () => {
    analysisPage.allow_multiple_filters('[title="Analysis type"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Dataset"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '?datasetAccession=PRJEB42001&analysisType=SEQUENCE_ANNOTATION',
      ['PRJEB42001', 'SEQUENCE_ANNOTATION'])
  });

  it('should remove filters', () => {
    analysisPage.removeFilters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Instrument"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '/file')
  });

  /* pagination & file download */
  it('should verify pagination', () => {
    analysisPage.verify_pagination()
  });

  it('should export data as CSV', () => {
    analysisPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  });

  it('should export data as txt', () => {
    analysisPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  });
})



