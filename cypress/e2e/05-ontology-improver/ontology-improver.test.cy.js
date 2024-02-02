import { OntologyImproverPage } from "./ontology-improver.cy";

describe('Ontology Improver Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/summary_ontologies/_search/?size=10', {fixture: 'ontology-improver/ontology-summary.json'}).as("summaryList")
    cy.intercept('GET', '/data/ontologies/_search/*&sort=key:asc*', {fixture: 'ontology-improver/ontology-improver.json'}).as("ontologyList")
    cy.visit('/ontology')
  })

  let ontologyPage = new OntologyImproverPage()

  it('should display welcome message', () => {
    ontologyPage.check_title()
  })

  it('should sort table on column Term', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.compare_value('.cdk-column-term')
    })
  })

  it('should sort table on column Type', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.compare_value('.cdk-column-type')
    })
  })

  it('should sort table on column Ontology Id', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.compare_value('.cdk-column-id')
    })
  })


  it('should filter on Project', () => {
    ontologyPage.check_url_filter('[title="Projects"] > .mat-mdc-card > :nth-child(2) > :nth-child(1)', 'path',  'projects')
    //cy.get('[title="Projects"] > .mat-mdc-card > :nth-child(2) > :nth-child(1)')
  })

  it('should filter on Ontology Type', () => {
    ontologyPage.check_url_filter('[title="Ontology Type"] > .mat-mdc-card > :nth-child(2) > :nth-child(2)', 'path',  'type')
  })

  it('should allow multiple filters', () => {
    ontologyPage.allow_multiple_filters('[title="Projects"] > .mat-mdc-card > :nth-child(2) > :nth-child(2)',
      '[title="Ontology Type"] > .mat-mdc-card > :nth-child(2) > :nth-child(2)',
      'projects',
      'type',
      ['bovreg', 'celltype'])
  })

  it('should remove filters', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.removeFilters('[title="Ontology Type"] > .mat-mdc-card > :nth-child(2) > :nth-child(1)', '[title="Projects"] > .mat-mdc-card > :nth-child(2) > :nth-child(1)')
    })
  })

  it.skip('should verify pagination', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.verify_pagination()
    })
  })

})
