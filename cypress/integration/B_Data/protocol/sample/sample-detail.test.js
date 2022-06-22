describe('Sample Detail Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/protocol_samples/ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.pdf', {fixture: 'data/detail/ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.json'})
    cy.visit('/protocol/samples/ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.pdf');
  })

  it('should display title and other information', () => {
    cy.get('h2.ng-star-inserted').should("contain", 'Harvest of Large Animal Tissues')
    cy.get('app-protocol-sample-details.ng-star-inserted > .container-fluid > div > div').then(menuitems => {
      expect(menuitems[0]).to.contain.text('ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.pdf')
      expect(menuitems[1]).to.contain.text('Roslin Institute (Edinburgh, UK)')
    })
  })



})










