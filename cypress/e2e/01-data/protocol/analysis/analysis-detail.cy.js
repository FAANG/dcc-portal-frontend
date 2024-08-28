describe('Analysis Detail Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/protocol_analysis/%22ROSLIN_SOP_ATAC-Seq_analysis_pipeline_20201113.pdf%22', {fixture: 'data/detail/analysis-ROSLIN_SOP_ATAC-Seq_analysis_pipeline_20201113.json'})
    cy.visit('/protocol/analysis/%22ROSLIN_SOP_ATAC-Seq_analysis_pipeline_20201113.pdf%22')
  })

  it('should display title and other information', () => {
    cy.get('h2.ng-star-inserted').should("contain", 'ATAC-Seq analysis pipeline')

    cy.get('app-protocol-analysis-details.ng-star-inserted > .container-fluid > div > div').then(menuitems => {
      cy.get('app-robust-link').then(info => {
        expect(info[0]).to.contain.text('ROSLIN_SOP_ATAC-Seq_analysis_pipeline_20201113.pdf')
      })
      expect(menuitems[1]).to.contain.text('Roslin Institute (Edinburgh, UK)')
    })
  })

})










