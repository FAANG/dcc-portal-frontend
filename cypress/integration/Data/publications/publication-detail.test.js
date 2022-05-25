describe('Dataset Detail Page', () => {
  beforeEach(() => {
    cy.visit('/article/PMC6950892');
  })

  it('should display "PMC6950892" in title and other detailes', () => {
    cy.get('h2').should("contain", 'PMC6950892')

    cy.get('app-dataset-detail.ng-star-inserted > .container-fluid > :nth-child(1) > div > div > dd', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('Assessing genomic diversity and signatures of selection in Original Braunvieh cattle using whole-genome sequencing data.')
      expect(menuitems[1]).to.contain.text('Bhati M, Kadri NK, Crysnanto D, Pausch H.')
    })
  });
})










