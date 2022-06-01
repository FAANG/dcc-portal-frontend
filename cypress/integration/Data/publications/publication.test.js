import {PublicationPage} from "./publication"

describe('Publication Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/article/_search/*&sort=pmcId:asc&*', {fixture: 'publication.json'}).as("publicationList")
    cy.visit('/article');
  })

  let publicationPage = new PublicationPage()

  it('should display "FAANG Datasets"', () => {
    publicationPage.check_title()
  });

  /* sort table */

  it('should sort table on column Title asc', () => {
    publicationPage.check_header_sort_asc('.cdk-column-title', 'title')
  });

  it('should sort table on column Title desc', () => {
    publicationPage.check_header_sort_desc('.cdk-column-title', 'title')
  });
  // --------------------

  it('should sort table on column Journal asc', () => {
    publicationPage.check_header_sort_asc('.cdk-column-journal', 'journal')
  });

  it('should sort table on column Journal desc', () => {
    publicationPage.check_header_sort_desc('.cdk-column-journal', 'journal')
  });
  // --------------------

  it('should sort table on column Year asc', () => {
    publicationPage.check_header_sort_asc('.cdk-column-year', 'year')
  });

  it('should sort table on column Year desc', () => {
    publicationPage.check_header_sort_desc('.cdk-column-year', 'year')
  });
  // --------------------

  it('should sort table on column Dataset Source asc', () => {
    publicationPage.check_header_sort_asc('.cdk-column-datasetSource', 'datasetSource')
  });

  it('should sort table on column Dataset Source desc', () => {
    publicationPage.check_header_sort_desc('.cdk-column-datasetSource', 'datasetSource')
  });
  // --------------------


  it('should filter table by  Year - 2020', () => {
    publicationPage.check_url_filter('[title="Year"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'year')
  });

  it('should filter table by Journal - BMC Genomics', () => {
    publicationPage.check_url_filter('[title="Journal"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'journal')
  });



  /* filter table */

  it('should allow multiple filters', () => {
    publicationPage.allow_multiple_filters('[title="Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Journal"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'year',
      'journal',
      ['2020', 'BMC Genomics'])
  });

  it('should remove filters', () => {
    publicationPage.removeFilters('[title="Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Journal"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'year',
      'journal')
  });


  /* Pagination and Exports */
  it('should verify pagination', () => {
    publicationPage.verify_pagination()
  });

  it('should export data as CSV', () => {
    publicationPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  });

  it('should export data as txt', () => {
    publicationPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  });

})
