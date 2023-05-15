import {AnalysisPage} from "./analysis"

describe('Ruleset Samples Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://raw.githubusercontent.com/FAANG/dcc-metadata/master/json_schema/type/analyses/faang_analyses_faang.metadata_rules.json',
      {fixture: 'submit/ruleset-analysis.json'})
      .as("rulesetAnalysisList")

    cy.visit('/ruleset/analyses')
  })

  let analysisPage = new AnalysisPage()

  it('should display correct contents', () => {
    analysisPage.check_page_contents()
  })

  it('should have at least 3 rulesets in left side menu', () => {
    analysisPage.check_ruleset_list()
  })

  it('should check ruleset table for Analysis', () => {
    analysisPage.check_ruleset_table()
  })

  it('should ruleset links', () => {
    analysisPage.check_ruleset_links()
  })


})
