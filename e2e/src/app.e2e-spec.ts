import { AppPage } from './app.po';
import {by, element} from 'protractor';

describe('Test home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message on home page', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Data Portal');
  });
});

describe('Test organisms page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG organisms on organism path', () => {
    page.navigateToOrganism();
    expect(page.getParagraphTextForPages()).toEqual('FAANG organisms');
  });
});

describe('Test specimens page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG specimens on specimens path', () => {
    page.navigateToSpecimen();
    expect(page.getParagraphTextForPages()).toEqual('FAANG specimens');
  });
});

describe('Test dataset page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG datasets on dataset path', () => {
    page.navigateToDatset();
    expect(page.getParagraphTextForPages()).toEqual('FAANG datasets');
  });
});

describe('Test file page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG files on file path', () => {
    page.navigateToFile();
    expect(page.getParagraphTextForPages()).toEqual('FAANG files');
  });
});

describe('Test protocol/samples page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG protocols on protocol/samples path', () => {
    page.navigateToProtocolSamples();
    expect(page.getParagraphTextForPages()).toContain('FAANG protocols');
  });
});

describe('Test protocol/experiments page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG protocols on protocol/experiments path', () => {
    page.navigateToProtocolExperiments();
    expect(page.getParagraphTextForPages()).toContain('FAANG protocols');
  });
});

describe('Test summary/organisms page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG Summary on summary/organisms path', () => {
    page.navigateToSummaryOrganisms();
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });
});

describe('Test summary/specimens page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG Summary on summary/specimens path', () => {
    page.navigateToSummarySpecimens();
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });
});

describe('Test summary/datasets page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG Summary on summary/datasets path', () => {
    page.navigateToSummaryDatasets();
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });
});

describe('Test summary/files page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG Summary on summary/files path', () => {
    page.navigateToSummaryFiles();
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });
});

describe('Test search page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Search FAANG placeholder on search path', () => {
    page.navigateToSearch();
    expect(element(by.css('.form-control')).getAttribute('placeholder')).toEqual('Search FAANG');
  });

  it('should have checkbox that will exclude legacy data', () => {
    page.navigateToSearch();
    expect(element(by.css('.checkbox')).element(by.tagName('label')).getText()).toEqual('Show only FAANG data (exclude legacy data)');
  });
});

describe('Test help page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display FAANG Summary on summary/files path', () => {
    page.navigateToHelp();
    expect(page.getParagraphTextForPages()).toEqual('Frequently Asked Questions:');
  });
});
