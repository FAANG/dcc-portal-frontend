import {SamplesPage} from "./samples"

describe('Ruleset Samples Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://raw.githubusercontent.com/FAANG/dcc-metadata/master/json_schema/core/samples/faang_samples_core.metadata_rules.json',
      {fixture: 'submit/ruleset-samples.json'})
      .as("rulesetSamplesList")

    cy.visit('/ruleset/samples')
  })

  let samplesPage = new SamplesPage()

  it('should display correct contents', () => {
    samplesPage.check_page_contents()
  });

  it('should have at least 11 rulesets in left side menu', () => {
    samplesPage.check_ruleset_list()
  });

  it('should check ruleset table for Samples', () => {
    samplesPage.check_ruleset_table()
  });

  it.only('should ruleset links', () => {
    samplesPage.check_ruleset_links()
  });


  it('should verify contents of EuroFAANG page', () => {
    cy.get('app-subprojects.ng-star-inserted > .container-fluid').find('.ng-star-inserted').first().click()
    cy.contains("By establishing EuroFAANG, the H2020 projects AQUA-FAANG, BovReg and GENE-SWitCH have formed a closer relationship to coordinate their objectives within Europe in association with the international FAANG initiative. ");
    cy.get('.second-section').find('img').should('be.visible');
  });

  it('should verify AQUA-FAANG project', () => {
    cy.get('.aquaa-project-logo').click()
    samplesPage.check_aqua_faang_page()
  });

  it('should verify BovReg project', () => {
    cy.visit('/projects/BovReg')
    samplesPage.check_bovreg_page()
  });

  it('should verify Gene-Switch project', () => {
    cy.visit('/projects/GENE-SWitCH')
    samplesPage.check_geneswitch_page()
  });

  it('should verify Geronimo project', () => {
    cy.visit('/projects/GEroNIMO')
    samplesPage.check_geronimo_page()
  });

  it('should verify Rumigen project', () => {
    cy.visit('/projects/RUMIGEN')
    samplesPage.check_rumigen_page()
  });

  it('should verify FAANG project', () => {
    cy.visit('/projects/FAANG')
    samplesPage.check_faang_page()
  });

  it('should verify Bovine project', () => {
    cy.visit('/projects/Bovine')
    samplesPage.check_bovine_page()
  });

})
