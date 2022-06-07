import {ExperimentPage} from "./experiment"

describe('Protocol Experiment Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/protocol_files/_search/*&sort=name:asc&*', {fixture: 'data/protocol-files.json'}).as("protocolFilesList")
    cy.visit('/protocol/experiments');
  })

  let experimentPage = new ExperimentPage()

  it('should display "FAANG Protocols"', () => {
    experimentPage.check_title()
  })

  /* sort table */

  it('should sort table on column Protocol type asc', () => {
    experimentPage.check_header_sort_asc('.cdk-column-protocol_type', 'name')
  })

  it('should sort table on column Protocol type desc', () => {
    experimentPage.check_header_sort_desc('.cdk-column-protocol_type', 'name')
  })
  // --------------------

  it('should sort table on column Experiment Target asc', () => {
    experimentPage.check_header_sort_asc('.cdk-column-experiment_target', 'experimentTarget')
  })

  it('should sort table on column Experiment Target desc', () => {
    experimentPage.check_header_sort_desc('.cdk-column-experiment_target', 'experimentTarget')
  })
  // --------------------

  it('should sort table on column Assay Type asc', () => {
    experimentPage.check_header_sort_asc('.cdk-column-assay_type', 'assayType')
  })

  it('should sort table on column Assay Type desc', () => {
    experimentPage.check_header_sort_desc('.cdk-column-assay_type', 'assayType')
  })


  /* filter table */
  it('should filter table by Experiment target - CHEBI_33697', () => {
    experimentPage.check_url_filter('[title="Experiment target"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'experimentTarget')
  })

  it('should filter table by Assay Type - RNA-Seq of coding RNA', () => {
    experimentPage.check_url_filter('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'assayType')
  })

  it('should allow multiple filters', () => {
    experimentPage.allow_multiple_filters('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Experiment target"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'assayType',
      'experimentTarget',
      ['RNA-seq of coding RNA', 'CHEBI_33697'])
  })

  it('should remove filters', () => {
    experimentPage.removeFilters('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Experiment target"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'assayType',
      'experimentTarget')
  })


  /* Pagination and Exports */
  it('should verify pagination', () => {
    experimentPage.verify_pagination()
  })

  it('should export data as CSV', () => {
    experimentPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  })

  it('should export data as txt', () => {
    experimentPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  })

})






