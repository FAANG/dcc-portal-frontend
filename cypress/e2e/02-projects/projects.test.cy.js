import {ProjectsPage} from "./projects.cy"

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

  it('should verify AQUA-FAANG project', () => {
    projectsPage.check_aqua_faang_page()
  })

  it('should verify BovReg project', () => {
    projectsPage.check_bovreg_page()
  })

  it('should verify Gene-Switch project', () => {
    projectsPage.check_geneswitch_page()
  })

  it('should verify Geronimo project', () => {
    projectsPage.check_geronimo_page()
  })

  it('should verify Rumigen project', () => {
    projectsPage.check_rumigen_page()
  })

  it('should verify FAANG project', () => {
    projectsPage.check_faang_page()
  })

  it('should verify Bovine project', () => {
    projectsPage.check_bovine_page()
  })

  it('should verify Holoruminant project', () => {
    projectsPage.check_holoruminant_page()
  })

})
