import { AppPage } from './app.po';
import {by, element, browser} from 'protractor';

describe('Test home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Data Portal');
  });
});

describe('Test organisms page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToOrganism();
    browser.driver.manage().window().setSize(1280, 1024);
  });

  it('should display "FAANG organisms"', () => {

    expect(page.getParagraphTextForPages()).toEqual('FAANG organisms');
  });

  it('should sort table', () => {
    expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Equus caballus');
    element.all(by.css('th')).get(2).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Sus scrofa');
    });
    element.all(by.css('th')).get(2).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Bos indicus');
    });
    element.all(by.css('th')).get(2).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Equus caballus');
    });
  });

  it('should filter table', () => {
    const before = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
    element.all(by.css('.list-group-item')).get(1).click().then(function() {
      const after = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
      expect(before).toBeGreaterThan(after);
    });
  });
});

describe('Test organisms detail page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToOrganismDetails();
  });

  it('should display "SAMEA104728877" in title and detailed information', () => {
    expect(element(by.css('h1')).getText()).toEqual('SAMEA104728877');
    expect(element.all(by.css('dd')).first().getText()).toEqual('ECA_UCD_AH2');
  });

  it('should redirect to 404 when navigate to non-existing path', () => {
    browser.get('/organism/SAMEA1047288778');
    expect(element(by.css('h2')).getText()).toEqual('Sorry, this page doesn\'t exist...');
  });
});

describe('Test specimens page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToSpecimen();
    browser.driver.manage().window().setSize(1280, 1024);
  });

  it('should display "FAANG specimens"', () => {
    expect(page.getParagraphTextForPages()).toEqual('FAANG specimens');
  });

  it('should sort table', () => {
    expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(1).getText()).toEqual('specimen from organism');
    element.all(by.css('th')).get(1).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(1).getText()).toEqual('specimen from organism');
    });
    element.all(by.css('th')).get(1).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(1).getText()).toEqual('cell culture');
    });
    element.all(by.css('th')).get(1).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(1).getText()).toEqual('specimen from organism');
    });
  });

  it('should filter table', () => {
    const before = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
    element.all(by.css('.list-group-item')).get(1).click().then(function() {
      const after = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
      // TODO check this
      expect(before).toBeLessThan(after);
    });
  });
});

describe('Test specimen detail page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToSpecimenDetails();
  });

  it('should display "SAMEA104728909" in title and detailed information', () => {
    expect(element(by.css('h1')).getText()).toEqual('SAMEA104728909');
    expect(element.all(by.css('dd')).first().getText()).toEqual('ECA_UCD_S63');
  });

  it('should redirect to 404 when navigate to non-existing path', () => {
    browser.get('/specimen/SAMEA1047288778');
    expect(element(by.css('h2')).getText()).toEqual('Sorry, this page doesn\'t exist...');
  });
});

describe('Test dataset page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToDatset();
  });

  it('should display "FAANG datasets"', () => {
    expect(page.getParagraphTextForPages()).toEqual('FAANG datasets');
  });

  it('should sort table', () => {
    expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Ovis aries');
    element.all(by.css('th')).get(2).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Sus scrofa,Gallus gallus');
    });
    element.all(by.css('th')).get(2).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Bos indicus');
    });
    element.all(by.css('th')).get(2).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Ovis aries');
    });
  });

  it('should filter table', () => {
    browser.sleep(5000);
    const before = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
    browser.sleep(5000);
    element.all(by.css('.list-group-item')).get(2).click().then(function() {
      browser.sleep(5000);
      const after = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
      expect(before).toBeGreaterThan(after);
    });
  });
});

describe('Test dataset detail page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToDatasetDetails();
  });

  it('should display "PRJEB28219" in title and detailed information', () => {
    expect(element(by.css('h1')).getText()).toEqual('PRJEB28219');
    expect(element.all(by.css('dd')).first().getText()).toEqual('PRJEB28219');
  });

  it('should redirect to 404 when navigate to non-existing path', () => {
    browser.get('/dataset/SAMEA1047288778');
    expect(element(by.css('h2')).getText()).toEqual('Sorry, this page doesn\'t exist...');
  });
});

