import { AppPage } from './app.po';
import {by, element, browser} from 'protractor';

// describe('Test home page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//   });
//
//   it('should display welcome message', () => {
//     page.navigateTo();
//     expect(page.getParagraphText()).toEqual('Data Portal');
//   });
// });
//
// describe('Test organisms page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//     page.navigateToOrganism();
//   });
//
//   it('should display FAANG organisms', () => {
//
//     expect(page.getParagraphTextForPages()).toEqual('FAANG organisms');
//   });
//
//   it('should sort table', () => {
//     expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Equus caballus');
//     element.all(by.css('th')).get(2).click().then(function() {
//       browser.sleep(1000);
//       expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Sus scrofa');
//       element.all(by.css('th')).get(2).click().then(function() {
//         browser.sleep(1000);
//         expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(2).getText()).toEqual('Bos indicus');
//       });
//     });
//   });
//
//   it('should filter table', () => {
//     const before = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
//     element.all(by.css('.list-group-item')).get(1).click().then(function() {
//       browser.sleep(1000);
//       const after = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
//       expect(before).toBeGreaterThan(after);
//     });
//   });
// });
//
// describe('Test specimens page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//     page.navigateToSpecimen();
//   });
//
//   it('should display FAANG specimens', () => {
//     expect(page.getParagraphTextForPages()).toEqual('FAANG specimens');
//   });
//
//   it('should sort table', () => {
//     expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(1).getText()).toEqual('specimen from organism');
//     element.all(by.css('th')).get(1).click().then(function() {
//       browser.sleep(1000);
//       expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(1).getText()).toEqual('specimen from organism');
//       element.all(by.css('th')).get(1).click().then(function() {
//         browser.sleep(1000);
//         expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(1).getText()).toEqual('cell culture');
//       });
//     });
//   });
//
//   it('should filter table', () => {
//     const before = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
//     element.all(by.css('.list-group-item')).get(2).click().then(function() {
//       browser.sleep(1000);
//       const after = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
//       expect(before).toBeGreaterThan(after);
//     });
//   });
// });

// describe('Test dataset page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//     page.navigateToDatset();
//   });
//
//   it('should display FAANG datasets', () => {
//     expect(page.getParagraphTextForPages()).toEqual('FAANG datasets');
//   });
//
//   it('should filter table', () => {
//     const before = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
//     element.all(by.css('.list-group-item')).get(2).click().then(function() {
//       browser.sleep(1000);
//       const after = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
//       expect(before).toBeGreaterThan(after);
//     });
//   });
// });

// describe('Test file page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//     page.navigateToFile();
//   });
//
//   it('should display FAANG files', () => {
//     expect(page.getParagraphTextForPages()).toEqual('FAANG files');
//   });
//
//   it('should sort table', () => {
//     expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(3).getText()).toEqual('Gallus gallus');
//     element.all(by.css('th')).get(3).click().then(function() {
//       browser.sleep(1000);
//       expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(3).getText()).toEqual('Sus scrofa');
//       element.all(by.css('th')).get(3).click().then(function() {
//         browser.sleep(1000);
//         expect(element(by.css('tbody')).all(by.css('tr')).first().all(by.css('td')).get(3).getText()).toEqual('Bos indicus');
//       });
//     });
//   });
//
//   it('should filter table', () => {
//     const before = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
//     element.all(by.css('.list-group-item')).get(2).click().then(function() {
//       browser.sleep(1000);
//       const after = element.all(by.css('.list-group-item')).first().all(by.css('span')).first().getText();
//       expect(before).toBeGreaterThan(after);
//     });
//   });
// });

describe('Test protocol/samples page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToProtocolSamples();
  });

  it('should display FAANG protocols', () => {
    expect(page.getParagraphTextForPages()).toContain('FAANG protocols');
  });

  it('should filter table', () => {
    element.all(by.css('.list-group-item')).get(3).click().then(function() {
      browser.sleep(1000);
      const after = element.all(by.css('.list-group-item')).get(4).getText();
      expect(after).toContain('samples');
    });
  });
});

describe('Test protocol/experiments page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToProtocolExperiments();
  });

  it('should display FAANG protocols', () => {
    expect(page.getParagraphTextForPages()).toContain('FAANG protocols');
  });

  it('should filter table', () => {
    element.all(by.css('.list-group-item')).get(0).click().then(function() {
      const after = element.all(by.css('.list-group-item')).get(1).getText();
      expect(after).toContain('CHEBI_33697');
    });
  });
});

// describe('Test summary/organisms page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//   });
//
//   it('should display FAANG Summary on summary/organisms path', () => {
//     page.navigateToSummaryOrganisms();
//     expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
//   });
// });
//
// describe('Test summary/specimens page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//   });
//
//   it('should display FAANG Summary on summary/specimens path', () => {
//     page.navigateToSummarySpecimens();
//     expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
//   });
// });
//
// describe('Test summary/datasets page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//   });
//
//   it('should display FAANG Summary on summary/datasets path', () => {
//     page.navigateToSummaryDatasets();
//     expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
//   });
// });
//
// describe('Test summary/files page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//   });
//
//   it('should display FAANG Summary on summary/files path', () => {
//     page.navigateToSummaryFiles();
//     expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
//   });
// });

// describe('Test search page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//     page.navigateToSearch();
//   });
//
//   it('should display Search FAANG placeholder on search path', () => {
//     expect(element(by.css('.form-control')).getAttribute('placeholder')).toEqual('Search FAANG');
//   });
//
//   it('should have checkbox that will exclude legacy data', () => {
//     expect(element(by.css('.checkbox')).element(by.tagName('label')).getText()).toEqual('Show only FAANG data (exclude legacy data)');
//   });
//
//   it('should display 78 matching datasets on a search path when search for sus scrofa', () => {
//     element(by.css('.form-control')).sendKeys('sus scrofa').then(function () {
//       expect(element.all(by.css('h4')).last().getText()).toEqual('78 matching datasets');
//     });
//   });
//
//   it('should display 11 matching datasets on a search path when search for sus scrofa with legacy data excluded', () => {
//     element(by.css('.form-control')).sendKeys('sus scrofa').then(function () {
//       element(by.css('.checkbox')).element(by.tagName('label')).element(by.tagName('input')).click().then(function() {
//         expect(element.all(by.css('h4')).last().getText()).toEqual('11 matching datasets');
//       });
//     });
//   });
// });

// describe('Test help page', () => {
//   let page: AppPage;
//
//   beforeEach(() => {
//     page = new AppPage();
//     page.navigateToHelp();
//   });
//
//   it('should display Frequently Asked Questions on help path', () => {
//     expect(page.getParagraphTextForPages()).toEqual('Frequently Asked Questions:');
//   });
//
//   it('should display How do I get involved with the FAANG project? on help path', () => {
//     expect(element.all(by.css('h4')).first().getText()).toEqual('How do I get involved with the FAANG project?');
//   });
//
//   it('should display some text when click on arrow on help path', () => {
//     element.all(by.css('summary')).first().click().then(function() {
//       expect(element.all(by.css('details')).first().getText()).toContain('Please register');
//     });
//   });
// });
