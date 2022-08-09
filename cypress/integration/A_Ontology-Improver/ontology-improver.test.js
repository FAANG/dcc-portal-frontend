import {OntologyImproverPage} from "./ontology-improver";

describe.skip('Ontology Improver Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/ontology_improver/summary*', {fixture: 'ontology-improver/ontology-summary.json'}).as("summaryList")
    cy.intercept('GET', '/ontology_improver/search/*', {fixture: 'ontology-improver/ontology-improver.json'}).as("ontologyList")
    cy.visit('/ontology')
  })

  let ontologyPage = new OntologyImproverPage()

  it('should display welcome message', () => {
    cy.get('h2').should("contain", 'Livestock Ontologies')
  })


  it('should sort table on column Term', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.compare_value('.cdk-column-ontology_term')
    })
  })

  it('should sort table on column Type', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.compare_value('.cdk-column-ontology_type')
    })
  })

  it('should sort table on column Ontology Id', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.compare_value('.cdk-column-ontology_id')
    })
  })


  it('should filter on Project', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.compare_filter_value('[title="Project"] > .mat-card > :nth-child(2) > :nth-child(1)', '?project=GENE-SWitCH')
    })
  })


  it('should filter on Ontology Type', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.compare_filter_value('[title="Ontology Type"] > .mat-card > :nth-child(2) > :nth-child(1)', '?ontology_type=cellType')
    })
  })


  it('should allow multiple filters', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.allow_multiple_filters('[title="Ontology Type"] > .mat-card > :nth-child(2) > :nth-child(1)', '[title="Project"] > .mat-card > :nth-child(2) > :nth-child(1)', ['cellType', 'GENE-SWitCH'])
    })
  })

  it('should remove filters', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.removeFilters('[title="Ontology Type"] > .mat-card > :nth-child(2) > :nth-child(1)', '[title="Project"] > .mat-card > :nth-child(2) > :nth-child(1)')
    })
  })

  it('should verify pagination', () => {
    cy.wait('@ontologyList').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      ontologyPage.verify_pagination()
    })
  })

})
