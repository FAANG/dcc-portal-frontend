describe('Organism Detail Page', () => {
  beforeEach(() => {
    cy.visit('organism/SAMEA104728877');
  })

  it('should display "SAMEA104728877" in title and detailed information', () => {
    cy.get('h2').should("contain", 'SAMEA104728877');

    cy.get('app-organism-detail.ng-star-inserted > .container-fluid > :nth-child(1) > div > div').then(menuitems => {
      expect(menuitems[0]).to.contain.text('ECA_UCD_AH2')
      expect(menuitems[1]).to.contain.text('SAMEA104728877')
    })
  });


  it('should redirect to 404 when navigate to non-existing path', () => {
    cy.visit('organism/SAMEA1047288778');
    cy.get('h2').should("contain", "Sorry, this page doesn't exist...")
  });

})










