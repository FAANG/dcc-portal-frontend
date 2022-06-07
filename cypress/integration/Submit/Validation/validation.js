export class ValidationPage{

  check_page_contents(){
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h3').should("contain", 'Upload template')
  }

  uploadFile(uploadType){
    let filepath
    if (uploadType == 'sample'){
      filepath = 'cypress/fixtures/submit/validation/sample.xlsx'
    } else if (uploadType == 'experiment'){
      filepath = 'cypress/fixtures/submit/validation/experiment.xlsx'
    } else if (uploadType == 'analysis'){
      filepath = 'cypress/fixtures/submit/validation/analysis.xlsx'
    }
    cy.get('input[type=file]').selectFile(filepath)
    cy.get('button:contains("Upload")').should('not.be.disabled')
    cy.get('button:contains("Upload")').click()
    cy.get('h3').eq(1).should("contain", 'Conversion and Validation results')
    cy.get('h6:contains("Conversion Status")')
      .should('exist')
      .next()
      .should('contain', 'Success')


    cy.get('h6:contains("Validation Status")')
      .should('exist')

    cy.wait(10000)
    cy.get('h6:contains("Validation Status")')
      .next()
      .should('be.visible')
      .should('contain', 'Finished')

    cy.get('h3').eq(2).should("contain", 'Prepare data for submission')
  }

  check_ruleset_list(){
    cy.get('.ng-star-inserted > div:nth-child(1) > ul').find('li').its('length').should('eq', 3)
  }

  check_ruleset_table(){
    cy.get('.table-responsive.center').should('exist')
    cy.get('.mat-table.cdk-table > tbody > tr').its("length").should('be.gte', 6)

    cy.get('.mat-table.cdk-table > tbody > tr').each((tr)=> {
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
        cy.get('.mat-table.cdk-table > thead > tr > th').each((th)=> {
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
        cy.get('.mat-table.cdk-table > tbody > tr').its("length").should('be.gte', 6)
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'alias')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'project')
        break;
      case 'ENA':
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'title')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'alias')
        break;
      case 'EVA':
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'experiment type')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'program')
        break;
      default:
        cy.get('.mat-table.cdk-table > tbody > tr').its("length").should('be.gte', 2)
    }
  }
}
