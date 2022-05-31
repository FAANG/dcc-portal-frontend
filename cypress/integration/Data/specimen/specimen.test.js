import {SpecimenPage} from "./specimen"

describe('Specimen Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/specimen/_search/*&sort=id_number:desc&*', {fixture: 'specimen.json'}).as("specimenList")
    cy.visit('/specimen');
  })

  let specimenPage = new SpecimenPage()

  it('should display "FAANG Specimens"', () => {
    specimenPage.check_title()
  });

  it('should sort table on column BioSample ID asc', () => {
    specimenPage.check_header_sort_asc('.cdk-column-bioSampleId', 'biosampleId')
  });

  it('should sort table on column BioSample ID desc', () => {
    specimenPage.check_header_sort_desc('.cdk-column-bioSampleId', 'biosampleId')
  });

  // --------------------
  it('should sort table on column Material asc', () => {
    specimenPage.check_header_sort_asc('.cdk-column-material', 'material.text')
  });

  it('should sort table on column Material desc', () => {
    specimenPage.check_header_sort_desc('.cdk-column-material', 'material.text')
  });

  // --------------------
  it('should sort table on column Organism part/Cell type asc', () => {
    specimenPage.check_header_sort_asc('.cdk-column-organismpart_celltype', 'cellType.text')
  });

  it('should sort table on column Organism part/Cell type desc', () => {
    specimenPage.check_header_sort_desc('.cdk-column-organismpart_celltype', 'cellType.text')
  });

  // --------------------
  it('should sort table on column Sex asc', () => {
    specimenPage.check_header_sort_asc('.cdk-column-sex', 'organism.sex.text')
  });

  it('should sort table on column Sex desc', () => {
    specimenPage.check_header_sort_desc('.cdk-column-sex', 'organism.sex.text')
  });

  // --------------------
  it('should sort table on column Organism asc', () => {
    specimenPage.check_header_sort_asc('.cdk-column-organism', 'organism.organism.text')
  });

  it('should sort table on column Organism desc', () => {
    specimenPage.check_header_sort_desc('.cdk-column-organism', 'organism.organism.text')
  });

  // --------------------
  it('should sort table on column Breed asc', () => {
    specimenPage.check_header_sort_asc('.cdk-column-breed', 'organism.breed.text')
  });

  it('should sort table on column Breed desc', () => {
    specimenPage.check_header_sort_desc('.cdk-column-breed', 'organism.breed.text')
  });

  // --------------------
  it('should sort table on column Standard asc', () => {
    specimenPage.check_header_sort_asc('.cdk-column-standard', 'standardMet')
  });

  it('should sort table on column Standard desc', () => {
    specimenPage.check_header_sort_desc('.cdk-column-standard', 'standardMet')
  });

  // --------------------

  it('should filter table by Sex - Female', () => {
    specimenPage.check_url_filter('[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path',  'organism.sex.text')
  });

  it('should filter table by Organism - Bos taurus', () => {
    specimenPage.check_url_filter('[title="Organism"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'organism.organism.text')
  });

  it('should filter table by by Material - specimen from organism', () => {
    specimenPage.check_url_filter('[title="Material"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'material.text')
  });

  it('should filter table by Organism part/Cell type - blood', () => {
    specimenPage.check_url_filter('[title="Organism part/Cell type"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'cellType.text')
  });

  it('should filter table by Breed - Holstein', () => {
    specimenPage.check_url_filter('[title="Breed"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'organism.breed.text')
  });

  it('should filter table by Paper published - Yes', () => {
    specimenPage.check_url_filter('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'paperPublished')
  });

  it('should allow multiple filters', () => {
    specimenPage.allow_multiple_filters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'paperPublished',
      'organism.sex.text',
      ['female', 'yes'])
  });

  it('should remove filters', () => {
    specimenPage.removeFilters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'paperPublished',
      'organism.sex.text')
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




