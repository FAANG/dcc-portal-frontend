describe('Summary Specimens Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'data/summary_file/summary_specimen*', {fixture: 'summary/summary_specimen.json'}).as("specimenList")
    cy.visit('/summary/specimens');
  })

  it('should display "FAANG Summary"', () => {
    cy.get('h2').should("contain", 'FAANG Summary');
  })

  it('should display charts', () => {
    cy.get('app-specimens-summary.ng-star-inserted > .container-fluid')
    cy.get('app-specimens-summary.ng-star-inserted > .container-fluid > div > div > :nth-child(1) > h3', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('Sex')
      expect(menuitems[1]).to.contain.text('Standard')
      expect(menuitems[2]).to.contain.text('Organisms')
    })

    cy.get('app-specimens-summary.ng-star-inserted > .container-fluid > div > div > :nth-child(2) > h3', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('Paper published')
      expect(menuitems[1]).to.contain.text('Organism part/Cell type')
      expect(menuitems[2]).to.contain.text('Materials')
    })

    cy.get('[fxlayout="column"] > :nth-child(4) > mat-card >  :nth-child(1) > h3').should("contain", "Breeds of")

  })



})


