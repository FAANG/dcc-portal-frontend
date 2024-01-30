describe('Dataset Detail Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/data/file/SRR958466_2', {fixture: 'data/detail/file-SRR958466_2.json'})
    cy.visit('/file/SRR958466_2');
  })

  it('should display "SRR958466_2" in title and detailed information', () => {
    cy.get('h2').should("contain", 'SRR958466_2')

    cy.get('app-file-detail.ng-star-inserted > .container-fluid > :nth-child(1) > div > div > dd', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('SRR958466_2.fastq.gz')
      expect(menuitems[1]).to.contain.text('2014-04-30')
    })
  })

})










