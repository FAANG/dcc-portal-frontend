describe('Dataset Detail Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/analysis/ERZ990151', {fixture: 'data/detail/analysis-ERZ990151.json'})
    cy.visit('/analysis/ERZ990151');
  })

  it('should display "ERZ990151" in title and detailed information', () => {
    cy.get('h2').should("contain", 'ERZ990151')

    cy.get('app-analysis-detail.ng-star-inserted > .container-fluid > :nth-child(1) > div > div > dd', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('ERZ990151')
      expect(menuitems[1]).to.contain.text('Variants of sheep genetics stucture analysis')
    })
  })


})