describe('Test file page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToFile();
    browser.driver.manage().window().setSize(1280, 1024);
  });

  it('should display "FAANG files"', () => {
    expect(page.getParagraphTextForPages()).toEqual('FAANG files');
  });

  it('should sort table', () => {
    expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(3).getText()).toEqual('Gallus gallus');
    element.all(by.css('th')).get(3).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(3).getText()).toEqual('Sus scrofa');
    });
    element.all(by.css('th')).get(3).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(3).getText()).toEqual('Bos indicus');
    });
    element.all(by.css('th')).get(3).click().then(function() {
      expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(3).getText()).toEqual('Gallus gallus');
    });
  });

  it('should filter table', () => {
    const before = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
    element.all(by.css('.list-group-item')).get(2).click().then(function() {
      const after = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
      expect(before).toBeGreaterThan(after);
    });
  });
});

describe('Test file detail page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToFileDetails();
  });

  it('should display "PRJEB28219" in title and detailed information', () => {
    expect(element(by.css('h1')).getText()).toEqual('SRR958466_2');
    expect(element.all(by.css('dd')).first().getText()).toEqual('SRR958466_2.fastq.gz');
  });

  it('should redirect to 404 when navigate to non-existing path', () => {
    browser.get('/file/SAMEA1047288778');
    expect(element(by.css('h2')).getText()).toEqual('Sorry, this page doesn\'t exist...');
  });
});

describe('Test protocol/samples page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToProtocolSamples();
  });

  it('should display "FAANG protocols"', () => {
    expect(page.getParagraphTextForPages()).toContain('FAANG protocols');
  });

  it('should filter table', () => {
    element.all(by.css('.list-group-item')).get(3).click().then(function() {
      const after = element.all(by.css('.list-group-item')).get(3).getText();
      expect(after).toContain('samples');
    });
  });
});

describe('Test protocol/samples detail page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToProtocolSamplesDetails();
  });

  it('should display "PRJEB28219" in title and detailed information', () => {
    expect(element(by.css('h1')).getText()).toEqual('Harvest of Large Animal Tissues');
    expect(element.all(by.css('dd')).get(1).getText()).toEqual('Roslin Institute (Edinburgh, UK)');
  });

  it('should redirect to 404 when navigate to non-existing path', () => {
    browser.get('/protocol/samples/SAMEA1047288778');
    expect(element(by.css('h2')).getText()).toEqual('Sorry, this page doesn\'t exist...');
  });
});

describe('Test protocol/experiments page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToProtocolExperiments();
  });

  it('should display "FAANG protocols"', () => {
    expect(page.getParagraphTextForPages()).toContain('FAANG protocols');
  });

  it('should filter table', () => {
    element.all(by.css('.list-group-item')).get(0).click().then(function() {
      const after = element.all(by.css('.list-group-item')).get(1).getText();
      expect(after).toContain('CHEBI_33697');
    });
  });
});

describe('Test protocol/experiments detail page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToProtocolExperimentsDetails();
  });

  it('should display "Library generation protocol" in title and detailed information', () => {
    expect(element(by.css('h1')).getText()).toEqual('Library generation protocol');
    expect(element.all(by.css('dd')).get(1).getText()).toEqual('total RNA');
  });

  it('should redirect to 404 when navigate to non-existing path', () => {
    browser.get('/protocol/experiments/SAMEA1047288778');
    expect(element(by.css('h2')).getText()).toEqual('Sorry, this page doesn\'t exist...');
  });
});

describe('Test summary/organisms page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToSummaryOrganisms();
  });

  it('should display "FAANG Summary"', () => {
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });

  it('should display charts', () => {
    expect(element.all(by.css('h3')).get(0).getText()).toEqual('Sex');
    expect(element.all(by.css('h3')).get(1).getText()).toEqual('Paper published');
    expect(element.all(by.css('h3')).get(2).getText()).toEqual('Organisms');
    expect(element.all(by.css('h3')).get(3).getText()).toEqual('Standard');
    expect(element.all(by.css('h3')).get(4).getText()).toContain('Breeds of');
  });
});

