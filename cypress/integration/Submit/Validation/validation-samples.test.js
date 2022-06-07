import {ValidationPage} from "./validation"

describe('Ruleset Samples Page', () => {
  beforeEach(() => {
    cy.visit('/validation/samples')
  })

  let validationPage = new ValidationPage()

  it('should display correct contents', () => {
    validationPage.check_page_contents()
  });

  it.only('should upload file', () => {
    validationPage.uploadFile('sample')
  });



})
