describe('Dataset Detail Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/dataset/PRJEB28219', {fixture: 'data/detail/dataset-PRJEB28219.json'})
    cy.visit('/dataset/PRJEB28219');
  })

  it('should display "PRJEB28219" in title and detailed information', () => {
    cy.get('h2').should("contain", 'PRJEB28219')

    cy.get('app-dataset-detail.ng-star-inserted > .container-fluid > :nth-child(1) > div > div > dd', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('PRJEB28219')
      expect(menuitems[1]).to.contain.text('Bovine small and micro RNA expression atlas')
    })
  })

})










