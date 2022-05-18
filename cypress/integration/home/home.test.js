describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display welcome message', () => {
    cy.get('app-root h1').should("contain", 'Data Portal');
  });

})
