describe('Specimen Detail Page', () => {
  beforeEach(() => {
    cy.visit('/specimen/SAMEA104728909');
  })

  it('should display "SAMEA104728909" in title and detailed information', () => {
    cy.get('h2').should("contain", 'SAMEA104728909');

    cy.get('app-specimen-detail.ng-star-inserted > .container-fluid > :nth-child(1) > dl > div').then(menuitems => {
      expect(menuitems[0]).to.contain.text('ECA_UCD_S63')
      expect(menuitems[1]).to.contain.text('SAMEA104728909')
    })
  });


  it('should redirect to 404 when navigate to non-existing path', () => {
    cy.visit('/specimen/SAMEA1047288778');
    cy.get('.container-fluid > .text-center').should("contain", "Sorry, this page doesn't exist...")
  });

})










