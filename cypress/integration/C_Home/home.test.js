import {HomePage} from "./home"

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  let homePage = new HomePage()

  it('should display welcome message', () => {
    homePage.check_page_contents()
  });

  it('should redirect to 404 when navigate to non-existing path', () => {
    homePage.check_nonexistent_path()
  });


  it('should have 7 horizontal tabs', () => {
    homePage.check_toolbar_menu()
  });


})
