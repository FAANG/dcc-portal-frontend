export class SamplesPage{

  check_page_contents(){
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h2').should("contain", 'FAANG Rule sets')
    cy.get('#mat-tab-label-0-0').should("contain", 'Samples')
    cy.get('#mat-tab-label-0-1').should('contain', 'Experiments')
    cy.get('#mat-tab-label-0-2').should('contain', 'Analysis')

    cy.get('app-ruleset-sample.ng-star-inserted > .container-fluid > dl > div:nth-child(1) > dd').should('contain', 'FAANG sample core metadata rules')
    cy.get('app-ruleset-sample.ng-star-inserted > .container-fluid > dl > div:nth-child(2) > dd').should('contain', 'Validation rules for the FAANG project. Rules are divided into one group that is applied to all samples, and additional groups based on the sample type. In addition to rules defined individually, attribute names are imported from the VT, ATOL and EOL ontologies.')
  }

  check_ruleset_list(){
    cy.get('.ng-star-inserted > div:nth-child(1) > ul').find('li').its('length').should('eq', 11)
  }

  check_ruleset_table(){
    cy.get('.table-responsive.center').should('exist')
    cy.get('.mat-table.cdk-table > tbody > tr').its("length").should('be.gte', 6)

    cy.get('.mat-table.cdk-table > tbody > tr').each(()=> {
      cy.get('tr > td:nth-child(1)').should('contain', 'Sample Description')
      cy.get('tr > td:nth-child(1)').should('contain', 'Material')
      cy.get('tr > td:nth-child(1)').should('contain', 'Project')
      cy.get('tr > td:nth-child(1)').should('contain', 'Secondary project')
      cy.get('tr > td:nth-child(1)').should('contain', 'Availability')
      cy.get('tr > td:nth-child(1)').should('contain', 'Same as')
    })
  }


  check_ruleset_links() {
    cy.get('.table-responsive.center').should('exist')

    cy.get('.left > ul:nth-child(1) > li > a').click()
    cy.location('href').should('contain', 'samples#Standard');
    this.check_ruleset_table_headers('Standard')
    this.check_ruleset_table_rulename('Standard')

    cy.get('.left > ul:nth-child(2) > li > a').click()
    cy.location('href').should('contain', 'samples#Organism');
    this.check_ruleset_table_headers('Organism')
    this.check_ruleset_table_rulename('Organism')

    cy.get('.left > ul:nth-child(3) > li').click()
    cy.location('href').should('contain', 'samples#Organoid');

    cy.get('.left > ul:nth-child(4) > li > a').click()
    cy.location('href').should('contain', 'samples#Specimen%20standard%20rules');

    cy.get('.left > ul:nth-child(5) > li > a').click()
    cy.location('href').should('contain', '#Specimen%20Teleostei%20embryo');

    cy.get('.left > ul:nth-child(6) > li > a').click()
    cy.location('href').should('contain', '#Specimen%20Teleostei%20post-hatching');

    cy.get('.left > ul:nth-child(7) > li > a').click()
    cy.location('href').should('contain', '#Single%20cell%20specimen');

    cy.get('.left > ul:nth-child(8) > li > a').click()
    cy.location('href').should('contain', '#Pool%20of%20specimens');

    cy.get('.left > ul:nth-child(9) > li > a').click()
    cy.location('href').should('contain', '#Purified%20cells');

    cy.get('.left > ul:nth-child(10) > li > a').click()
    cy.location('href').should('contain', '#Cell%20culture');

    cy.get('.left > ul:nth-child(11) > li > a').click()
    cy.location('href').should('contain', '#Cell%20line');
  }

  check_ruleset_table_headers(rulegroup){
    switch(rulegroup) {
      case 'Standard':
        cy.get('.mat-table.cdk-table > thead > tr > th').each(()=> {
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
        break;
      case 'Organism':
        cy.get('.mat-table.cdk-table > thead > tr > th').each(()=> {
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
        break;
      default:
      // code block
    }
  }


  check_ruleset_table_rulename(rulegroup){
    switch(rulegroup) {
      case 'Standard':
        cy.get('.table-responsive.center').should('exist')
        cy.get('.mat-table.cdk-table > tbody > tr').its("length").should('be.gte', 6)

        cy.get('.mat-table.cdk-table > tbody > tr').each(()=> {
          cy.get('tr > td:nth-child(1)').should('contain', 'Sample Description')
          cy.get('tr > td:nth-child(1)').should('contain', 'Material')
          cy.get('tr > td:nth-child(1)').should('contain', 'Project')
          cy.get('tr > td:nth-child(1)').should('contain', 'Secondary project')
          cy.get('tr > td:nth-child(1)').should('contain', 'Availability')
          cy.get('tr > td:nth-child(1)').should('contain', 'Same as')
        })
        break;
      case 'Organism':
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'Organism')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'Organism')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'Sex')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'birth date')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'breed')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'health status')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'diet')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'birth location')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'birth location latitude')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'birth location longitude')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'birth weight')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'placental weight')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'pregnancy length')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'delivery timing')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'delivery ease')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'Pedigree')
        cy.get('.mat-table.cdk-table > tbody > tr').should('contain', 'Child of')

        break;
      default:
        cy.get('.mat-table.cdk-table > tbody > tr').its("length").should('be.gte', 2)
    }


  }


}
