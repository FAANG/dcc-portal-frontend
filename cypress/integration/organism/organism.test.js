describe('Organism Page', () => {
  beforeEach(() => {
    cy.visit('/organism');
  })

  it('should display "FAANG organisms"', () => {
    cy.get('h2').should("contain", 'FAANG Organisms');
  });

  it('should sort table"', () => {
    cy.get('tbody > :nth-child(1) > .cdk-column-organism', { timeout: 60000 }).should("contain", 'Equus caballus')

    cy.get('.mat-header-row > .cdk-column-organism').click()
    cy.get('tbody > :nth-child(1) > .cdk-column-organism', { timeout: 60000 }).should("contain", 'Bos indicus')

    cy.get('.mat-header-row > .cdk-column-organism').click()
    cy.get('tbody > :nth-child(1) > .cdk-column-organism', { timeout: 60000 }).should("contain", 'gallus gallus')

  });


  it('should filter table"', () => {
    cy.get('[title="Standard"] > .mat-card > :nth-child(2) > :nth-child(1) > .badge', { timeout: 60000 })
      .invoke('text')
      .then((faangCount) => {

        // click on Female filter
        cy.get('[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(2)').click({force: true})
        cy.url().should('include', '?sex=female')
        cy.wait(6000);

        // grab the div again and compare its previous text to the current text
        cy.get('[title="Standard"] > .mat-card > :nth-child(2) > :nth-child(1) > .badge', { timeout: 60000 })
          .invoke('text')
          .should((updatedFaangCount) => {
            expect(faangCount).not.to.eq(updatedFaangCount)
          })
      })


  });

})


