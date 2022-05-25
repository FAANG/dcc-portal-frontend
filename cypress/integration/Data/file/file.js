export class FilePage {

  check_title() {
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h2').should("contain", 'FAANG Files')
  }

  sort_column(classname, asc_val, desc_val) {
    cy.get(`.mat-header-row > ${classname}`).click({force: true})
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get(`tbody > :nth-child(2) > ${classname}`).should("contain", `${asc_val}`)

    cy.get(`.mat-header-row > ${classname}`).click({force: true})
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get(`tbody > :nth-child(2) > ${classname}`).should("contain", `${desc_val}`)

  }

  compare_value(classname) {
    cy.get(`.mat-header-row > ${classname}`).click({force: true})
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get(`tbody > :nth-child(1) > ${classname}`)
      .invoke('text')
      .then((ascVal) => {

        // click on desc link
        cy.get(`.mat-header-row > ${classname}`).click({force: true})
        cy.get('.ngx-spinner-overlay').should('not.exist')
        cy.get('[title="Standard"] > .mat-card > :nth-child(2) > :nth-child(1) > .badge').should('be.visible');

        cy.get('tbody')
          .find('tr')
          .should("have.length", 25)

        // grab the value again and compare the previous text to the current one
        cy.get(`tbody > :nth-child(1) > ${classname}`)
          .invoke('text')
          .should((descVal) => {
            expect(ascVal).not.to.eq(descVal)
          })
      })
  }

  compare_filter_value(filterAccessor, filterAccessorType, queryParam) {
    const faangCountAccessor = '[title="Standard"] > .mat-card > :nth-child(2) > :nth-child(2) > .badge'
    cy.get(faangCountAccessor)
      .invoke('text')
      .then((faangCount) => {

        // click on filter
        if (filterAccessorType === 'string'){
          cy.contains(filterAccessor).click()
        } else{
          cy.get(filterAccessor).click({force: true})
        }

        cy.get('.ngx-spinner-overlay').should('not.exist')
        cy.url().should('include', queryParam)
        cy.get('tbody').find('tr').should("have.length", 25)

        // grab the div again and compare its previous text to the current text
        cy.get(faangCountAccessor)
          .invoke('text')
          .should((updatedFaangCount) => {
            expect(faangCount).not.to.eq(updatedFaangCount)
          })
      })
  }

  allow_multiple_filters(filterAccessor_1, filterAccessor_2, queryParam, filterArr) {
    cy.get(filterAccessor_1).click({force: true})
    cy.get(filterAccessor_2).click({force: true})
    cy.url().should('include', queryParam)
    cy.get('app-active-filter.ng-star-inserted').children()
      .should('have.length', 2)
      .each((el) => {
        const filtername = el.text().trim().toLowerCase().split(/(\s+)/)[0];
        expect(filtername).to.be.oneOf(filterArr);
      })
  }

  removeFilters(filterAccessor_1, filterAccessor_2, queryParam){
    cy.get(filterAccessor_1).click({force: true})
    cy.get(filterAccessor_2).click({force: true})
    cy.get('app-active-filter.ng-star-inserted').children().should('have.length', 2)
    this.compare_filter_value('Remove all filters', 'string', queryParam)
  }


  verify_pagination() {
    const fileName = 'tbody > :nth-child(1) > .cdk-column-fileName > a'
    cy.get(fileName)
      .invoke('text')
      .then((firstVal) => {

        // click on pagination
        cy.get('.mat-paginator-navigation-next > .mat-button-wrapper > .mat-paginator-icon').click()
        cy.get('.ngx-spinner-overlay').should('not.exist')


        // grab the div again and compare its previous text to the current text
        let secVal
        cy.get(fileName)
          .invoke('text')
          .should((secondVal) => {
            secVal = secondVal
            expect(firstVal).not.to.eq(secondVal)
          })

        // click on pagination again
        cy.get('.mat-paginator-navigation-next > .mat-button-wrapper > .mat-paginator-icon').click()
        cy.get('.ngx-spinner-overlay').should('not.exist')

        cy.get(fileName)
          .invoke('text')
          .should((thirdVal) => {
            expect(secVal).not.to.eq(thirdVal)
          })
      })



  }

  downloadData(buttonPos, buttonTitle, fileName){
    cy.get('.mat-raised-button > .mat-button-wrapper')
      .should('contain', 'Download data')
      .click()
    cy.get('.ngx-spinner-overlay').should('not.exist')

    cy.get(`.table-responsive > :nth-child(${buttonPos}) > .mat-button-wrapper`)
      .should('contain', buttonTitle)
      .click()
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.verifyDownload(fileName, { timeout: 60000 });
  }



}
