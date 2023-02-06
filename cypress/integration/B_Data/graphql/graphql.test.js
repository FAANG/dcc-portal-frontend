import {GraphqlPage} from "./graphql"

describe('GraphQl Page', () => {
  beforeEach(() => {
    cy.visit('/graphql');
  })

  let graphqlPage = new GraphqlPage()

  it('should display "GraphQl Page first header"', () => {
    graphqlPage.check_title()
  })

  it('should display "Filters Section"', () => {
    graphqlPage.check_tables_selection()
  })

  // --------------------
  it('should filter data - analysis-article"', () => {
    graphqlPage.check_filters('analysis', 'article', 'allAnalysisAsTask', 'allAnalysisTaskResult',
      'accession', 'ERZ1370212, ERZ1370206', 'project', 'alias', 'analysis-task.json', 'analysis-article-result.json')
  })

  it('should filter data - analysis-dataset"', () => {
    graphqlPage.check_filters('analysis', 'dataset', 'allAnalysisAsTask', 'allAnalysisTaskResult',
      'accession', 'ERZ1370212, ERZ1370206', 'project', 'alias', 'analysis-task.json', 'analysis-dataset-result.json')
  })

  it('should filter data - analysis-experiment"', () => {
    graphqlPage.check_filters('analysis', 'experiment', 'allAnalysisAsTask', 'allAnalysisTaskResult',
      'accession', 'ERZ1370212, ERZ1370206','project', 'alias', 'analysis-task.json', 'analysis-experiment-result.json')
  })

  it('should filter data - analysis-specimen"', () => {
    graphqlPage.check_filters('analysis', 'specimen', 'allAnalysisAsTask', 'allAnalysisTaskResult',
      'accession', 'ERZ1370212, ERZ1370206','project', 'alias', 'analysis-task.json', 'analysis-specimen-result.json')
  })

  // --------------------
  it('should filter data - article-file"', () => {
    graphqlPage.check_filters('article', 'file', 'allArticlesAsTask', 'allArticlesTaskResult',
      'pmcId', 'PMC7140900','doi', 'authorString', 'article-task.json', 'article-file-result.json')
  })

  it('should filter data - article-specimen"', () => {
    graphqlPage.check_filters('article', 'specimen', 'allArticlesAsTask', 'allArticlesTaskResult',
      'pmcId', 'PMC7140900','doi', 'authorString', 'article-task.json', 'article-specimen-result.json')
  })

  // --------------------
  it('should filter data - dataset-experiment"', () => {
    graphqlPage.check_filters('dataset', 'experiment', 'allDatasetsAsTask', 'allDatasetsTaskResult',
      'accession', 'PRJEB35307','secondaryProject', 'alias', 'dataset-task.json', 'dataset-experiment-result.json')
  })

  it('should filter data - dataset-file"', () => {
    graphqlPage.check_filters('dataset', 'file', 'allDatasetsAsTask', 'allDatasetsTaskResult',
      'accession', 'PRJEB35307','secondaryProject', 'alias', 'dataset-task.json', 'dataset-file-result.json')
  })

  // --------------------
  it('should filter data - experiment-analysis"', () => {
    graphqlPage.check_filters('experiment', 'analysis', 'allExperimentsAsTask', 'allExperimentsTaskResult',
      'accession', 'ERX9379020','secondaryProject', 'project', 'experiment-task.json', 'experiment-analysis-result.json')
  })

  it('should filter data - experiment-file"', () => {
    graphqlPage.check_filters('experiment', 'file', 'allExperimentsAsTask', 'allExperimentsTaskResult',
      'accession', 'ERX9379020','secondaryProject', 'project', 'experiment-task.json', 'experiment-file-result.json')
  })

  // --------------------
  it('should filter data - file-article"', () => {
    graphqlPage.check_filters('file', 'article', 'allFilesAsTask', 'allFilesTaskResult',
      'name', 'SRR2016629_2.fastq.gz','organism', 'url', 'file-task.json', 'file-article-result.json')
  })

  it('should filter data - file-protocolFiles"', () => {
    graphqlPage.check_filters('file', 'protocolFiles', 'allFilesAsTask', 'allFilesTaskResult',
      'name', 'SRR2016629_2.fastq.gz','organism', 'url', 'file-task.json', 'file-protocolFiles-result.json')
  })

  // --------------------
  it('should filter data - organism-file"', () => {
    graphqlPage.check_filters('organism', 'file', 'allOrganismsAsTask', 'allOrganismsTaskResult',
      'biosampleId', 'SAMEA4675147','idNumber', 'name', 'organism-task.json', 'organism-file-result.json')
  })

  it('should filter data - organism-protocolSamples"', () => {
    graphqlPage.check_filters('organism', 'protocolSamples', 'allOrganismsAsTask', 'allOrganismsTaskResult',
      'biosampleId', 'SAMEA4675147','idNumber', 'name', 'organism-task.json', 'organism-protocolSamples-result.json')
  })

  // --------------------
  it('should filter data - specimen-dataset"', () => {
    graphqlPage.check_filters('specimen', 'dataset', 'allSpecimensAsTask', 'allSpecimensTaskResult',
      'biosampleId', 'SAMEA4675147','idNumber', 'name', 'specimen-task.json', 'specimen-dataset-result.json')
  })

  it('should filter data - specimen-organism"', () => {
    graphqlPage.check_filters('specimen', 'organism', 'allSpecimensAsTask', 'allSpecimensTaskResult',
      'biosampleId', 'SAMEA4675147','idNumber', 'name', 'specimen-task.json', 'specimen-organism-result.json')
  })

  // --------------------
  it('should filter data - protocolAnalysis-analysis"', () => {
    graphqlPage.check_filters('protocolAnalysis', 'analysis', 'allProtocolAnalysisAsTask', 'allProtocolAnalysisTaskResult',
      'key', 'UCD_SOP_processing_and_analyzing_equine_ChIP_data_20191030.pdf','url', 'analyses accession', 'protocolAnalysis-task.json', 'protocolAnalysis-analysis-result.json')
  })

  it('should filter data - protocolFiles-file"', () => {
    graphqlPage.check_filters('protocolFiles', 'file', 'allProtocolFilesAsTask', 'allProtocolFilesTaskResult',
      'key', 'rnaPreparation3AdapterLigationProtocol-microRNAprofilingbyhighthroughputsequencing-CHEBI_33697','key', 'url', 'protocolFiles-task.json', 'protocolFiles-file-result.json')
  })

  it('should filter data - protocolSamples-organism"', () => {
    graphqlPage.check_filters('protocolSamples', 'organism', 'protocolAnalysis-task.json', 'allProtocolSamplesTaskResult',
      'key', 'DEDJTR_SOP_CryofreezingTissue_20160317.pdf','specimens id', 'url', 'protocolSamples-task.json', 'protocolSamples-organism-result.json')
  })

  // --------------------
  it('should sort table analysis-article on column accession asc', () => {
    graphqlPage.check_filters('analysis', 'article', 'allAnalysisAsTask', 'allAnalysisTaskResult',
      'accession', 'ERZ1370212, ERZ1370206', 'project', 'alias', 'analysis-task.json', 'analysis-article-result.json')
    graphqlPage.check_header_sort_asc('.cdk-column-analysis-accession', 'accession')

  })

  it('should sort table analysis-article on column accession desc', () => {
    graphqlPage.check_filters('analysis', 'article', 'allAnalysisAsTask', 'allAnalysisTaskResult',
      'accession', 'ERZ1370212, ERZ1370206', 'project', 'alias', 'analysis-task.json', 'analysis-article-result.json')
    graphqlPage.check_header_sort_desc('.cdk-column-analysis-accession', 'accession')
  })

  // --------------------
  it.only('should verify pagination', () => {
    graphqlPage.check_filters('protocolFiles', 'file', 'allProtocolFilesAsTask', 'allProtocolFilesTaskResult',
      'key', 'rnaPreparation3AdapterLigationProtocol-microRNAprofilingbyhighthroughputsequencing-CHEBI_33697','key', 'url', 'protocolFiles-task.json', 'protocolFiles-file-result.json')
    graphqlPage.verify_pagination()
  })

})




