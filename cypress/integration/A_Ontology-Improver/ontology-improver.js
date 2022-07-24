export class OntologyImproverPage {

  check_title() {
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h2').should("contain", 'FAANG Analyses')
  }


  compare_value(classname) {
    cy.get(`.mat-header-row > ${classname}`).click({force: true})
    cy.get(`tbody > :nth-child(1) > ${classname}`)
      .invoke('text')
      .then((ascVal) => {

        // click on desc link
        cy.get(`.mat-header-row > ${classname}`).click({force: true})

        cy.get('.ngx-spinner-overlay').should('not.exist')


        // grab the value again and compare the previous text to the current one
        cy.get(`tbody > :nth-child(1) > ${classname}`)
          .invoke('text')
          .should((descVal) => {
            expect(ascVal).not.to.eq(descVal)
          })
      })
  }

  compare_filter_value(filterAccessor, queryParam) {
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('[title="Project"] > .mat-card > :nth-child(2) > :nth-child(1)').should('exist')

    const termVal = 'tbody > :nth-child(1) > .cdk-column-ontology_term'
    cy.get(termVal)
      .invoke('text')
      .then((originalVal) => {

        // click on filter
        cy.get(filterAccessor).click({force: true})

        cy.get('.ngx-spinner-overlay').should('not.exist')

        cy.url().should('include', queryParam)

        // grab the div again and compare its previous text to the current text
        cy.get(termVal)
          .invoke('text')
          .should((updatedVal) => {
            expect(originalVal).not.to.eq(updatedVal)
          })
      })
  }


  allow_multiple_filters(filterAccessor_1, filterAccessor_2, filterArr) {
    cy.get(filterAccessor_1).should('exist')
    cy.get(filterAccessor_2).should('exist')
    // click on filters
    cy.get(filterAccessor_1).click({force: true})
    cy.get(filterAccessor_2).click({force: true})

    cy.get('app-active-filter.ng-star-inserted').children()
      .should('have.length', 2)
      .each((el) => {
        const filtername = el.text().trim().split(/(\s+)/)[0];
        // cy.log(el.text().trim().split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } ))
        expect(filtername).to.be.oneOf(filterArr);
      })
  }


  removeFilters(filterAccessor_1, filterAccessor_2) {
    cy.get('[title="Project"] > .mat-card > :nth-child(2) > :nth-child(1)').should('exist')

    // click on filters
    cy.get(filterAccessor_1).click({force: true})
    cy.get(filterAccessor_2).click({force: true})


    cy.get('app-active-filter.ng-star-inserted').children().should('have.length', 2)

    cy.contains('Remove all filters').click({force: true})
     cy.get('app-active-filter.ng-star-inserted').should('not.exist')
  }


  verify_pagination() {

    cy.get('[title="Project"] > .mat-card > :nth-child(2) > :nth-child(1)').should('exist')

    // click on pagination
    const termVal = '.mat-paginator-range-label'
    cy.get(termVal)
      .invoke('text')
      .then((originalVal) => {

        // click on filter
        cy.get('.mat-paginator-navigation-next > .mat-button-wrapper > .mat-paginator-icon').click()
        cy.get('.ngx-spinner-overlay').should('not.exist')


        // grab the div again and compare its previous text to the current text
        cy.get(termVal)
          .invoke('text')
          .should((updatedVal) => {
            expect(originalVal).not.to.eq(updatedVal)
          })
      })
  }



}
