export class OntologyImproverPage {

  check_title() {
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h2').should("contain", 'FAANG Analyses')
  }


  compare_value(classname) {
    cy.get(`.mat-mdc-header-row > ${classname}`).click({force: true})
    cy.get(`tbody > :nth-child(1) > ${classname}`)
      .invoke('text')
      .then((ascVal) => {

        // click on desc link
        cy.get(`.mat-mdc-header-row> ${classname}`).click({force: true})

        cy.get('.ngx-spinner-overlay').should('not.exist')


        // grab the value again and compare the previous text to the current one
        cy.get(`tbody > :nth-child(1) > ${classname}`)
          .invoke('text')
          .should((descVal) => {
            expect(ascVal).not.to.eq(descVal)
          })
      })
  }

  check_url_filter(filterAccessor, filterAccessorType, colname) {
    cy.intercept('GET', '/data/ontologies/_search/*filters=%7B%22' + colname + '%22:*', {fixture: 'ontology-improver/ontology-improver.json'}).as('filteredList')

    // click on filter
    if (filterAccessorType === 'string') {
      cy.contains(filterAccessor).click()
    } else {
      cy.get(filterAccessor).click({force: true})
    }

    cy.get('tbody')
      .find('tr')
      .should("have.length.greaterThan", 5)

    cy.wait('@filteredList').then(({request, response}) => {
      expect(response.statusCode).to.eq(200)
      expect(request.url).to.contain('filters=%7B%22' + colname + '%22:')
      console.log("request", request.url)
    })
  }


  allow_multiple_filters(filterAccessor_1, filterAccessor_2, colname1, colname2, filterArr) {
    cy.intercept('GET', '/data/ontologies/_search/*filters=*' + colname1 + '*&aggs=*', {fixture: 'ontology-improver/ontology-improver.json'}).as('filteredList1')
    cy.intercept('GET', '/data/ontologies/_search/*filters=*' + colname2 + '*&aggs=*', {fixture: 'ontology-improver/ontology-improver.json'}).as('filteredList2')
    // click on filters
    cy.get(filterAccessor_1).click()
    cy.wait("@filteredList1").its("request.url").should("contain", colname1 + '%22:')

    cy.get(filterAccessor_2).click()
    cy.wait("@filteredList2").its("request.url").should("contain", colname2 + '%22:')

    cy.get('tbody')
      .find('tr')
      .should("have.length.greaterThan", 5)

    cy.get('app-active-filter.ng-star-inserted').children()
      .should('have.length', 2)
      .each((el) => {
        const filtername = el.text().trim().toLowerCase().split(/(\s+)/)[0].replace("highlight_off", "");
        expect(filtername).to.be.oneOf(filterArr);
      })
  }


  removeFilters(filterAccessor_1, filterAccessor_2) {
    cy.get('[title="Projects"] >.mat-mdc-card > :nth-child(2) > :nth-child(1)').should('exist')

    // click on filters
    cy.get(filterAccessor_1).click({force: true})
    cy.get(filterAccessor_2).click({force: true})


    cy.get('app-active-filter.ng-star-inserted').children().should('have.length', 2)

    cy.contains('Remove all filters').click({force: true})
     cy.get('app-active-filter.ng-star-inserted').should('not.exist')
  }


  verify_pagination() {

    cy.get('[title="Projects"] >.mat-mdc-card > :nth-child(2) > :nth-child(1)').should('exist')

    // click on pagination
    const termVal = '.mat-mdc-paginator-range-label'
    cy.get(termVal)
      .invoke('text')
      .then((originalVal) => {

        // click on filter
        cy.get('.mat-mdc-paginator-range-actions').click()
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
