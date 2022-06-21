import {SamplePage} from "./sample"

describe('Protocol Sample Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/protocol_samples/_search/*&sort=protocolName:asc*', {fixture: 'data/protocol-samples.json'}).as("protocolSamplesList")
    cy.visit('/protocol/samples');
  })

  let samplePage = new SamplePage()

  it('should display "FAANG Protocols"', () => {
    samplePage.check_title()
  })

  it('should sort table on column Protocol name asc', () => {
    samplePage.check_header_sort_asc('.cdk-column-protocol_name', 'protocolName')
  })

  it('should sort table on column Protocol name desc', () => {
    samplePage.check_header_sort_desc('.cdk-column-protocol_name', 'protocolName')
  })
  // --------------------

  it('should sort table on column Organisation asc', () => {
    samplePage.check_header_sort_asc('.cdk-column-university_name', 'universityName')
  })

  it('should sort table on column Organisation desc', () => {
    samplePage.check_header_sort_desc('.cdk-column-university_name', 'universityName')
  })
  // --------------------

  it('should sort table on column Year of Protocol asc', () => {
    samplePage.check_header_sort_asc('.cdk-column-protocol_date', 'protocolDate')
  })

  it('should sort table on column Year of Protocol desc', () => {
    samplePage.check_header_sort_desc('.cdk-column-protocol_date', 'protocolDate')
  })


  /* filter table */
  it('should filter table by Protocol Year - 2016', () => {
    samplePage.check_url_filter('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'protocolDate')
  })

  it('should allow multiple filters', () => {
    samplePage.allow_multiple_filters('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Organisation"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'protocolDate',
      'universityName',
      ['French National Institute for Agricultural Research (France)', '2016'])
  })

  it('should remove filters', () => {
    samplePage.removeFilters('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Organisation"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'protocolDate',
      'universityName')
  })


  /* Pagination and Exports */
  it('should verify pagination', () => {
    samplePage.verify_pagination()
  })

  it('should export data as CSV', () => {
    samplePage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  })

  it('should export data as txt', () => {
    samplePage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  })

})









