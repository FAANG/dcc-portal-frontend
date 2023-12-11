export class AnalysisPage{

  check_page_contents(){
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h2').should("contain", 'FAANG Rule sets')
    cy.get('#mat-tab-label-0-0').should("contain", 'Samples')
    cy.get('#mat-tab-label-0-1').should('contain', 'Experiments')
    cy.get('#mat-tab-label-0-2').should('contain', 'Analysis')

    cy.get('app-ruleset-analysis.ng-star-inserted > .container-fluid > dl > div:nth-child(1) > dd').should('contain', "FAANG analyses metadata rules for 'faang'")
    cy.get('app-ruleset-analysis.ng-star-inserted > .container-fluid > dl > div:nth-child(2) > dd').should('contain', 'Validation rules for the FAANG project. Rules are divided into one group that is applied to all analyses, and additional groups based on the analysis type.')
  }

  check_ruleset_list(){
    cy.get('.ng-star-inserted > div:nth-child(1) > ul').find('li').its('length').should('eq', 3)
  }

  check_ruleset_table(){
    cy.get('app-ruleset-analysis.ng-star-inserted > .container-fluid').should('exist')

    cy.get('.ngx-spinner-overlay').should('not.exist')

    cy.get('.table-responsive.center').should('exist')
    cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > tbody > tr').its("length").should('be.gte', 6)
    cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > tbody > tr').each((tr)=> {
      cy.get('tr > td:nth-child(1)').should('contain', 'alias')
      cy.get('tr > td:nth-child(1)').should('contain', 'project')
      cy.get('tr > td:nth-child(1)').should('contain', 'secondary project')
      cy.get('tr > td:nth-child(1)').should('contain', 'assay type')
      cy.get('tr > td:nth-child(1)').should('contain', 'analysis protocol')
      cy.get('tr > td:nth-child(1)').should('contain', 'analysis code')
    })
  }


  check_ruleset_links() {
    cy.get('.table-responsive.center').should('exist')

    cy.get('.left > ul:nth-child(1) > li > a').click()
    cy.location('href').should('contain', 'analyses#FAANG');
    this.check_ruleset_table_headers()
    this.check_ruleset_table_rulename('FAANG')

    cy.get('.left > ul:nth-child(2) > li > a').click()
    cy.location('href').should('contain', 'analyses#ENA');
    this.check_ruleset_table_headers()
    this.check_ruleset_table_rulename('ENA')

    cy.get('.left > ul:nth-child(3) > li > a').click()
    cy.location('href').should('contain', 'analyses#EVA');
    this.check_ruleset_table_headers()
    this.check_ruleset_table_rulename('EVA')

  }

  check_ruleset_table_headers(){
        cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > thead > tr > th').each((th)=> {
          cy.get('th').should('contain', 'Name')
          cy.get('th').should('contain', 'Description')
          cy.get('th').should('contain', 'Type')
          cy.get('th').should('contain', 'Required?')
          cy.get('th').should('contain', 'Allow multiple?')
          cy.get('th').should('contain', 'Valid values')
          cy.get('th').should('contain', 'Valid units')
          cy.get('th').should('contain', 'Valid terms')
          cy.get('th').should('contain', 'Condition')
        })
    }


  check_ruleset_table_rulename(rulegroup){
    switch(rulegroup) {
      case 'FAANG':
        cy.get('.table-responsive.center').should('exist')
        cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > tbody > tr').its("length").should('be.gte', 6)
        cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > tbody > tr').should('contain', 'alias')
        cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > tbody > tr').should('contain', 'project')
        break;
      case 'ENA':
        cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > tbody > tr').should('contain', 'title')
        cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > tbody > tr').should('contain', 'alias')
        break;
      case 'EVA':
        cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > tbody > tr').should('contain', 'experiment type')
        cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > tbody > tr').should('contain', 'program')
        break;
      default:
        cy.get('.mat-mdc-table.mdc-data-table__table.cdk-table > tbody > tr').its("length").should('be.gte', 2)
    }
  }
}
