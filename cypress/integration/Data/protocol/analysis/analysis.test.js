import {AnalysisPage} from "./analysis"

describe('Protocol Analysis Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/protocol_analysis/_search/*&sort=protocolName:asc*', {fixture: 'data/protocol-analyses.json'}).as("protocolAnalysesList")
    cy.visit('/protocol/analysis');
  })

  let analysisPage = new AnalysisPage()

  it('should display "FAANG Protocols"', () => {
    analysisPage.check_title()
  })


  /* sort table */

  it('should sort table on column Protocol name asc', () => {
    analysisPage.check_header_sort_asc('.cdk-column-protocol_name', 'protocolName')
  })

  it('should sort table on column Protocol name desc', () => {
    analysisPage.check_header_sort_desc('.cdk-column-protocol_name', 'protocolName')
  })
  // --------------------

  it('should sort table on column Organisation asc', () => {
    analysisPage.check_header_sort_asc('.cdk-column-university_name', 'universityName')
  })

  it('should sort table on column Organisation desc', () => {
    analysisPage.check_header_sort_desc('.cdk-column-university_name', 'universityName')
  })
  // --------------------

  it('should sort table on column Year of Protocol asc', () => {
    analysisPage.check_header_sort_asc('.cdk-column-protocol_date', 'protocolDate')
  })

  it('should sort table on column Year of Protocol desc', () => {
    analysisPage.check_header_sort_desc('.cdk-column-protocol_date', 'protocolDate')
  })
  // --------------------


  /* filter table */
  it('should filter table by Protocol Year - 2020', () => {
    analysisPage.check_url_filter('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'protocolDate')
  })


  it('should allow multiple filters', () => {
    analysisPage.allow_multiple_filters('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Organisation"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'protocolDate',
      'universityName',
      ['Roslin Institute (Edinburgh, UK)', '2020'])
  })

  it('should remove filters', () => {
    analysisPage.removeFilters('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Organisation"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'protocolDate',
      'universityName')
  })


  /* Pagination and Exports */
  it('should verify pagination', () => {
    analysisPage.verify_pagination()
  })

  it('should export data as CSV', () => {
    analysisPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  })

  it('should export data as txt', () => {
    analysisPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  })
})








