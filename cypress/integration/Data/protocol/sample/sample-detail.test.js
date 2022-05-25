describe('Dataset Detail Page', () => {
  beforeEach(() => {
    cy.visit('/protocol/samples/ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.pdf');
  })

  it('should display title and other information', () => {
    cy.get('h2').should("contain", 'Harvest of Large Animal Tissues')

    cy.wait(60000);
    cy.get('app-protocol-sample-details.ng-star-inserted > .container-fluid > div > div').then(menuitems => {
      expect(menuitems[0]).to.contain.text('ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.pdf')
      expect(menuitems[1]).to.contain.text('Roslin Institute (Edinburgh, UK)')
    })
  });


  it('should redirect to 404 when navigate to non-existing path', () => {
    cy.visit('/protocol/samples/SAMEA1047288778');
    cy.get('.container-fluid > .text-center', {timeout: 10000}).should("contain", "Sorry, this page doesn't exist...")
  });

})










