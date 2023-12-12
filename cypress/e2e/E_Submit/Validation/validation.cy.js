export class ValidationPage{

  check_page_contents(){
    cy.get('.ngx-spinner-overlay').should('not.exist')
    cy.get('h3').should("contain", 'Upload template')
  }

  uploadFile(uploadType){
    let filepath
    if (uploadType === 'sample'){
      filepath = 'cypress/fixtures/submit/validation/sample.xlsx'
    } else if (uploadType === 'experiment'){
      filepath = 'cypress/fixtures/submit/validation/experiment.xlsx'
    } else if (uploadType === 'analysis'){
      filepath = 'cypress/fixtures/submit/validation/analysis.xlsx'
    }
    cy.get('input[type=file]').selectFile(filepath)
    cy.get('button:contains("Upload")').should('not.be.disabled')
    cy.get('button:contains("Upload")').click()
    cy.get('h3').eq(1).should("contain", 'Conversion and Validation results')
    cy.get('h6:contains("Conversion Status")')
      .should('exist')
      .next()
      .should('contain', 'Waiting')

    cy.get('h6:contains("Conversion Status")')
      .should('exist')
      .next()
      // .each(x => {
      //   expect(x).to.be.oneOf([
      //     "Success",
      //     "Error",
      //     "Waiting"
      //   ]);
      // });
      .should('contain', 'Success')
      // .should('contain', /Success|Error/g)


    cy.get('h6:contains("Validation Status")')
      .should('exist')

    cy.wait(10000)
    cy.get('h6:contains("Validation Status")').next()

    cy.get('h6:contains("Validation Status")').next()
      .should('be.visible')
      .should('contain', 'Finished')

    cy.get('h3').eq(2).should("contain", 'Prepare data for submission')
  }

}