describe('Test summary/specimens page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToSummarySpecimens();
  });

  it('should display "FAANG Summary"', () => {
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });

  it('should display charts', () => {
    expect(element.all(by.css('h3')).get(0).getText()).toEqual('Sex');
    expect(element.all(by.css('h3')).get(1).getText()).toEqual('Paper published');
    expect(element.all(by.css('h3')).get(2).getText()).toEqual('Standard');
    expect(element.all(by.css('h3')).get(3).getText()).toEqual('Organism part/Cell type');
    expect(element.all(by.css('h3')).get(4).getText()).toEqual('Organisms');
    expect(element.all(by.css('h3')).get(5).getText()).toEqual('Materials');
    expect(element.all(by.css('h3')).get(6).getText()).toContain('Breeds of');
  });
});

describe('Test summary/datasets page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToSummaryDatasets();
  });

  it('should display "FAANG Summary"', () => {
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });

  it('should display charts', () => {
    expect(element.all(by.css('h3')).get(0).getText()).toEqual('Standard');
    expect(element.all(by.css('h3')).get(1).getText()).toEqual('Paper published');
    expect(element.all(by.css('h3')).get(2).getText()).toEqual('Species');
    expect(element.all(by.css('h3')).get(3).getText()).toEqual('Assay type');
  });
});

describe('Test summary/files page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToSummaryFiles();
  });

  it('should display "FAANG Summary"', () => {
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });

  it('should display charts', () => {
    expect(element.all(by.css('h3')).get(0).getText()).toEqual('Standard');
    expect(element.all(by.css('h3')).get(1).getText()).toEqual('Paper published');
    expect(element.all(by.css('h3')).get(2).getText()).toEqual('Species');
    expect(element.all(by.css('h3')).get(3).getText()).toEqual('Assay type');
  });
});

describe('Test search page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToSearch();
  });

  it('should display "Search FAANG" placeholder on search path', () => {
    expect(element(by.css('.form-control')).getAttribute('placeholder')).toEqual('Search FAANG');
  });

  it('should have checkbox that will exclude legacy data', () => {
    expect(element(by.css('.checkbox')).element(by.tagName('label')).getText()).toEqual('Show only FAANG data (exclude legacy data)');
  });

  it('should display 89 matching datasets on a search path when search for sus scrofa', () => {
    element(by.css('.form-control')).sendKeys('sus scrofa').then(function () {
      expect(element.all(by.css('h4')).last().getText()).toEqual('89 matching datasets');
    });
  });

  it('should display 11 matching datasets on a search path when search for sus scrofa with legacy data excluded', () => {
    element(by.css('.form-control')).sendKeys('sus scrofa').then(function () {
      element(by.css('.checkbox')).element(by.tagName('label')).element(by.tagName('input')).click().then(function() {
        expect(element.all(by.css('h4')).last().getText()).toEqual('11 matching datasets');
      });
    });
  });
});

describe('Test help page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToHelp();
  });

  it('should display "Frequently Asked Questions" on help path', () => {
    expect(page.getParagraphTextForPages()).toEqual('Frequently Asked Questions:');
  });

  it('should display "How do I get involved with the FAANG project?" on help path', () => {
    expect(element.all(by.css('h4')).first().getText()).toEqual('How do I get involved with the FAANG project?');
  });

  it('should display some text when click on arrow on help path', () => {
    element.all(by.css('summary')).first().click().then(function() {
      expect(element.all(by.css('details')).first().getText()).toContain('Please register');
    });
  });
});


describe('Test 404 page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToNonExistingPage();
  });

  it('should redirect to 404 when navigate to non-existing path', () => {
    expect(element(by.css('h2')).getText()).toEqual('Sorry, this page doesn\'t exist...');
  });
});
