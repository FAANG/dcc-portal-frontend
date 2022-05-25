import {AnalysisPage} from "./analysis"

describe('Protocol Sample Page', () => {
  beforeEach(() => {
    cy.visit('/protocol/analysis');
  })

  let analysisPage = new AnalysisPage()

  it.only('should display "FAANG Protocols"', () => {
    analysisPage.check_title()
  });

  it('should sort table on column Protocol name', () => {
    analysisPage.compare_value('.cdk-column-protocol_name')
  });

  /* sort table */

  it('should sort table on column Protocol name', () => {
    analysisPage.compare_value('.cdk-column-protocol_name', 'xxx', 'xxx')
  });

  it('should sort table on column Organisation', () => {
    analysisPage.sort_column('.cdk-column-university_name', 'xxx', 'xxx')
  });

  it('should sort table on column Year of Protocol', () => {
    analysisPage.sort_column('.cdk-protocol_date', 'xxx', 'xxx')
  });


  /* filter table */
  it('should filter table by Protocol Year - 2020', () => {
    analysisPage.compare_filter_value('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?protocol_date=2020')
  });


  it('should allow multiple filters', () => {
    analysisPage.allow_multiple_filters('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Organisation"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '?university_name=Roslin%20Institute%20(Edinburgh,%20UK)&protocol_date=2020',
      ['Roslin Institute (Edinburgh, UK)', '2020'])
  });

  it('should remove filters', () => {
    analysisPage.removeFilters('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Organisation"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '/protocol/analysis')
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








