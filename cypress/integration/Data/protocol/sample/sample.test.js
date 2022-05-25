describe('Organism Page', () => {
  beforeEach(() => {
    cy.visit('/protocol/samples');
  })

  it('should display "FAANG Protocols"', () => {
    cy.get('h2').should("contain", 'FAANG Protocols');
  });

  it('should sort table"', () => {
    cy.get('tbody > :nth-child(1) > .cdk-column-university_name', { timeout: 60000 }).should("contain", 'University of California, Davis (USA)')

    cy.get('.mat-header-row > .cdk-column-university_name').click()
    cy.get('tbody > :nth-child(1) > .cdk-column-university_name', { timeout: 60000 }).should("contain", 'AgResearch (New Zealand)')

    cy.get('.mat-header-row > .cdk-column-university_name').click()
    cy.get('tbody > :nth-child(1) > .cdk-column-university_name', { timeout: 60000 }).should("contain", 'Washington State University(USA)')
  });


  it.only('should filter table"', () => {
    cy.get('[title="Organisation"] > .mat-card > :nth-child(2) > :nth-child(1) > .badge', { timeout: 60000 })
      .invoke('text')
      .then((orgCount) => {

        // click on Protocol Year filter
        cy.get('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(2)').click({force: true})
        cy.url().should('include', '?protocol_date=2020')
        cy.wait(60000);

        // grab the div again and compare its previous text to the current text
        cy.get('[title="Organisation"] > .mat-card > :nth-child(2) > :nth-child(1) > .badge', { timeout: 6000 })
          .invoke('text')
          .should((updatedOrgCount) => {
            expect(orgCount).not.to.eq(updatedOrgCount)
          })
      })
  });

})









import {SamplePage} from "./sample"

describe('Protocol Sample Page', () => {
  beforeEach(() => {
    cy.visit('/protocol/samples');
  })

  let samplePage = new SamplePage()

  it.only('should display "FAANG Protocols"', () => {
    samplePage.check_title()
  });

  it('should sort table on column Protocol name', () => {
    samplePage.compare_value('.cdk-column-protocol_name')
  });

  /* sort table */

  it('should sort table on column Protocol name', () => {
    samplePage.compare_value('.cdk-column-protocol_name', 'xxx', 'xxx')
  });

  it('should sort table on column Organisation', () => {
    samplePage.sort_column('.cdk-column-university_name', 'xxx', 'xxx')
  });

  it('should sort table on column Year of Protocol', () => {
    samplePage.sort_column('.cdk-protocol_date', 'xxx', 'xxx')
  });


  /* filter table */
  it('should filter table by Protocol Year - 2016', () => {
    samplePage.compare_filter_value('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)', 'path', '?protocol_date=2016')
  });


  it('should allow multiple filters', () => {
    samplePage.allow_multiple_filters('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Organisation"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '?university_name=French%20National%20Institute%20for%20Agricultural%20Research%20(France)&protocol_date=2016',
      ['French National Institute for Agricultural Research (France)', '2016'])
  });

  it('should remove filters', () => {
    samplePage.removeFilters('[title="Protocol Year"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '[title="Organisation"] > .mat-card > :nth-child(2) > :nth-child(1)',
      '/protocol/samples')
  });

  /* pagination & file download */
  it('should verify pagination', () => {
    samplePage.verify_pagination()
  });

  it('should export data as CSV', () => {
    samplePage.downloadData(2, 'Export as CSV file', 'faang_data.csv')
  });

  it('should export data as txt', () => {
    samplePage.downloadData(3, 'Export as Tabular file', 'faang_data.txt')
  });
})








