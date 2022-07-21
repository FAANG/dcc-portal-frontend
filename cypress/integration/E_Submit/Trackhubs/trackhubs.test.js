describe('Track Hub Submission', () => {
  beforeEach(() => {
    cy.visit('/trackhubs')
  })


  it('should display correct contents', () => {
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h2').should("contain", 'Track Hubs Submission')
    cy.get('button:contains("Login to start submission")')
      .should('exist')
  })

})
