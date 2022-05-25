import {PublicationPage} from "./publication"

describe('Publication Page', () => {
  beforeEach(() => {
    cy.visit('/dataset');
  })

  let publicationPage = new PublicationPage()

  it('should display "FAANG Datasets"', () => {
    publicationPage.check_title()
  });

  it('should sort table on column Title', () => {
    publicationPage.compare_value('.cdk-column-title')
  });

  /* sort table */

  it('should sort table on column Journal', () => {
    publicationPage.compare_value('.cdk-column-journal')
  });

  it('should sort table on column Year', () => {
    publicationPage.compare_value('.cdk-column-year')
  });

  it('should sort table on column Dataset Source', () => {
    publicationPage.compare_value('.cdk-column-datasetSource')
  });

  /* filter table */
  it('should filter table by Year - 2020', () => {
    publicationPage.compare_filter_value('[title="Year"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?year=2020')
  });

  it('should filter table by Journal - BMC Genomics', () => {
    publicationPage.compare_filter_value('[title="Journal"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?journal=BMC%20Genomics')
  });

  it('should allow multiple filters', () => {
    publicationPage.allow_multiple_filters('[title="Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Journal"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '?year=2020&journal=BMC%20Genomics',
      ['2020', 'BMC Genomics'])
  });

  it('should remove filters', () => {
    publicationPage.removeFilters('[title="Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Journal"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '/article')
  });

  /* pagination & file download */
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
