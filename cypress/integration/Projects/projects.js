export class ProjectsPage{

  check_page_contents(){
    cy.get('app-root h1').should("contain", 'FAANG Projects');
  }

  check_toolbar_menu(){
    // cy.get('a.nav-link').should("have.length", 7);
    // cy.get('a.nav-link').then(link => {
    //   expect(link[0]).to.contain.text('Home')
    //   expect(link[1]).to.contain.text('Data')
    //   expect(link[2]).to.contain.text('Projects')
    //   expect(link[3]).to.contain.text('Summary')
    //   expect(link[4]).to.contain.text('Submit')
    //   expect(link[5]).to.contain.text('Ontology Improver')
    //   expect(link[6]).to.contain.text('Help')
    // })
  }

}
