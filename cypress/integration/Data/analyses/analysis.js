export class AnalysisPage {

  check_title() {
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h2').should("contain", 'FAANG Analyses')
  }

  check_header_sort_asc(classname, colname) {
    cy.intercept('GET', `/data/analysis/_search/*&sort=*${colname}:asc*`, {fixture: 'data/analysis.json'}).as('ascendingList')

    cy.get(`.mat-header-row > ${classname}`).click({force: true})

    cy.get('tbody')
      .find('tr')
      .should("have.length", 25)

    cy.wait('@ascendingList').then(({request, response}) => {
      cy.get(`.mat-header-row > ${classname}`).should('have.attr', 'aria-sort', 'ascending')
      expect(response.statusCode).to.eq(200)
      expect(request.url).to.contain(colname + ':asc')

      console.log("request", request.url)
      console.log("response:", response)
    })
  }

  check_header_sort_desc(classname, colname) {
    cy.intercept('GET', `/data/analysis/_search/*&sort=*${colname}:desc*`, {fixture: 'data/analysis.json'}).as('descendingList')

    cy.get(`.mat-header-row > ${classname}`).click({force: true})
    cy.get(`.mat-header-row > ${classname}`).click({force: true})

    cy.wait('@descendingList', {timeout: 60000}).then(({request, response}) => {
      cy.get('tbody').find('tr').should("have.length", 25)
      cy.get(`.mat-header-row > ${classname}`).should('have.attr', 'aria-sort', 'descending')
      expect(response.statusCode).to.eq(200)
      expect(request.url).to.contain(colname + ':desc')
    })
  }

  check_url_filter(filterAccessor, filterAccessorType, colname) {
    cy.intercept('GET', '/data/analysis/_search/*filters=%7B%22' + colname + '%22:*', {fixture: 'data/analysis.json'}).as('filteredList')
    // click on filter
    if (filterAccessorType === 'string') {
      cy.contains(filterAccessor).click()
    } else {
      cy.get(filterAccessor).click({force: true})
    }

    cy.wait('@filteredList').then(({request, response}) => {
      cy.get('tbody').find('tr').should("have.length", 25)
      expect(response.statusCode).to.eq(200)
      expect(request.url).to.contain('filters=%7B%22' + colname + '%22:')
      console.log("request", request.url)
    })
  }

  allow_multiple_filters(filterAccessor_1, filterAccessor_2, colname1, colname2, filterArr) {
    cy.intercept('GET', '/data/analysis/_search/*filters=*' + colname1 + '*&aggs=*', {fixture: 'data/analysis.json'}).as('filteredList1')
    cy.intercept('GET', '/data/analysis/_search/*filters=*' + colname2 + '*&aggs=*', {fixture: 'data/analysis.json'}).as('filteredList2')

    // click on filters
    cy.get(filterAccessor_1).click()
    cy.wait("@filteredList1").its("request.url").should("contain", colname1 + '%22:')

    cy.get(filterAccessor_2).click()
    cy.wait("@filteredList2").its("request.url").should("contain", colname2 + '%22:')

    cy.get('tbody')
      .find('tr')
      .should("have.length", 25)

    cy.get('app-active-filter.ng-star-inserted').children()
      .should('have.length', 2)
      .each((el) => {
        const filtername = el.text().split('highlight_off')[0].trim();
        console.log(filtername)
        expect(filtername).to.be.oneOf(filterArr);
      })
  }

  removeFilters(filterAccessor_1, filterAccessor_2, colname1, colname2) {
    cy.intercept('GET', '/data/analysis/_search/*filters=*' + colname1 + '*&aggs=*', {fixture: 'data/analysis.json'}).as('filteredList1')
    cy.intercept('GET', '/data/analysis/_search/*filters=*' + colname2 + '*&aggs=*', {fixture: 'data/analysis.json'}).as('filteredList2')
    cy.intercept('GET', '/data/analysis/_search/*filters=%7B%7D&aggs=*', {fixture: 'data/analysis.json'}).as('noFilter')

    // click on filters
    cy.get(filterAccessor_1).click()
    cy.wait("@filteredList1").its("request.url").should("contain", colname1 + '%22:')

    cy.get(filterAccessor_2).click()
    cy.wait("@filteredList2").its("request.url").should("contain", colname2 + '%22:')

    cy.get('app-active-filter.ng-star-inserted').children().should('have.length', 2)

    cy.contains('Remove all filters').click()
    cy.wait("@noFilter", {timeout: 60000}).its("request.url").should("contain", 'filters=%7B%7D&aggs')
    cy.get('app-active-filter.ng-star-inserted').should('not.exist')
  }

  verify_pagination() {
    cy.intercept('GET', '/data/analysis/_search/*&from_=25&*', {fixture: 'data/analysis.json'}).as('pagination1')
    cy.intercept('GET', '/data/analysis/_search/*&from_=50&*', {fixture: 'data/analysis.json'}).as('pagination2')

    // click on pagination
    cy.get('.mat-paginator-navigation-next > .mat-button-wrapper > .mat-paginator-icon').click()
    cy.wait("@pagination1").its("request.url").should("contain", '&from_=25&')

    cy.get('.mat-paginator-navigation-next > .mat-button-wrapper > .mat-paginator-icon').click()
    cy.wait("@pagination2").its("request.url").should("contain", '&from_=50&')
  }

  downloadData(buttonPos, buttonTitle, fileName) {
    cy.intercept('GET', '/data/analysis/_search/*', {fixture: 'data/analysis.json'}).as("analysisList")
    cy.get('.mat-raised-button > .mat-button-wrapper')
      .should('contain', 'Download data')
      .click()
    cy.get('.ngx-spinner-overlay').should('not.exist')

    cy.get(`.table-responsive > :nth-child(${buttonPos}) > .mat-button-wrapper`)
      .should('contain', buttonTitle)
      .click()
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.verifyDownload(fileName, {timeout: 60000});
  }



}
