import {FilePage} from "./file"

describe('File Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/file/_search/*&sort=name:desc*', {fixture: 'data/file.json'}).as("fileList")
    cy.visit('/file');
  })

  let filePage = new FilePage()

  it('should display "FAANG Files"', () => {
    filePage.check_title()
  })


  /* sort table */
  it('should sort table on column FileName asc', () => {
    filePage.check_header_sort_asc('.cdk-column-fileName', 'name')
  })

  it('should sort table on column FileName desc', () => {
    filePage.check_header_sort_desc('.cdk-column-fileName', 'name')
  })
  // --------------------

  it('should sort table on column Study asc', () => {
    filePage.check_header_sort_asc('.cdk-column-study', 'study.accession')
  })

  it('should sort table on column Study desc', () => {
    filePage.check_header_sort_desc('.cdk-column-study', 'study.accession')
  })
  // --------------------

  it('should sort table on column Experiment asc', () => {
    filePage.check_header_sort_asc('.cdk-column-experiment', 'experiment.accession')
  })

  it('should sort table on column Experiment desc', () => {
    filePage.check_header_sort_desc('.cdk-column-experiment', 'experiment.accession')
  })
  // --------------------

  it('should sort table on column Species asc', () => {
    filePage.check_header_sort_asc('.cdk-column-species', 'species.text')
  })

  it('should sort table on column Species desc', () => {
    filePage.check_header_sort_desc('.cdk-column-species', 'species.text')
  })
  // --------------------

  it('should sort table on column Assay Type asc', () => {
    filePage.check_header_sort_asc('.cdk-column-assayType', 'experiment.assayType')
  })

  it('should sort table on column Assay Type desc', () => {
    filePage.check_header_sort_desc('.cdk-column-assayType', 'experiment.assayType')
  })
  // --------------------

  it('should sort table on column Target asc', () => {
    filePage.check_header_sort_asc('.cdk-column-target', 'experiment.target')
  })

  it('should sort table on column Target desc', () => {
    filePage.check_header_sort_desc('.cdk-column-target', 'experiment.target')
  })
  // --------------------

  it('should sort table on column Specimen asc', () => {
    filePage.check_header_sort_asc('.cdk-column-specimen', 'specimen')
  })

  it('should sort table on column Specimen desc', () => {
    filePage.check_header_sort_desc('.cdk-column-specimen', 'specimen')
  })
  // --------------------

  it('should sort table on column Instrument asc', () => {
    filePage.check_header_sort_asc('.cdk-column-instrument', 'run.instrument')
  })

  it('should sort table on column Instrument desc', () => {
    filePage.check_header_sort_desc('.cdk-column-instrument', 'run.instrument')
  })
  // --------------------

  it('should sort table on column Standard asc', () => {
    filePage.check_header_sort_asc('.cdk-column-standard', 'experiment.standardMet')
  })

  it('should sort table on column Standard desc', () => {
    filePage.check_header_sort_desc('.cdk-column-standard', 'experiment.standardMet')
  })
  // --------------------


  /* filter table */
  it('should filter table by Species - Gallus gallus', () => {
    filePage.check_url_filter('[title="Species"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'species.text')
  })

  it('should filter table by Assay Type - RNA-Seq', () => {
    filePage.check_url_filter('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'experiment.assayType')
  })

  it('should filter table by Target - input DNA', () => {
    filePage.check_url_filter('[title="Target"] > .mat-card > :nth-child(2) > :nth-child(2)', 'path', 'experiment.target')
  })

  it('should filter table by Instrument - Illumina HiSeq 2000', () => {
    filePage.check_url_filter('[title="Instrument"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'run.instrument')
  })

  it('should filter table by Paper published - Yes', () => {
    filePage.check_url_filter('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'paperPublished')
  })

  it('should allow multiple filters', () => {
    filePage.allow_multiple_filters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Instrument"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'paperPublished',
      'run.instrument',
      ['Illumina HiSeq 2000', 'Yes'])
  })

  it('should remove filters', () => {
    filePage.removeFilters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Instrument"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'paperPublished',
      'run.instrument')
  })


  /* Pagination and Exports */
  it('should verify pagination', () => {
    filePage.verify_pagination()
  })

  it('should export data as CSV', () => {
    filePage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  })

  it('should export data as txt', () => {
    filePage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  })

})



