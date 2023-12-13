import {ValidationPage} from "./validation.cy"

describe('Experiment Submission Page', () => {
  beforeEach(() => {
    cy.visit('/validation/experiments')
  })

  let validationPage = new ValidationPage()

  it('should display correct contents', () => {
    validationPage.check_page_contents()
  })

  it('should upload file', () => {
    validationPage.uploadFile('experiment')
  })



})
