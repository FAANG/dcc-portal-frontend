export class GraphqlPage {

  check_tables_selection(firstIndex, secondIndex,) {
    cy.get('.mat-toolbar > span').should("contain", 'Tables & Columns Selection')
    cy.wait(1000)
    cy.get('mat-select[name=firstIndex]').click().get('mat-option').contains(firstIndex).click({force: true});
    cy.wait(1000)
    cy.get('mat-select[name=secondIndex]').click().get('mat-option').contains(secondIndex).click({force: true});
    cy.get('app-index-filters > :nth-child(1) > .mat-toolbar').should('exist')
    cy.get('.user-info > :nth-child(1)').should("contain", 'Select columns on which to add filters.')
  }

  check_filters(firstIndex, secondIndex, queryTaskName, queryResultName, filterName, filterValue,
                option1, option2, fixtureTask, fixtureResult) {

    cy.intercept('POST', '/graphql', (req) => {
    }).as("graphql1");

    cy.get('mat-select[name=firstIndex]').click().get('mat-option').contains(firstIndex).click({force: true});
    cy.get('mat-select[name=secondIndex]').click().get('mat-option').contains(secondIndex).click({force: true});
    cy.get('app-index-filters > :nth-child(1) > .mat-toolbar').should('exist')

    // select columns
    cy.get(`mat-select[name=${firstIndex}]`).click().get('mat-option').contains(option1).click({force: true});
    cy.get('div[role="listbox"]').should('exist')
    cy.get(`mat-select[name=${firstIndex}]`).get('mat-option').contains(option2).click({force: true});
    cy.get('body').click()
    cy.get('div[role="listbox"]').should('not.exist')

    cy.get('#mat-select-8 > .mat-mdc-select-trigger').click().get('mat-option')
      .contains(filterName).click();
    cy.get('#mat-input-0').type(filterValue)
    cy.get('div > div.button-div:first').click()

    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.query.includes(queryResultName)) {
        req.reply({ fixture: `data/graphql/${fixtureResult}`});
      }
    }).as("graphql2");
    cy.wait('@graphql2').its("request.url").should("contain", 'graphql')
    cy.get('tbody')
      .find('tr')
      .should("have.length.least", 1)
  }

  check_header_sort_asc(classname, colname) {
    cy.get(`.mat-mdc-header-row > ${classname}`).click({force: true})
    cy.get('tbody')
      .find('tr')
      .should("have.length.greaterThan", 2)
    cy.get(`.mat-mdc-header-row > ${classname}`).should('have.attr', 'aria-sort', 'ascending')
  }


  check_header_sort_desc(classname, colname) {
    cy.get(`.mat-mdc-header-row > ${classname}`).click({force: true})
    cy.get(`.mat-mdc-header-row > ${classname}`).click({force: true})
    cy.get('tbody')
      .find('tr')
      .should("have.length.greaterThan", 2)
    cy.get(`.mat-mdc-header-row > ${classname}`).should('have.attr', 'aria-sort', 'descending')
  }

  verify_pagination() {
    // click on pagination
    cy.get('.mat-mdc-paginator-navigation-next > .mat-mdc-button-touch-target').click()
    cy.get('.mat-mdc-paginator-range-label').should("contain", '11 – 20')

    cy.get('.mat-mdc-paginator-navigation-next > .mat-mdc-button-touch-target').click()
    cy.get('.mat-mdc-paginator-range-label').should("contain", '21 – 30')
  }

}
