export class HomePage{

  check_page_contents(){
    cy.get('app-root h1').should("contain", 'Data Portal');
    cy.get('body').should("contain", "FAANG is the Functional Annotation of ANimal Genomes project. We are working to understand the genotype to phenotype link in domesticated animals.")
  }

  check_nonexistent_path(){
    cy.visit('/404');
    cy.get('.container-fluid > .text-center', {timeout: 10000}).should("contain", "Sorry, this page doesn't exist...")
  }

  check_toolbar_menu(){
    cy.get('a.nav-link').should("have.length", 8);
    cy.get('a.nav-link').then(link => {
      expect(link[0]).to.contain.text('Home')
      expect(link[1]).to.contain.text('Data')
      expect(link[2]).to.contain.text('Projects')
      expect(link[3]).to.contain.text('Genome Browser')
      expect(link[4]).to.contain.text('Submit')
      expect(link[5]).to.contain.text('Ontology Improver')
      expect(link[6]).to.contain.text('Help')
      expect(link[7]).to.contain.text('Search')
    })
  }

}
