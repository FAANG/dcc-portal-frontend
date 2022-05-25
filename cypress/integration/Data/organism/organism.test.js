import {OrganismPage} from "./organism"
import * as organismData from '../../../fixtures/organism.json';

describe('Organism Page', () => {
  beforeEach(() => {
    // cy.visit('/organism');
    cy.intercept('GET', '/data/organism/_search/*', {fixture: 'organism.json'}).as("organismList")
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

  it.only('should sort table on column BioSample ID', () => {
    organismPage.check_header_sort_asc('.cdk-column-bioSampleId')
  });

  it('should sort table on column BioSample ID', () => {
    organismPage.check_header_sort_desc('.cdk-column-bioSampleId')
  });

  it('should sort table on column Sex', () => {
    organismPage.check_header_sort_asc('.cdk-column-sex')
  });






  it('should sort table on column BioSample ID', () => {
    organismPage.compare_value('.cdk-column-bioSampleId')
  });

  it('should sort table on column Sex', () => {
    organismPage.sort_column('.cdk-column-sex', 'female', 'restricted access')
  });

  it('should sort table on column Organism', () => {
    organismPage.sort_column('.cdk-column-organism', 'Bos indicus', 'Bos indicus')
  });

  it('should sort table on column Breed', () => {
    organismPage.sort_column('.cdk-column-breed', 'Alpine', 'sheep crossbreed')
  });

  it('should sort table on column Standard', () => {
    organismPage.sort_column('.cdk-column-standard', 'FAANG', 'Legacy')
  });

  it('should filter table by Sex - Female', () => {
    organismPage.compare_filter_value('[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(2)', 'path',  '?sex=female')
  });

  it('should filter table by Organism - Sus scrofa', () => {
    organismPage.compare_filter_value('[title="Organism"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?organism=Sus%20scrofa')
  });

  it('should filter table by Breed - Chicken breed', () => {
    organismPage.compare_filter_value('[title="Breed"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?breed=chicken%20breed')
  });

  it('should filter table by Paper published - Yes', () => {
    organismPage.compare_filter_value('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(2)', 'path', '?paper_published=Yes')
  });

  it('should allow multiple filters', () => {
    organismPage.allow_multiple_filters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(2)',
      '[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '?sex=male&paper_published=Yes',
      ['male', 'yes'])
  });

  it('should remove filters', () => {
    organismPage.removeFilters('[title="Paper published"] > .mat-card > :nth-child(2) > :nth-child(2)',
      '[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '/organism')
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


