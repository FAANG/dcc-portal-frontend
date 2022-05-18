describe('Organism Page', () => {
  beforeEach(() => {
    cy.visit('/dataset');
  })

  it('should display "FAANG datasets"', () => {
    cy.get('h2').should("contain", 'FAANG Datasets');
  });

  it('should sort table"', () => {
    cy.get('tbody > :nth-child(1) > .cdk-column-species', { timeout: 60000 }).should("contain", 'Gallus gallus')

    cy.get('.cdk-column-species > .mat-sort-header-container > .mat-sort-header-content').click()
    cy.get('tbody > :nth-child(1) > .cdk-column-species', { timeout: 60000 }).should("contain", 'Bos indicus')

    cy.get('.cdk-column-species > .mat-sort-header-container > .mat-sort-header-content').click()
    cy.get('tbody > :nth-child(1) > .cdk-column-species', { timeout: 60000 }).should("contain", 'Sus scrofa')
  });


  it.only('should filter table"', () => {
    cy.get('[title="Standard"] > .mat-card > :nth-child(2) > :nth-child(1) > .badge', { timeout: 60000 })
      .invoke('text')
      .then((legacyCount) => {

        // click on Species filter
        cy.get('[title="Species"] > .mat-card > :nth-child(2) > :nth-child(1)').click({force: true})
        cy.url().should('include', '?species=Gallus%20gallus')
        cy.wait(60000);

        // grab the div again and compare its previous text to the current text
        cy.get('[title="Standard"] > .mat-card > :nth-child(2) > :nth-child(1' +
          ') > .badge', { timeout: 6000 })
          .invoke('text')
          .should((updatedLegacyCount) => {
            expect(legacyCount).not.to.eq(updatedLegacyCount)
          })
      })
  });

})


