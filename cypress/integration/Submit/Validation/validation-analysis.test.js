import {ValidationPage} from "./validation"

describe('Analysis Submission Page', () => {
  beforeEach(() => {
    cy.visit('/validation/analyses')
  })

  let validationPage = new ValidationPage()

  it('should display correct contents', () => {
    validationPage.check_page_contents()
  })

  it('should upload file', () => {
    validationPage.uploadFile('analysis')
  })



})
