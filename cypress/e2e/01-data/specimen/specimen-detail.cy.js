describe('Specimen Detail Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/specimen/SAMEA104728909', {fixture: 'data/detail/specimen-SAMEA104728909.json'})
    cy.visit('/specimen/SAMEA104728909');
  })

  it('should display "SAMEA104728909" in title and detailed information', () => {
    cy.get('h2').should("contain", 'SAMEA104728909');

    cy.get('app-specimen-detail.ng-star-inserted > .container-fluid > :nth-child(1) > dl > div').then(menuitems => {
      expect(menuitems[0]).to.contain.text('ECA_UCD_S63')
      expect(menuitems[1]).to.contain.text('SAMEA104728909')
    })
  })

})










