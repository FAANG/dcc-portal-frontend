import {OntologyImproverPage} from "./ontology-improver";

describe('Ontology Improver Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/ontology_improver/search/*', {fixture: 'ontology-improver/ontology-improver.json'}).as("ontologyList")
    cy.visit('/ontology')
  })

  let ontologyPage = new OntologyImproverPage()

  it.only('should display welcome message', () => {
    cy.get('h2').should("contain", 'Livestock Ontologies');
  });


  it('should sort table on column Term', () => {
    ontologyPage.compare_value('.cdk-column-ontology_term')
  });

  it('should sort table on column Type', () => {
    ontologyPage.compare_value('.cdk-column-ontology_type')
  });

  it('should sort table on column Ontology Id', () => {
    ontologyPage.compare_value('.cdk-column-ontology_id')
  });


  it('should filter on Project', () => {
    ontologyPage.compare_filter_value('[title="Project"] > .mat-card > :nth-child(2) > :nth-child(1)', '?project=GENE-SWitCH')
  });


  it('should filter on Ontology Type', () => {
    ontologyPage.compare_filter_value('[title="Ontology Type"] > .mat-card > :nth-child(2) > :nth-child(1)', '?ontology_type=cellType')
  });


  it.only('should allow multiple filters', () => {
    ontologyPage.allow_multiple_filters('[title="Ontology Type"] > .mat-card > :nth-child(2) > :nth-child(1)', '[title="Project"] > .mat-card > :nth-child(2) > :nth-child(1)', ['cellType', 'GENE-SWitCH'])
  })

  it.only('should remove filters', () => {
    ontologyPage.removeFilters('[title="Ontology Type"] > .mat-card > :nth-child(2) > :nth-child(1)', '[title="Project"] > .mat-card > :nth-child(2) > :nth-child(1)')
  })

  it.only('should verify pagination', () => {
    ontologyPage.verify_pagination()
  })

})
