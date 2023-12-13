import {OrganismPage} from "./organism.cy"

describe('Organism Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/organism/_search/*&sort=id_number:desc*', {fixture: 'data/organism.json'}).as("organismList")
    cy.visit('/organism')
  })

  let organismPage = new OrganismPage()


  it('should display "FAANG organisms"', () => {
    organismPage.check_title()
  })

  it('should sort table on column BioSample ID asc', () => {
    organismPage.check_header_sort_asc('.cdk-column-bioSampleId', 'biosampleId')
  })

  it('should sort table on column BioSample ID desc', () => {
    organismPage.check_header_sort_desc('.cdk-column-bioSampleId', 'biosampleId')
  })

  // --------------------
  it('should sort table on column Sex asc', () => {
    organismPage.check_header_sort_asc('.cdk-column-sex', 'sex.text')
  })

  it('should sort table on column Sex desc', () => {
    organismPage.check_header_sort_desc('.cdk-column-sex', 'sex.text')
  })
  // --------------------

  it('should sort table on column Organism asc', () => {
    organismPage.check_header_sort_asc('.cdk-column-organism', 'organism.text')
  })

  it('should sort table on column Organism desc', () => {
    organismPage.check_header_sort_desc('.cdk-column-organism', 'organism.text')
  })
  // --------------------

  it('should sort table on column Breed asc', () => {
    organismPage.check_header_sort_asc('.cdk-column-breed', 'breed.text')
  })

  it('should sort table on column Breed desc', () => {
    organismPage.check_header_sort_desc('.cdk-column-breed', 'breed.text')
  })
  // --------------------

  it('should sort table on column Standard asc', () => {
    organismPage.check_header_sort_asc('.cdk-column-standard', 'standardMet')
  })

  it('should sort table on column Standard desc', () => {
    organismPage.check_header_sort_desc('.cdk-column-standard', 'standardMet')
  })
  // --------------------

  it('should filter table by Sex - Female', () => {
    organismPage.check_url_filter('[title="Sex"] > .mat-mdc-card > :nth-child(2) > :nth-child(2)', 'path',  'sex.text')
  })

  it('should filter table by Organism - Sus scrofa', () => {
    organismPage.check_url_filter('[title="Organism"] > .mat-mdc-card > :nth-child(2) > :nth-child(1)', 'path', 'organism.text')
  })

  it('should filter table by Breed - Chicken breed', () => {
    organismPage.check_url_filter('[title="Breed"] > .mat-mdc-card > :nth-child(2) > :nth-child(1)', 'path', 'breed.text')
  })

  it('should filter table by Paper published - Yes', () => {
    organismPage.check_url_filter('[title="Paper published"] > .mat-mdc-card > :nth-child(2) > :nth-child(2)', 'path', 'paperPublished')
  })

  it('should allow multiple filters', () => {
    organismPage.allow_multiple_filters('[title="Paper published"] > .mat-mdc-card > :nth-child(2) > :nth-child(2)',
      '[title="Sex"] > .mat-mdc-card > :nth-child(2) > :nth-child(2)',
      'paperPublished',
      'sex.text',
      ['female', 'yes'])
  })

  it('should remove filters', () => {
    organismPage.removeFilters('[title="Paper published"] > .mat-mdc-card > :nth-child(2) > :nth-child(2)',
      '[title="Breed"] > .mat-mdc-card > :nth-child(2) > :nth-child(1)',
      'paperPublished',
      'breed.text')
  })

  it('should verify pagination', () => {
    organismPage.verify_pagination()
  })

  it.skip('should export data as CSV', () => {
    organismPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  })

  it.skip('should export data as txt', () => {
    organismPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  })

})


