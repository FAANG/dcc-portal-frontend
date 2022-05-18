describe('Organism Page', () => {
  beforeEach(() => {
    cy.visit('/specimen');
  })

  it('should display "FAANG specimens"', () => {
    cy.get('h2').should("contain", 'FAANG Specimens');
  });

  it('should sort table"', () => {
    cy.get('tbody > :nth-child(1) > .cdk-column-material', { timeout: 60000 }).should("contain", 'specimen from organism')

    cy.get('.cdk-column-material > .mat-sort-header-container > .mat-sort-header-content').click()
    cy.get('tbody > :nth-child(1) > .cdk-column-material', { timeout: 60000 }).should("contain", 'cell culture')

    cy.get('.cdk-column-material > .mat-sort-header-container > .mat-sort-header-content').click()
    cy.get('tbody > :nth-child(1) > .cdk-column-material', { timeout: 60000 }).should("contain", 'specimen from organism')

  });


  it('should filter table"', () => {
    cy.get('[title="Standard"] > .mat-card > :nth-child(2) > :nth-child(2) > .badge', { timeout: 60000 })
      .invoke('text')
      .then((faangCount) => {

        // click on Female filter
        cy.get('[title="Sex"] > .mat-card > :nth-child(2) > :nth-child(1)').click({force: true})
        cy.url().should('include', '?sex=female')
        cy.wait(60000);

        // grab the div again and compare its previous text to the current text
        cy.get('[title="Standard"] > .mat-card > :nth-child(2) > :nth-child(2' +
          ') > .badge', { timeout: 6000 })
          .invoke('text')
          .should((updatedFaangCount) => {
            expect(faangCount).not.to.eq(updatedFaangCount)
          })
      })


  });

})


