describe('Summary Organisms Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'data/summary_organism/summary_organism*', {fixture: 'summary/summary_organism.json'}).as("organismList")
    cy.visit('/summary/organisms');
  })

  it('should display "FAANG Summary"', () => {
    cy.get('h2').should("contain", 'FAANG Summary');
  });

  it('should display charts', () => {
    cy.get('app-organisms-summary.ng-star-inserted > .container-fluid > div > div > :nth-child(1) > h3', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('Sex')
      expect(menuitems[1]).to.contain.text('Organisms')
    })

    cy.get('app-organisms-summary.ng-star-inserted > .container-fluid > div > div > :nth-child(2) > h3', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('Paper published')
      expect(menuitems[1]).to.contain.text('Standard')
    })

    cy.get('[fxlayout="column"] > :nth-child(3) > mat-card >  :nth-child(1) > h3').should("contain", "Breeds of")

  });



})


