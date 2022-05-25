describe('Dataset Detail Page', () => {
  beforeEach(() => {
    cy.visit('/protocol/experiments/libraryGenerationProtocol-transcriptionprofilingbyhighthroughputsequencing-totalRNA');
  })

  it('should display title and other information', () => {
    cy.get('h2').should("contain", 'Library generation protocol')

    cy.wait(60000);
    cy.get('app-protocol-experiment-details.ng-star-inserted > .container-fluid > div > div').then(menuitems => {
      expect(menuitems[0]).to.contain.text('truseq-stranded-total-rna-sample-prep-guide-15031048-e.pdf')
      expect(menuitems[1]).to.contain.text('total RNA')
    })
  });


  it('should redirect to 404 when navigate to non-existing path', () => {
    cy.visit('/protocol/experiments/SAMEA1047288778');
    cy.get('.container-fluid > .text-center', {timeout: 10000}).should("contain", "Sorry, this page doesn't exist...")
  });

})










