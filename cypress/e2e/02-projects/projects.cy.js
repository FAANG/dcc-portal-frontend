export class ProjectsPage{

  check_page_contents(){
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h2').should("contain", 'FAANG Projects');
  }

  check_eurofaang_projects(){
    cy.get('app-subprojects.ng-star-inserted > .container-fluid > .ng-star-inserted').find('div > a').should('have.length.at.least', 5)
  }

  check_faang_project(){
    cy.get('.faang-parent-project-logo').should('exist')
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

    cy.visit('/projects/AQUA-FAANG')

    cy.contains("AQUA-FAANG aims to generate genome-wide functional annotation maps for the six commercially most important fish species within European aquaculture and exploit their contribution to variation in traits of commercial relevance, focusing on improved resistance to disease.");
    cy.scrollTo('bottom')

    cy.get('[ng-reflect-target_type="dataset"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="dataset"] > :nth-child(1)').find('tbody').find('tr').should("have.length.least", 4)
    cy.get('tbody > :nth-child(1) > .cdk-column-Study-name').should('contain', 'PRJEB47408')

    cy.get('[ng-reflect-target_type="file"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="file"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get(':nth-child(1) > .cdk-column-File-name > app-robust-link.ng-star-inserted > .ng-star-inserted').should('contain', 'ERR6663862_1.fastq.gz')

    cy.get('[ng-reflect-target_type="organism"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="organism"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[ng-reflect-target_type="organism"] > :nth-child(1) > .table-responsive')
      .get('.mat-mdc-table > .mdc-data-table__content > :nth-child(1) > .cdk-column-BioSamples-ID')
      .should('contain', 'SAMEA')


    cy.get('[ng-reflect-target_type="specimen"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="specimen"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[ng-reflect-target_type="specimen"] > :nth-child(1) > .table-responsive')
      .get('.mat-mdc-table > .mdc-data-table__content > :nth-child(1) > .cdk-column-BioSamples-ID')
      .should('contain', 'SAMEA')
  }


  check_bovreg_page(){
    cy.intercept('GET', '/data/dataset/_search/*&filters=*secondaryProject*BovReg*', {fixture: 'projects/bovreg/dataset.json'}).as("datasetList")
    cy.intercept('GET', '/data/file/_search/*&filters=*secondaryProject*BovReg*', {fixture: 'projects/bovreg/file.json'}).as("fileList")
    cy.intercept('GET', '/data/organism/_search/*&filters=*secondaryProject*BovReg*', {fixture: 'projects/bovreg/organism.json'}).as("organismList")
    cy.intercept('GET', '/data/specimen/_search/*&filters=*secondaryProject*BovReg*', {fixture: 'projects/bovreg/specimen.json'}).as("specimenList")
    cy.intercept('GET', '/data/article/_search/*&filters=*secondaryProject*BovReg*', {fixture: 'projects/bovreg/article.json'}).as("articleList")
    cy.visit('/projects/BovReg')

    cy.contains("The BovReg consortium will provide a comprehensive map of functionally active genomic features in cattle and how their (epi)genetic variation in beef and dairy breeds translates into phenotypes.");
    cy.scrollTo('bottom')

    cy.get('[ng-reflect-target_type="publication"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="publication"] > :nth-child(1)').find('tbody').find('tr').should("have.length.least", 4)

    cy.get('[ng-reflect-target_type="pipeline"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="pipeline"] > :nth-child(1)').find('tbody').find('tr').should("have.length.at.least", 1)

    cy.get('[ng-reflect-target_type="dataset"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="dataset"] > :nth-child(1)').find('tbody').find('tr').should("have.length.at.least", 2)
    cy.get('tbody > :nth-child(1) > .cdk-column-Study-name').should('contain', 'PRJEB34570')

    cy.get('[ng-reflect-target_type="file"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="file"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('tbody > :nth-child(1) > .cdk-column-File-name').should('contain', 'ERR3555852.fastq.gz')

    cy.get('[ng-reflect-target_type="organism"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="organism"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[ng-reflect-target_type="organism"] > :nth-child(1) > .table-responsive')
      .get('.mat-mdc-table > .mdc-data-table__content > :nth-child(1) > .cdk-column-BioSamples-ID')
      .should('contain', 'SAMEA')

    cy.get('[ng-reflect-target_type="specimen"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="specimen"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[ng-reflect-target_type="specimen"] > :nth-child(1) > .table-responsive')
      .get('.mat-mdc-table > .mdc-data-table__content > :nth-child(1) > .cdk-column-BioSamples-ID')
      .should('contain', 'SAMEA')
  }


  check_geneswitch_page(){
    cy.intercept('GET', '/data/dataset/_search/*&filters=*secondaryProject*GENE-SWitCH*', {fixture: 'projects/gene-switch/dataset.json'}).as("datasetList")
    cy.intercept('GET', '/data/file/_search/*&filters=*secondaryProject*GENE-SWitCH*', {fixture: 'projects/gene-switch/file.json'}).as("fileList")
    cy.intercept('GET', '/data/organism/_search/*&filters=*secondaryProject*GENE-SWitCH*', {fixture: 'projects/gene-switch/organism.json'}).as("organismList")
    cy.intercept('GET', '/data/specimen/_search/*&filters=*secondaryProject*GENE-SWitCH*', {fixture: 'projects/gene-switch/specimen.json'}).as("specimenList")
    cy.intercept('GET', '/data/article/_search/*&filters=*secondaryProject*GENE-SWitCH*', {fixture: 'projects/gene-switch/article.json'}).as("articleList")
    cy.intercept('GET', '/join_search?index1=file&index2=specimen*', {fixture: 'projects/gene-switch/file-specimen.json'}).as("fileSpecimenList")
    cy.visit('/projects/GENE-SWitCH')

    cy.contains("GENE-SWitCH aims to deliver new underpinning knowledge on the functional genomes of two main monogastric farm species (pig and chicken) and to enable immediate translation to the pig and poultry sectors.");
    cy.scrollTo('bottom')

    cy.get('Related Publications').should('not.exist')


    cy.get('[ng-reflect-target_type="dataset"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="dataset"] > :nth-child(1)').find('tbody').find('tr').should("have.length.at.least", 10)
    cy.get('tbody > :nth-child(1) > .cdk-column-Study-name').should('contain', 'PRJEB41822')

    cy.get('[ng-reflect-target_type="file"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="file"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('tbody > :nth-child(1) > .cdk-column-File-name').should('contain', 'ERR4970637.fastq.gz')

    cy.get('[ng-reflect-target_type="organism"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="organism"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[ng-reflect-target_type="organism"] > :nth-child(1) > .table-responsive')
      .get('.mat-mdc-table > .mdc-data-table__content > :nth-child(1) > .cdk-column-BioSamples-ID')
      .should('contain', 'SAMEA')

    cy.get('[ng-reflect-target_type="specimen"] > :nth-child(1)').should('be.visible')
    cy.get('[ng-reflect-target_type="specimen"] > :nth-child(1)').find('tbody').find('tr').should("have.length", 10)
    cy.get('[ng-reflect-target_type="specimen"] > :nth-child(1) > .table-responsive')
      .get('.mat-mdc-table > .mdc-data-table__content > :nth-child(1) > .cdk-column-BioSamples-ID')
      .should('contain', 'SAMEA')

    cy.contains('Ensembl Rapid Release')

  }

  check_geronimo_page(){
    cy.visit('/projects/GEroNIMO')
    cy.contains("GEroNIMO will work on chicken and pig, the most used sources of animal protein worldwide, to provide breeders with new knowledge and tools to promote innovative genome and epigenome enabled selection methods for traits related to production (quantity and quality), efficiency, productive longevity, fertility, resilience and welfare.");
  }

  check_rumigen_page(){
    cy.visit('/projects/RUMIGEN')
    cy.contains("RUMIGEN is a multi-actor project aiming to improve genetic tools in bovine breeds through the addition of new traits such as heat tolerance, and epigenetic information.");
  }

  check_faang_page(){
    cy.visit('/projects/FAANG')
    cy.contains("FAANG is the Functional Annotation of ANimal Genomes project. We are working to understand the genotype to phenotype link in domesticated animals.");
  }

  check_bovine_page(){
    cy.visit('/projects/Bovine')
    cy.contains("The cattle industry is the largest of the agricultural commodities in the United. Although the sequence of the bovine reference genome has been publicly available since 2009");
  }

  check_holoruminant_page() {
    cy.visit('/projects/Holoruminant')
    cy.contains("Holoruminant is a multi-actor project aiming to elucidate the role of ruminant-associated microbiomes and their interplay with the host animal in early life and throughout fundamental life events (e.g. weaning, feed transitions and lactation) that are known to affect health, welfare and environmental efficiency in ruminant production systems.");
  }

}
