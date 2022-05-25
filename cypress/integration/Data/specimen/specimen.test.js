import {SpecimenPage} from "./specimen"

describe('Specimen Page', () => {
  beforeEach(() => {
    cy.visit('/specimen');
  })

  let specimenPage = new SpecimenPage()

  it.only('should display "FAANG Specimens"', () => {
    specimenPage.check_title()
  });

  it('should sort table on column BioSample ID', () => {
    specimenPage.compare_value('.cdk-column-bioSampleId')
  });

  it('should sort table on column Material', () => {
    specimenPage.sort_column('.cdk-column-material', 'cell culture', 'specimen from organism')
  });

  it('should sort table on column Organism part/Cell type', () => {
    specimenPage.sort_column('.cdk-column-organismpart_celltype', '16-cell', 'zone of skin')
  });

  it('should sort table on column Sex', () => {
    specimenPage.sort_column('.cdk-column-sex', 'female', 'restricted access')
  });

  it('should sort table on column Organism', () => {
    specimenPage.sort_column('.cdk-column-organism', 'Bos indicus', 'gallus gallus')
  });

  it('should sort table on column Breed', () => {
    specimenPage.sort_column('.cdk-column-breed', '(Large White x Landrace) x Meatline', 'yufen i')
  });

  it('should sort table on column Standard', () => {
    specimenPage.sort_column('.cdk-column-standard', 'FAANG', 'Legacy (basic)')
  });

  it('should filter table by Sex - Female', () => {
    specimenPage.compare_filter_value('[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path',  '?sex=female')
  });

  it('should filter table by Organism - Bos taurus', () => {
    specimenPage.compare_filter_value('[title="Organism"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?organism=Bos%20taurus')
  });

  it('should filter table by Material - specimen from organism', () => {
    specimenPage.compare_filter_value('[title="Material"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?material=specimen%20from%20organism')
  });

  it('should filter table by Organism part/Cell type - blood', () => {
    specimenPage.compare_filter_value('[title="Organism part/Cell type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?organismpart_celltype=blood')
  });

  it('should filter table by Breed - Holstein', () => {
    specimenPage.compare_filter_value('[title="Breed"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?breed=Holstein')
  });

  it('should filter table by Paper published - Yes', () => {
    specimenPage.compare_filter_value('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?paper_published=Yes')
  });

  it('should allow multiple filters', () => {
    specimenPage.allow_multiple_filters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '?sex=female&paper_published=Yes',
      ['female', 'yes'])
  });

  it('should remove filters', () => {
    specimenPage.removeFilters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '/specimen')
  });

  it('should verify pagination', () => {
    specimenPage.verify_pagination()
  });

  it('should export data as CSV', () => {
    specimenPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  });

  it('should export data as txt', () => {
    specimenPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  });


























})




