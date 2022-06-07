describe('Track Hub Submission', () => {
  beforeEach(() => {
    cy.visit('/nextflowSubmission')
  })


  it('should display correct contents', () => {
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h2').should("contain", 'Nextflow Submission')
    cy.get('h4').eq(0).should('contain', 'Upload NextFlow Configuration File')
    cy.get('h4').eq(1).should('contain', 'Upload Spreadsheet File')

  });





})
