export class ExperimentsPage{

  check_page_contents(){
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h2').should("contain", 'FAANG Rule sets')
    cy.get('#mat-tab-label-0-0').should("contain", 'Samples')
    cy.get('#mat-tab-label-0-1').should('contain', 'Experiments')
    cy.get('#mat-tab-label-0-2').should('contain', 'Analysis')

    cy.get('app-ruleset-experiment.ng-star-inserted > .container-fluid > dl > div:nth-child(1) > dd').should('contain', 'FAANG experiments core metadata rules')
    cy.get('app-ruleset-experiment.ng-star-inserted > .container-fluid > dl > div:nth-child(2) > dd').should('contain', 'Validation rules for the FAANG project. Rules are divided into one group that is applied to all experiments, and additional groups based on the experiment type.')
  }

  check_ruleset_list(){
    cy.get('.ng-star-inserted > div:nth-child(1) > ul').find('li').its('length').should('eq', 12)
  }

  check_ruleset_table(){
    cy.get('.table-responsive.center').should('exist')
    cy.get('.mat-table.cdk-table > tbody > tr').its("length").should('be.gte', 6)

    cy.get('.mat-table.cdk-table > tbody > tr').each((tr)=> {
      cy.get('tr > td:nth-child(1)').should('contain', 'Project')
      cy.get('tr > td:nth-child(1)').should('contain', 'Secondary project')
      cy.get('tr > td:nth-child(1)').should('contain', 'assay type')
      cy.get('tr > td:nth-child(1)').should('contain', 'sample storage')
      cy.get('tr > td:nth-child(1)').should('contain', 'sample storage processing')
      cy.get('tr > td:nth-child(1)').should('contain', 'sampling to preparation interval')
    })
  }


  check_ruleset_links() {
    cy.get('.table-responsive.center').should('exist')

    cy.get('.left > ul:nth-child(1) > li > a').click()
    cy.location('href').should('contain', 'experiments#Standard');
    this.check_ruleset_table_headers()
    this.check_ruleset_table_rulename('Standard')

    cy.get('.left > ul:nth-child(2) > li > a').click()
    cy.location('href').should('contain', 'experiments#ATAC-seq');
    this.check_ruleset_table_headers()
    this.check_ruleset_table_rulename('AtacSeq')

    cy.get('.left > ul:nth-child(3) > li > a').click()
    cy.location('href').should('contain', 'experiments#BS-seq');

    cy.get('.left > ul:nth-child(4) > li > a').click()
    cy.location('href').should('contain', 'experiments#ChIP-seq%20standard%20rules');

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
      case 'Standard':
        cy.get('.table-responsive.center').should('exist')
        cy.get('.mat-table.cdk-table > tbody > tr').its("length").should('be.gte', 6)
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'Project')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'Secondary project')
        break;
      case 'AtacSeq':
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'experiment target')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'transposase protocol')
        break;
      default:
        cy.get('.mat-table.cdk-table > tbody > tr').its("length").should('be.gte', 2)
    }
  }
}
