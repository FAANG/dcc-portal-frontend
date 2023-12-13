import {ValidationPage} from "./validation.cy"

describe('Ruleset Samples Page', () => {
  beforeEach(() => {
    cy.visit('/validation/samples')
  })

  let validationPage = new ValidationPage()

  it('should display correct contents', () => {
    validationPage.check_page_contents()
  })

  it('should upload file', () => {
    validationPage.uploadFile('sample')
  })



})
