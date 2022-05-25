import {ExperimentPage} from "./experiment"

describe('Protocol Experiment Page', () => {
  beforeEach(() => {
    cy.visit('/protocol/experiments');
  })

  let experimentPage = new ExperimentPage()

  it.only('should display "FAANG Protocols"', () => {
    experimentPage.check_title()
  });

  it('should sort table on column Protocol type', () => {
    experimentPage.compare_value('.cdk-column-protocol_type')
  });

  /* sort table */

  it('should sort table on column Protocol type', () => {
    experimentPage.compare_value('.cdk-column-protocol_type', 'Bisulfite conversion protocol', 'Transposase protocol')
  });

  it('should sort table on column Experiment Target', () => {
    experimentPage.sort_column('.cdk-column-experiment_target', 'xxx', 'xxx')
  });

  it('should sort table on column Assay Type', () => {
    experimentPage.sort_column('.cdk-column-assay_type', 'xxx', 'xxx')
  });


  /* filter table */
  it('should filter table by Experiment target - CHEBI_33697', () => {
    experimentPage.compare_filter_value('[title="Experiment target"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?experimentTarget=CHEBI_33697')
  });

  it('should filter table by Assay Type - RNA-Seq of coding RNA', () => {
    experimentPage.compare_filter_value('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?assayType=RNA-seq%20of%20coding%20RNA')
  });


  it('should allow multiple filters', () => {
    experimentPage.allow_multiple_filters('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Experiment target"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '?assayType=RNA-seq%20of%20coding%20RNA&experimentTarget=CHEBI_33697',
      ['RNA-seq of coding RNA', 'CHEBI_33697'])
  });

  it('should remove filters', () => {
    experimentPage.removeFilters('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Experiment target"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '/protocol/experiments')
  });

  /* pagination & file download */
  it('should verify pagination', () => {
    experimentPage.verify_pagination()
  });

  it('should export data as CSV', () => {
    experimentPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  });

  it('should export data as txt', () => {
    experimentPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  });
})






