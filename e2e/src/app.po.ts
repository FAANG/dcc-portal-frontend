import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToFile() {
    return browser.get('/file');
  }

  navigateToOrganism() {
    return browser.get('/organism');
  }

  navigateToSpecimen() {
    return browser.get('/specimen');
  }

  navigateToDatset() {
    return browser.get('/dataset');
  }

  navigateToProtocolSamples() {
    return browser.get('/protocol/samples');
  }

  navigateToProtocolExperiments() {
    return browser.get('/protocol/experiments');
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
