import { SearchPage } from "./search.cy";

describe('Search Page', () => {
  let searchPage;

  beforeEach(() => {
    cy.intercept(
      'GET',
      '/data/_gsearch/*',
      { fixture: 'globalsearch/globalsearch.json' }
    ).as('getGlobalsearchData');

    cy.visit('/globalsearch?searchText=SAMEA114307439');

    searchPage = new SearchPage();
  });

  it('getting global search data', () => {
    cy.wait('@getGlobalsearchData', {timeout: 10000 }).then(({response}) => {
      expect(response.statusCode).to.eq(200)
      cy.contains('.row-container', '1 dataset').should('exist');
      cy.contains('.link-style', 'PRJEB65932').should('exist');
      cy.get('p.ng-star-inserted').contains('2 files').should('exist');
      cy.get('p.ng-star-inserted').contains('1 sample protocol').should('exist');
    })
  })

  it('checking if the concrete dataset link is working', () => {
    cy.wait('@getGlobalsearchData', {timeout: 10000 }).then(({response}) => {
      expect(response.statusCode).to.eq(200);
      cy.contains('.link-style', 'PRJEB65932').scrollIntoView().should('be.visible').click();
      cy.url().should('include', 'dataset?searchTerm=PRJEB65932&sortTerm=accession&sortDirection=desc');
    });
  });

  it('checking if the files link is working', () => {
    cy.wait('@getGlobalsearchData', {timeout: 10000 }).then(({response}) => {
      expect(response.statusCode).to.eq(200);
      cy.get('p.ng-star-inserted').contains('2 files').should('exist').click();
      cy.url().should('include', 'file?searchTerm=SAMEA114307439&sortTerm=fileName&sortDirection=desc');
    });
  });

})
