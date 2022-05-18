describe('Dataset Detail Page', () => {
  beforeEach(() => {
    cy.visit('/dataset/PRJEB28219');
  })

  it('should display "PRJEB28219" in title and detailed information', () => {
    cy.get('h2').should("contain", 'PRJEB28219')

    cy.get('app-dataset-detail.ng-star-inserted > .container-fluid > :nth-child(1) > div > div > dd', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('PRJEB28219')
      expect(menuitems[1]).to.contain.text('Bovine small and micro RNA expression atlas')
    })
  });


  it('should redirect to 404 when navigate to non-existing path', () => {
    cy.visit('/dataset/SAMEA1047288778');
    cy.get('.container-fluid > .text-center', {timeout: 10000}).should("contain", "Sorry, this page doesn't exist...")
  });

})










