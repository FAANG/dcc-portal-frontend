import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message on home page', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Data Portal');
  });

  it('should display FAANG files on file path', () => {
    page.navigateToFile();
    expect(page.getParagraphTextForPages()).toEqual('FAANG files');
  });

  it('should display FAANG organisms on organism path', () => {
    page.navigateToOrganism();
    expect(page.getParagraphTextForPages()).toEqual('FAANG organisms');
  });

  it('should display FAANG specimens on specimens path', () => {
    page.navigateToSpecimen();
    expect(page.getParagraphTextForPages()).toEqual('FAANG specimens');
  });

  it('should display FAANG datasets on dataset path', () => {
    page.navigateToDatset();
    expect(page.getParagraphTextForPages()).toEqual('FAANG datasets');
  });

  it('should display FAANG protocols on protocol/samples path', () => {
    page.navigateToProtocolSamples();
    expect(page.getParagraphTextForPages()).toContain('FAANG protocols');
  });

  it('should display FAANG protocols on protocol/experiments path', () => {
    page.navigateToProtocolExperiments();
    expect(page.getParagraphTextForPages()).toContain('FAANG protocols');
  });

  it('should display FAANG Summary on summary/organisms path', () => {
    page.navigateToSummaryOrganisms();
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });

  it('should display FAANG Summary on summary/specimens path', () => {
    page.navigateToSummarySpecimens();
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });

  it('should display FAANG Summary on summary/datasets path', () => {
    page.navigateToSummaryDatasets();
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });

  it('should display FAANG Summary on summary/files path', () => {
    page.navigateToSummaryFiles();
    expect(page.getParagraphTextForPages()).toContain('FAANG Summary');
  });
});
