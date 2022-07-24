import {AnalysisPage} from "./analysis"

describe('Analysis Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/analysis/_search/*&sort=accession:*&*', {fixture: 'data/analysis.json'}).as("analysisList")
    cy.visit('/analysis');
  })

  let analysisPage = new AnalysisPage()

  it('should display "FAANG Analyses"', () => {
    analysisPage.check_title()
  })

  it('should sort table on column Analysis accession asc', () => {
    analysisPage.check_header_sort_asc('.cdk-column-accession', 'accession')
  })

  it('should sort table on column Analysis accession desc', () => {
    analysisPage.check_header_sort_desc('.cdk-column-accession', 'accession')
  })
  // --------------------

  it('should sort table on column Dataset asc', () => {
    analysisPage.check_header_sort_asc('.cdk-column-datasetAccession', 'datasetAccession')
  })

  it('should sort table on column Dataset desc', () => {
    analysisPage.check_header_sort_desc('.cdk-column-datasetAccession', 'datasetAccession')
  })
  // --------------------

  it('should sort table on column Title asc', () => {
    analysisPage.check_header_sort_asc('.cdk-column-title', 'title')
  })

  it('should sort table on column Title desc', () => {
    analysisPage.check_header_sort_desc('.cdk-column-title', 'title')
  })
  // --------------------

  it('should sort table on column Species asc', () => {
    analysisPage.check_header_sort_asc('.cdk-column-species', 'organism.text')
  })

  it('should sort table on column Species desc', () => {
    analysisPage.check_header_sort_desc('.cdk-column-species', 'organism.text')
  })
  // --------------------

  it('should sort table on column Assay Type asc', () => {
    analysisPage.check_header_sort_asc('.cdk-column-assayType', 'assayType')
  })

  it('should sort table on column Assay Type desc', () => {
    analysisPage.check_header_sort_desc('.cdk-column-assayType', 'assayType')
  })
  // --------------------

  it('should sort table on column Analysis Type asc', () => {
    analysisPage.check_header_sort_asc('.cdk-column-analysisType', 'analysisType')
  })

  it('should sort table on column Analysis Type desc', () => {
    analysisPage.check_header_sort_desc('.cdk-column-analysisType', 'analysisType')
  })
  // --------------------

  it('should sort table on column Standard asc', () => {
    analysisPage.check_header_sort_asc('.cdk-column-standard', 'standardMet')
  })

  it('should sort table on column Standard desc', () => {
    analysisPage.check_header_sort_desc('.cdk-column-standard', 'standardMet')
  })


  /* filter table */
  it('should filter table by Species - Sus scrofa', () => {
    analysisPage.check_url_filter('[title="Species"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'organism.text')
  })

  it('should filter table by Assay Type - microRNA profiling by high throughput sequencing', () => {
    analysisPage.check_url_filter('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'assayType')
  })

  it('should filter table by Dataset - PRJEB19199', () => {
    analysisPage.check_url_filter('[title="Dataset"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'datasetAccession')
  })

  it('should filter table by Analysis Type - SEQUENCE_ANNOTATION', () => {
    analysisPage.check_url_filter('[title="Analysis type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'analysisType')
  })

  it('should allow multiple filters', () => {
    analysisPage.allow_multiple_filters('[title="Analysis type"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Dataset"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'analysisType',
      'datasetAccession',
      ['PRJEB19199', 'SEQUENCE_ANNOTATION'])
  })

  it('should remove filters', () => {
    analysisPage.removeFilters('[title="Analysis type"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Dataset"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'analysisType',
      'datasetAccession')
  })

  /* Pagination and Exports */
  it('should verify pagination', () => {
    analysisPage.verify_pagination()
  })

  it.skip('should export data as CSV', () => {
    analysisPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  })

  it.skip('should export data as txt', () => {
    analysisPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  })

})



