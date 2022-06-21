describe('Summary Files Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'data/summary_file/summary_file*', {fixture: 'summary/summary_file.json'}).as("fileList")
    cy.visit('/summary/files');
  })

  it('should display "FAANG Summary"', () => {
    cy.get('h2').should("contain", 'FAANG Summary');
  })

  it('should display charts', () => {
    cy.get('app-files-summary.ng-star-inserted > .container-fluid')
    cy.get('app-files-summary.ng-star-inserted > .container-fluid')
    cy.get('app-files-summary.ng-star-inserted > .container-fluid > div > div > :nth-child(1) > h3', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('Standard')
      expect(menuitems[1]).to.contain.text('Species')
    })

    cy.get('app-files-summary.ng-star-inserted > .container-fluid > div > div > :nth-child(2) > h3', {timeout: 10000}).then(menuitems => {
      expect(menuitems[0]).to.contain.text('Paper published')
      expect(menuitems[1]).to.contain.text('Assay type')
    })

  })



})


