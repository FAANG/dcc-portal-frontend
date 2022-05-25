describe('Dataset Detail Page', () => {
  beforeEach(() => {
    cy.visit('/protocol/analysis/ROSLIN_SOP_ATAC-Seq_analysis_pipeline_20201113.pdf');
  })

  it('should display title and other information', () => {
    cy.get('h2').should("contain", 'ATAC-Seq analysis pipeline')

    cy.wait(60000);
    cy.get('app-protocol-sample-details.ng-star-inserted > .container-fluid > div > div').then(menuitems => {
      expect(menuitems[0]).to.contain.text('ROSLIN_SOP_ATAC-Seq_analysis_pipeline_20201113.pdf')
      expect(menuitems[1]).to.contain.text('Roslin Institute (Edinburgh, UK)')
    })
  });

})










