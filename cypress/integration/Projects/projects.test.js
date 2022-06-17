import {ProjectsPage} from "./projects"

describe('Projects Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/query/columns', {fixture: 'projects/gene-switch/columns.json'}).as("columnList")
    cy.visit('/projects')
  })

  let projectsPage = new ProjectsPage()

  it('should display welcome message', () => {
    projectsPage.check_page_contents()
  })

  it('should have at least 5 EuroFAANG projects', () => {
    projectsPage.check_eurofaang_projects()
  })

  it('should check FAANG project', () => {
    projectsPage.check_faang_project()
  })

  it('should check logo src existence', () => {
    projectsPage.check_logo_src()
  })


  it('should verify contents of EuroFAANG page', () => {
    cy.get('app-subprojects.ng-star-inserted > .container-fluid').find('.ng-star-inserted').first().click()
    cy.contains("By establishing EuroFAANG, the H2020 projects AQUA-FAANG, BovReg and GENE-SWitCH have formed a closer relationship to coordinate their objectives within Europe in association with the international FAANG initiative. ");
    cy.get('.second-section').find('img').should('be.visible');
  })

  it('should verify AQUA-FAANG project', () => {
    cy.get('.aquaa-project-logo').click()
    projectsPage.check_aqua_faang_page()
  })

  it('should verify BovReg project', () => {
    cy.visit('/projects/BovReg')
    projectsPage.check_bovreg_page()
  })

  it('should verify Gene-Switch project', () => {
    cy.visit('/projects/GENE-SWitCH')
    projectsPage.check_geneswitch_page()
  })

  it('should verify Geronimo project', () => {
    cy.visit('/projects/GEroNIMO')
    projectsPage.check_geronimo_page()
  })

  it('should verify Rumigen project', () => {
    cy.visit('/projects/RUMIGEN')
    projectsPage.check_rumigen_page()
  })

  it('should verify FAANG project', () => {
    cy.visit('/projects/FAANG')
    projectsPage.check_faang_page()
  })

  it('should verify Bovine project', () => {
    cy.visit('/projects/Bovine')
    projectsPage.check_bovine_page()
  })

})
