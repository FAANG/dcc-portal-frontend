import {FilePage} from "./file"

describe('File Page', () => {
  beforeEach(() => {
    cy.visit('/file');
  })

  let datasetPage = new FilePage
  ()

  it('should display "FAANG Files"', () => {
    datasetPage.check_title()
  });

  it('should sort table on column FileName', () => {
    datasetPage.compare_value('.cdk-column-fileName')
  });

  /* sort table */
  it('should sort table on column Study', () => {
    datasetPage.sort_column('.cdk-column-study', 'xxx', 'xxx')
  });

  it('should sort table on column Experiment', () => {
    datasetPage.sort_column('.cdk-column-experiment', 'xxx', 'xxx')
  });

  it('should sort table on column Species', () => {
    datasetPage.sort_column('.cdk-column-species', 'xxx', 'xxx')
  });

  it('should sort table on column Assay Type', () => {
    datasetPage.sort_column('.cdk-column-assayType', 'xxx', 'xxx')
  });

  it('should sort table on column Target', () => {
    datasetPage.sort_column('.cdk-column-target', 'xxx', 'xxx')
  });

  it('should sort table on column Specimen', () => {
    datasetPage.sort_column('.cdk-column-specimen', 'xxx', 'xxx')
  });

  it('should sort table on column Instrument', () => {
    datasetPage.sort_column('.cdk-column-instrument', 'xxx', 'xxx')
  });
  it('should sort table on column Standard', () => {
    datasetPage.sort_column('.cdk-column-standard', 'xxx', 'xxx')
  });

  /* filter table */
  it('should filter table by Species - Gallus gallus', () => {
    datasetPage.compare_filter_value('[title="Species"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?species=Bos%20taurus')
  });

  it('should filter table by Assay Type - RNA-Seq', () => {
    datasetPage.compare_filter_value('[title="Assay type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?assayType=RNA-Seq')
  });

  it('should filter table by Target - input DNA', () => {
    datasetPage.compare_filter_value('[title="Target"] > .mat-card > :nth-child(2) > :nth-child(2)', 'path', '?target=input%20DNA')
  });

  it('should filter table by Instrument - Illumina HiSeq 2000', () => {
    datasetPage.compare_filter_value('[title="Instrument"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?instrument=Illumina%20HiSeq%202000')
  });

  it('should filter table by Paper published - Yes', () => {
    datasetPage.compare_filter_value('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?paper_published=Yes')
  });

  it('should allow multiple filters', () => {
    datasetPage.allow_multiple_filters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Instrument"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '?instrument=Illumina%20HiSeq%202000&paper_published=Yes',
      ['Illumina HiSeq 2000', 'Yes'])
  });

  it('should remove filters', () => {
    datasetPage.removeFilters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Instrument"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '/file')
  });

  /* pagination & file download */
  it('should verify pagination', () => {
    datasetPage.verify_pagination()
  });

  it('should export data as CSV', () => {
    datasetPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  });

  it('should export data as txt', () => {
    datasetPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  });
})



