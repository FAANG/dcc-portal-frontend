import {SamplesPage} from "./samples"

describe('Ruleset Samples Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://raw.githubusercontent.com/FAANG/dcc-metadata/master/json_schema/core/samples/faang_samples_core.metadata_rules.json',
      {fixture: 'submit/ruleset-samples.json'})
      .as("rulesetSamplesList")

    cy.visit('/ruleset/samples')
  })

  let samplesPage = new SamplesPage()

  it('should display correct contents', () => {
    samplesPage.check_page_contents()
  })

  it('should have at least 11 rulesets in left side menu', () => {
    samplesPage.check_ruleset_list()
  })

  it('should check ruleset table for Samples - Standard', () => {
    samplesPage.check_ruleset_table()
  })

  it('should ruleset links', () => {
    samplesPage.check_ruleset_links()
  })


})
