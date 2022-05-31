import {OrganismPage} from "./organism"
import * as organismData from '../../../fixtures/organism.json';

describe('Organism Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/organism/_search/*&sort=id_number:desc&*', {fixture: 'organism.json'}).as("organismList")
    cy.visit('/organism')
  })

  let organismPage = new OrganismPage()

  xit('testing fixture', () => {
    cy.fixture('organism.json').as("organismJSON")
    cy.server()
    cy.route('https://api.faang.org/data/organism/_search/*', "@organismJSON").as("organismList")
    cy.visit('/organism')
    cy.wait('@organismList', {timeout: 60000})
    cy.get(`tbody > :nth-child(1) > .cdk-column-bioSampleId`, {timeout: 60000}).should("contain", `SAMEA5781144`)
  });

  it('intercept test', () => {
    cy.get('tbody > :nth-child(1) > .cdk-column-bioSampleId').should('contain', 'SAMEA104728877999')
    cy.get('tbody')
      .find('tr')
      .should("have.length", 25)
   // cy.wait('@organismList').its('response.body').should('have.length', 25)

    cy.wait('@organismList').then(({ request, response }) => {
      console.log("sort", request.body.sort)
      console.log("request", request)
      console.log("response:", response)
    })

  });

  it('should display "FAANG organisms"', () => {
    organismPage.check_title()
  });

  it('should sort table on column BioSample ID asc', () => {
    organismPage.check_header_sort_asc('.cdk-column-bioSampleId', 'biosampleId')
  });

  it('should sort table on column BioSample ID desc', () => {
    organismPage.check_header_sort_desc('.cdk-column-bioSampleId', 'biosampleId')
  });

  // --------------------
  it('should sort table on column Sex asc', () => {
    organismPage.check_header_sort_asc('.cdk-column-sex', 'sex.text')
  });

  it('should sort table on column Sex desc', () => {
    organismPage.check_header_sort_desc('.cdk-column-sex', 'sex.text')
  });
  // --------------------

  it('should sort table on column Organism asc', () => {
    organismPage.check_header_sort_asc('.cdk-column-organism', 'organism.text')
  });

  it('should sort table on column Organism desc', () => {
    organismPage.check_header_sort_desc('.cdk-column-organism', 'organism.text')
  });
  // --------------------

  it('should sort table on column Breed asc', () => {
    organismPage.check_header_sort_asc('.cdk-column-breed', 'breed.text')
  });

  it('should sort table on column Breed desc', () => {
    organismPage.check_header_sort_desc('.cdk-column-breed', 'breed.text')
  });
  // --------------------

  it('should sort table on column Standard asc', () => {
    organismPage.check_header_sort_asc('.cdk-column-standard', 'standardMet')
  });

  it('should sort table on column Standard desc', () => {
    organismPage.check_header_sort_desc('.cdk-column-standard', 'standardMet')
  });
  // --------------------

  it('should filter table by Sex - Female', () => {
    organismPage.check_url_filter('[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(2)', 'path',  'sex.text')
  });

  it('should filter table by Organism - Sus scrofa', () => {
    organismPage.check_url_filter('[title="Organism"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'organism.text')
  });

  it('should filter table by Breed - Chicken breed', () => {
    organismPage.check_url_filter('[title="Breed"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', 'breed.text')
  });

  it('should filter table by Paper published - Yes', () => {
    organismPage.check_url_filter('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(2)', 'path', 'paperPublished')
  });

  it('should allow multiple filters', () => {
    organismPage.allow_multiple_filters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(2)',
      '[title="Breed"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'paperPublished',
      'breed.text',
      ['chicken', 'yes'])
  });

  it('should remove filters', () => {
    organismPage.removeFilters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(2)',
      '[title="Breed"] > .mat-card > :nth-child(2) > :nth-child(1)',
      'paperPublished',
      'breed.text')
  });

  it('should verify pagination', () => {
    organismPage.verify_pagination()
  });

  it('should export data as CSV', () => {
    organismPage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  });

  it('should export data as txt', () => {
    organismPage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  });


  const getAppRef = () =>
    cy.window().should('have.property', 'appRef')

  /**
   * Calls `appRef.tick()` to force UI refresh
   */
  const tick = () =>
    getAppRef()
      // @ts-ignore
      .invoke('tick')

  xit('sets reference to OrganismComponent', () => {
    cy.visit('/organism')
    cy.window()
      .should('have.property', 'OrganismComponent') // yields window.OrganismComponent
      .should('have.property', 'tableServerComponent')
      .then((tableServerComponent) => {
        tableServerComponent.dataSource.length = 0
        const organism_arr = (organismData).default;
        tableServerComponent.dataSource.data = organism_arr
        tick()
        cy.log(organism_arr)
      })

  })

})


