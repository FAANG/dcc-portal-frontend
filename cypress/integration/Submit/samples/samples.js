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

    cy.get('.mat-table.cdk-table > tbody > tr').each((tr)=> {
      cy.get('tr > td:nth-child(1)').should('contain', 'Sample Description')
      cy.get('tr > td:nth-child(1)').should('contain', 'Material')
      cy.get('tr > td:nth-child(1)').should('contain', 'Project')
      cy.get('tr > td:nth-child(1)').should('contain', 'Secondary project')
      cy.get('tr > td:nth-child(1)').should('contain', 'Availability')
      cy.get('tr > td:nth-child(1)').should('contain', 'Same as')
    })

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

  check_ruleset_links() {
    cy.get('.table-responsive.center').should('exist')

    cy.get('.left > ul:nth-child(1) > li').click()
    cy.location('href').should('contain', 'samples#Standard');

    cy.get('.left > ul:nth-child(2) > li').click()
    cy.location('href').should('contain', 'samples#Organism');

    cy.get('.left > ul:nth-child(3) > li').click()
    cy.location('href').should('contain', 'samples#Organoid');

    // cy.get('.left > ul:nth-child(4) > li').click()
    // cy.location('href').should('contain', 'samples#Specimen%20standard%20rules');

    // cy.get('.left > ul:nth-child(5) > li').click()
    // cy.location('href').should('contain', '#Specimen%20Teleostei%20embryo');
    //
    // cy.get('.left > ul:nth-child(6) > li').click()
    // cy.location('href').should('contain', '#Specimen%20Teleostei%20post-hatching');
    //
    // cy.get('.left > ul:nth-child(7) > li').click()
    // cy.location('href').should('contain', '#Single%20cell%20specimen');
    //
    // cy.get('.left > ul:nth-child(8) > li').click()
    // cy.location('href').should('contain', '#Pool%20of%20specimens');
    //
    // cy.get('.left > ul:nth-child(9)> li').click()
    // cy.location('href').should('contain', '#Purified%20cells');
    //
    // cy.get('.left > ul:nth-child(10) > li').click()
    // cy.location('href').should('contain', '#Cell%20culture');
    //
    // cy.get('.left > ul:nth-child(11) > li').click()
    // cy.location('href').should('contain', '#Cell%20line');
  }

  check_logo_src() {
    cy.get('img')
      .should('have.class', 'project-logo')
      .should('have.attr', 'src')
  }

  check_aqua_faang_page(){
    cy.intercept('GET', '/data/dataset/_search/*&filters=*secondaryProject*AQUA-FAANG*', {fixture: 'projects/aqua-faang/dataset.json'}).as("datasetList")
    cy.intercept('GET', '/data/file/_search/*&filters=*secondaryProject*AQUA-FAANG*', {fixture: 'projects/aqua-faang/file.json'}).as("fileList")
    cy.intercept('GET', '/data/organism/_search/*&filters=*secondaryProject*AQUA-FAANG*', {fixture: 'projects/aqua-faang/organism.json'}).as("organismList")
    cy.intercept('GET', '/data/specimen/_search/*&filters=*secondaryProject*AQUA-FAANG*', {fixture: 'projects/aqua-faang/specimen.json'}).as("specimenList")
    cy.intercept('GET', '/data/article/_search/*&filters=*secondaryProject*AQUA-FAANG*', {fixture: 'projects/aqua-faang/article.json'}).as("articleList")

    cy.contains("AQUA-FAANG aims to generate genome-wide functional annotation maps for the six commercially most important fish species within European aquaculture and exploit their contribution to variation in traits of commercial relevance, focusing on improved resistance to disease.");
    cy.get('#twitter-widget-0').should('be.visible')

    cy.get('[target_type="dataset"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="dataset"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 4)
    cy.get('tbody > :nth-child(1) > .cdk-column-Study-name').should('contain', 'PRJEB47408')

    cy.get('[target_type="file"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="file"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get(':nth-child(1) > .cdk-column-File-name > app-robust-link.ng-star-inserted > .ng-star-inserted').should('contain', 'ERR6663862_1.fastq.gz')

    cy.get('[target_type="organism"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="organism"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[target_type="organism"] > :nth-child(1) > .table-responsive > .mat-table > tbody > :nth-child(1) > .cdk-column-BioSamples-ID').should('contain', 'SAMEA10289531')

    cy.get('[target_type="specimen"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="specimen"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[target_type="specimen"] > :nth-child(1) > .table-responsive > .mat-table > tbody > :nth-child(1) > .cdk-column-BioSamples-ID').should('contain', 'SAMEA10289532')

    cy.get('Related Publications').should('not.exist')
  }


  check_bovreg_page(){
    cy.intercept('GET', '/data/dataset/_search/*&filters=*secondaryProject*BovReg*', {fixture: 'projects/bovreg/dataset.json'}).as("datasetList")
    cy.intercept('GET', '/data/file/_search/*&filters=*secondaryProject*BovReg*', {fixture: 'projects/bovreg/file.json'}).as("fileList")
    cy.intercept('GET', '/data/organism/_search/*&filters=*secondaryProject*BovReg*', {fixture: 'projects/bovreg/organism.json'}).as("organismList")
    cy.intercept('GET', '/data/specimen/_search/*&filters=*secondaryProject*BovReg*', {fixture: 'projects/bovreg/specimen.json'}).as("specimenList")
    cy.intercept('GET', '/data/article/_search/*&filters=*secondaryProject*BovReg*', {fixture: 'projects/bovreg/article.json'}).as("articleList")

    cy.wait(8000)
    cy.contains("The BovReg consortium will provide a comprehensive map of functionally active genomic features in cattle and how their (epi)genetic variation in beef and dairy breeds translates into phenotypes.");
    cy.get('#twitter-widget-0').should('be.visible')

    cy.get('[target_type="publication"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="publication"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 4)
    cy.get('tbody > :nth-child(1) > .cdk-column-Title').should('contain', 'Biological Network Approach for the Identification of Regulatory Long Non-Coding RNAs Associated With Metabolic Efficiency in Cattle.')

    cy.get('[target_type="pipeline"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="pipeline"] > :nth-child(1)').find('tbody').find('tr').should("have.length.at.least", 1)
    // cy.get('.mat-row > .cdk-column-Pipeline-name').should('contain', 'BovReg/nf-core-rnaseq')

    cy.get('[target_type="dataset"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="dataset"] > :nth-child(1)').find('tbody').find('tr').should("have.length.at.least", 2)
    cy.get('tbody > :nth-child(1) > .cdk-column-Study-name').should('contain', 'PRJEB34570')

    cy.get('[target_type="file"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="file"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('tbody > :nth-child(1) > .cdk-column-File-name').should('contain', 'ERR3555852.fastq.gz')

    cy.get('[target_type="organism"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="organism"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[target_type="organism"] > :nth-child(1) > .table-responsive > .mat-table > tbody > :nth-child(1) > .cdk-column-BioSamples-ID').should('contain', 'SAMEA6031867')

    cy.get('[target_type="specimen"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="specimen"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[target_type="specimen"] > :nth-child(1) > .table-responsive > .mat-table > tbody > :nth-child(1) > .cdk-column-BioSamples-ID').should('contain', 'SAMEA6031866')

  }


  check_geneswitch_page(){
    cy.intercept('GET', '/data/dataset/_search/*&filters=*secondaryProject*GENE-SWitCH*', {fixture: 'projects/gene-switch/dataset.json'}).as("datasetList")
    cy.intercept('GET', '/data/file/_search/*&filters=*secondaryProject*GENE-SWitCH*', {fixture: 'projects/gene-switch/file.json'}).as("fileList")
    cy.intercept('GET', '/data/organism/_search/*&filters=*secondaryProject*GENE-SWitCH*', {fixture: 'projects/gene-switch/organism.json'}).as("organismList")
    cy.intercept('GET', '/data/specimen/_search/*&filters=*secondaryProject*GENE-SWitCH*', {fixture: 'projects/gene-switch/specimen.json'}).as("specimenList")
    cy.intercept('GET', '/data/article/_search/*&filters=*secondaryProject*GENE-SWitCH*', {fixture: 'projects/gene-switch/article.json'}).as("articleList")

    cy.wait(8000)

    cy.contains("GENE-SWitCH aims to deliver new underpinning knowledge on the functional genomes of two main monogastric farm species (pig and chicken) and to enable immediate translation to the pig and poultry sectors.");
    cy.get('#twitter-widget-0').should('be.visible')

    cy.get('Related Publications').should('not.exist')


    cy.get('[target_type="dataset"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="dataset"] > :nth-child(1)').find('tbody').find('tr').should("have.length.at.least", 10)
    cy.get('tbody > :nth-child(1) > .cdk-column-Study-name').should('contain', 'PRJEB41822')

    cy.get('[target_type="file"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="file"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('tbody > :nth-child(1) > .cdk-column-File-name').should('contain', 'ERR4970637.fastq.gz')

    cy.get('[target_type="organism"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="organism"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[target_type="organism"] > :nth-child(1) > .table-responsive > .mat-table > tbody > :nth-child(1) > .cdk-column-BioSamples-ID').should('contain', 'SAMEA10256251')

    cy.get('[target_type="specimen"] > :nth-child(1)').should('be.visible')
    cy.get('[target_type="specimen"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[target_type="specimen"] > :nth-child(1) > .table-responsive > .mat-table > tbody > :nth-child(1) > .cdk-column-BioSamples-ID').should('contain', 'SAMEA10256411')

    cy.contains("Custom Queries")
    cy.contains('Ensembl Rapid Release')

  }

  check_geronimo_page(){
    cy.contains("GEroNIMO will work on chicken and pig, the most used sources of animal protein worldwide, to provide breeders with new knowledge and tools to promote innovative genome and epigenome enabled selection methods for traits related to production (quantity and quality), efficiency, productive longevity, fertility, resilience and welfare.");
    cy.get('#twitter-widget-0').should('be.visible')
  }

  check_rumigen_page(){
    cy.contains("RUMIGEN is a multi-actor project aiming to improve genetic tools in bovine breeds through the addition of new traits such as heat tolerance, and epigenetic information.");
    cy.get('#twitter-widget-0').should('be.visible')
  }

  check_faang_page(){
    cy.contains("FAANG is the Functional Annotation of ANimal Genomes project. We are working to understand the genotype to phenotype link in domesticated animals.");
    cy.get('#twitter-widget-0').should('be.visible')
  }

  check_bovine_page(){
    cy.contains("The cattle industry is the largest of the agricultural commodities in the United. Although the sequence of the bovine reference genome has been publicly available since 2009");
  }


}
