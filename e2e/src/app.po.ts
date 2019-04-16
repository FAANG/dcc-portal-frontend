import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToFile() {
    return browser.get('/file');
  }

  navigateToFileDetails() {
    return browser.get('/file/SRR958466_2');
  }

  navigateToOrganism() {
    return browser.get('/organism');
  }

  navigateToOrganismDetails() {
    return browser.get('organism/SAMEA104728877');
  }

  navigateToSpecimen() {
    return browser.get('/specimen');
  }

  navigateToSpecimenDetails() {
    return browser.get('/specimen/SAMEA104728909');
  }

  navigateToDatset() {
    return browser.get('/dataset');
  }

  navigateToDatasetDetails() {
    return browser.get('/dataset/PRJEB28219');
  }

  navigateToProtocolSamples() {
    return browser.get('/protocol/samples');
  }

  navigateToProtocolSamplesDetails() {
    return browser.get('/protocol/samples/ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.pdf');
  }

  navigateToProtocolExperiments() {
    return browser.get('/protocol/experiments');
  }

  navigateToProtocolExperimentsDetails() {
    return browser.get('/protocol/experiments/libraryGenerationProtocol-transcriptionprofilingbyhighthroughputsequencing-totalRNA');
  }

  navigateToSummaryOrganisms() {
    return browser.get('/summary/organisms');
  }

  navigateToSummarySpecimens() {
    return browser.get('/summary/specimens');
  }

  navigateToSummaryDatasets() {
    return browser.get('/summary/datasets');
  }

  navigateToSummaryFiles() {
    return browser.get('/summary/files');
  }

  navigateToHelp() {
    return browser.get('/help');
  }

  navigateToSearch() {
    return browser.get('/search');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getParagraphTextForPages() {
    return element(by.css('h2')).getText();
  }
}
