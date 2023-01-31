describe('Experiment Detail Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/protocol_files/libraryGenerationProtocol-transcriptionprofilingbyhighthroughputsequencing-totalRNA', {fixture: 'data/detail/libraryGenerationProtocol.json'})
    cy.visit('/protocol/experiments/libraryGenerationProtocol-transcriptionprofilingbyhighthroughputsequencing-totalRNA');
  })

  it('should display title and other information', () => {
    cy.get('h2.ng-star-inserted').should("contain", 'Library generation protocol')
    cy.get('app-protocol-experiment-details.ng-star-inserted > .container-fluid > div > div').then(menuitems => {
      cy.get('app-robust-link').then(info => {
        expect(info[0]).to.contain.text('truseq-stranded-total-rna-sample-prep-guide-15031048-e.pdf')
      })
      expect(menuitems[1]).to.contain.text('total RNA')
    })
  })
})










