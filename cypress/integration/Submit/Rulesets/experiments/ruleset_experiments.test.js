import {ExperimentsPage} from "./experiments"

describe('Ruleset Samples Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://raw.githubusercontent.com/FAANG/dcc-metadata/master/json_schema/core/experiments/faang_experiments_core.metadata_rules.json',
      {fixture: 'submit/ruleset-experiments.json'})
      .as("rulesetExperimentsList")

    cy.visit('/ruleset/experiments')
  })

  let experimentsPage = new ExperimentsPage()

  it('should display correct contents', () => {
    experimentsPage.check_page_contents()
  })

  it('should have at least 11 rulesets in left side menu', () => {
    experimentsPage.check_ruleset_list()
  })

  it('should check ruleset table for Experiments', () => {
    experimentsPage.check_ruleset_table()
  })

  it('should ruleset links', () => {
    experimentsPage.check_ruleset_links()
  })


})
