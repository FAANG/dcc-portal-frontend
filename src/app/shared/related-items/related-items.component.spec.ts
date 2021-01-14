import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RelatedItemsComponent } from './related-items.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import setting from './related-items.component.setting.json';
import {TableClientSideComponent}  from '../table-client-side/table-client-side.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ApiDataService} from '../../services/api-data.service';
import {UserService} from '../../services/user.service';
import {of as observableOf} from 'rxjs';

describe('RelatedItemsComponent', () => {
  let component: RelatedItemsComponent;
  let fixture: ComponentFixture<RelatedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelatedItemsComponent,
        RobustLinkComponent,
        TableClientSideComponent,
        MatPaginator,
        MatSort,
      ],
      imports: [
        NgxPaginationModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule,
        MatTooltipModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ApiDataService,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedItemsComponent);
    component = fixture.componentInstance;
    component.record_id = 'dataset.accession';
    component.source_type = 'dataset';
    component.target_type = 'file';
    component.download_key = 'url';
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('check initial displayed column conversion_status in dataset file table', () => {
    // component.selected = new Map();
    // component.selected.set('name', true);
    // component.selected.set('description', false);
    expect(component.isDisplayed('File name')).toEqual(true);
    expect(component.isDisplayed('Archive')).toEqual(false);
    expect(component.isDisplayed('not existing field name')).toEqual(false);
  });

  it ('check all columns', () => {
    expect(component.get_all_fields()['column_names']).toEqual(['File name', 'Experiment', 'Archive', 'File size', 'Checksum', 'Checksum method']);
  });

  it ('check initial displayed columns', () => {
    expect(component.get_displayed_fields()['column_names']).toEqual(['File name', 'Experiment', 'File size']);
  });

  it ('Get the field name in ES which contains the required attribute value', () => {
    expect(component.get_attr('Experiment')).toEqual('experiment');
  });

  it ('Get the field name in ES which contains the link for required attribute', () => {
    expect(component.get_field_values_for_links('Experiment')).toBeUndefined();
    const link = component.get_field_values_for_links('File name');
    expect(link['prefix']).toEqual('../file/');
    expect(link['url']).toEqual('fileId');
  });

  it ('file table has download button', () => {
    expect(component.showButton()).toEqual(true);
    component.target_type = 'specimen';
    expect(component.showButton()).toEqual(false);
  });

  it ('download button disabled when no file selected', () => {
    // default no file selected
    expect(component.disableButton()).toEqual(true);
    // simulate one file selected
    component.urls.push('http://a.zip');
    expect(component.disableButton()).toEqual(false);
  });

  it ('check length of selected file list', () => {
    // default no file selected
    expect(component.getUrlsLength()).toEqual(0);
    // simulate one file selected
    component.urls.push('http://a.zip');
    expect(component.getUrlsLength()).toEqual(1);
  });

  it ('get value from ES structure', () => {
    const record = {
      'name': 'value for name',
      'nested': {
        'another': {
          'finally': 'value'
        }
      }
    };
    expect(component.getValue(record, 'name')).toEqual('value for name');
    expect(component.getValue(record, 'nested.another.finally')).toEqual('value');
    expect(component.getValue(record, 'invalidProperty')).toBeUndefined();
  });

  it ('capitalize first letter of given string', () => {
    expect(component.capitalizeFirstLetter('name')).toEqual('Name');
    expect(component.capitalizeFirstLetter('several words together')).toEqual('Several words together');
  });

  it ('toggle selected column', () => {
    const field = 'Archive';
    expect(component.isDisplayed(field)).toEqual(false);
    component.toggleSelectedColumn(field);
    expect(component.isDisplayed(field)).toEqual(true);
    component.toggleSelectedColumn(field);
    expect(component.isDisplayed(field)).toEqual(false);
  });

  it ('toggle selected column when column doesnt exist', () => {
    const field = 'invalid';
    expect(component.toggleSelectedColumn(field)).toBeUndefined();
    component.download_key = '';
    expect(component.toggleSelectedColumn(field)).toBeUndefined();
  });

  it('should uncheck download checkbox', () => {
    component.checked = true;
    component.mainCheckboxClicked();
    expect(component.checked).toEqual(false);
    expect(component.urls.length).toEqual(0);
  })

  it('should check download checkbox', () => {
    component.checked = false;
    component.records = [
      {id: 'test1', url: 'testUrl'},
      {id: 'test2', url: 'testUrl'}
    ];
    component.mainCheckboxClicked();
    expect(component.checked).toEqual(true);
    expect(component.urls.length).toBeGreaterThan(0);
  })

  it('should return true for private records', () => {
    const record = {id: 'rec1', private: true};
    expect(component.isRecordPrivate(record)).toEqual(true);
  })

  it('should set main checkbox to status 0(none selected)', () => {
    component.urls = [];
    expect(component.mainCheckboxChecked()).toEqual(0);
    expect(component.checked).toEqual(false);
    component.records = [
      {id: 'test1', url: 'testUrl1'},
      {id: 'test2', url: 'testUrl2'}
    ];
    expect(component.mainCheckboxChecked()).toEqual(0);
    expect(component.checked).toEqual(false);
  })

  it('should set main checkbox to status 1(partially selected)', () => {
    component.urls = [];
    component.records = [
      {id: 'test1', url: 'testUrl1'},
      {id: 'test2', url: 'testUrl2'}
    ];
    component.urls = ['testUrl1'];
    expect(component.mainCheckboxChecked()).toEqual(1);
    expect(component.checked).toEqual(false);
  })

  it('should set main checkbox to status 2(all selected)', () => {
    component.records = [
      {id: 'test1', url: 'testUrl1'},
      {id: 'test2', url: 'testUrl2'}
    ];
    component.urls = ['testUrl1', 'testUrl2'];
    expect(component.mainCheckboxChecked()).toEqual(2);
    expect(component.checked).toEqual(true);
  })

  it('should return true or false indicating status of checkbox', () => {
    component.urls = ['ftp://testUrl1', 'ftp://testUrl2'];
    expect(component.CheckboxChecked('testUrl1')).toEqual(true);
    expect(component.CheckboxChecked('testUrl3')).toEqual(false);
  })

  it('should add url when unchecked checkbox is selected', () => {
    component.urls = ['ftp://testUrl1'];
    component.onCheckboxClick('testUrl3');
    expect(component.urls.length).toEqual(2);
    expect(component.urls.indexOf('ftp://testUrl3')).toBeGreaterThanOrEqual(0);
  })

  it('should remove url when checked checkbox is selected', () => {
    component.urls = ['ftp://testUrl1', 'ftp://testUrl3'];
    component.onCheckboxClick('testUrl1');
    expect(component.urls.length).toEqual(1);
    expect(component.urls.indexOf('ftp://testUrl1')).toEqual(-1);
    expect(component.urls.indexOf('ftp://testUrl3')).toEqual(0);
  })

  it('should get private and public records based on user token', 
    inject([ApiDataService, UserService], (service: ApiDataService, userService: UserService) => {
    component.source_type = 'project';
    component.target_type = 'organism';
    spyOn(service, 'getAllOrganismsFromProject').and.returnValue(observableOf([{id: 'rec1'},{id: 'rec2'}]));
    component.ngOnInit();
    expect(service.getAllOrganismsFromProject).toHaveBeenCalledWith(component.record_id, 'public');
    userService.token = 'test';
    component.ngOnInit();
    expect(service.getAllOrganismsFromProject).toHaveBeenCalledWith(component.record_id, 'private');
  }));

  it('should return the correct records on loading', inject([ApiDataService], (service: ApiDataService) => {
    component.download_key = '';
    component.source_type = 'project';
    component.target_type = 'specimen';
    spyOn(service, 'getAllSpecimensForProject').and.returnValue(observableOf([{id: 'rec1'},{id: 'rec2'}]));
    component.ngOnInit();
    expect(service.getAllSpecimensForProject).toHaveBeenCalled();

    component.target_type = 'publication';
    spyOn(service, 'getAllArticlesForProject').and.returnValue(observableOf([{id: 'rec1'},{id: 'rec2'}]));
    component.ngOnInit();
    expect(service.getAllArticlesForProject).toHaveBeenCalled();
    
    component.target_type = 'file';
    spyOn(service, 'getAllFilesForProject').and.returnValue(observableOf([{id: 'rec1'},{id: 'rec2'}]));
    component.ngOnInit();
    expect(service.getAllFilesForProject).toHaveBeenCalled();

    component.source_type = 'publication';
    component.target_type = 'dataset';
    spyOn(service, 'getArticle').and.returnValue(observableOf({hits: {hits: [{_source: {relatedDatasets: [{species: ['rec1']},{species: ['rec2']}]}}]}}));
    component.ngOnInit();
    expect(service.getArticle).toHaveBeenCalled();

    component.source_type = 'analysis';
    component.target_type = 'file';
    spyOn(service, 'getAnalysis').and.returnValue(observableOf({hits: {hits: [{_source: {files: [{id: 'rec1'},{id: 'rec2'}]}}]}}));
    component.ngOnInit();
    expect(service.getAnalysis).toHaveBeenCalled();

    component.source_type = 'file';
    component.target_type = 'download';
    spyOn(service, 'getFilesByRun').and.returnValue(observableOf({hits: {hits: [{_source: {publishedArticles: [{id: 'rec1'},{id: 'rec2'}]}}]}}));
    component.ngOnInit();
    expect(service.getFilesByRun).toHaveBeenCalled();

    component.target_type = 'paper';
    spyOn(service, 'getFile').and.returnValue(observableOf({hits: {hits: [{_source: {publishedArticles: [{id: 'rec1'},{id: 'rec2'}]}}]}}));
    component.ngOnInit();
    expect(service.getFile).toHaveBeenCalled();

    component.source_type = 'dataset';
    component.target_type = 'specimen';
    spyOn(service, 'getDatasetSpecimen').and.returnValue(observableOf([{id: 'rec1'},{id: 'rec2'}]));
    component.ngOnInit();
    expect(service.getDatasetSpecimen).toHaveBeenCalled();

    component.target_type = 'file';
    spyOn(service, 'getDataset').and.returnValue(observableOf(
      {hits: {hits: [{_source: {publishedArticles: [{id: 'rec1'},{id: 'rec2'}], 
      file: [{id: 'rec1'},{id: 'rec2'}]}}]}}));
    component.ngOnInit();
    expect(service.getDataset).toHaveBeenCalled();

    component.target_type = 'paper';
    component.ngOnInit();
    expect(service.getDataset).toHaveBeenCalled();
    
    component.target_type = 'analysis';
    spyOn(service, 'getAnalysesByDataset').and.returnValue(observableOf([{id: 'rec1'},{id: 'rec2'}]));
    component.ngOnInit();
    expect(service.getAnalysesByDataset).toHaveBeenCalled();

    component.source_type = 'organism';
    component.target_type = 'specimen';
    spyOn(service, 'getOrganismsSpecimens').and.returnValue(observableOf([{id: 'rec1'},{id: 'rec2'}]));
    component.ngOnInit();
    expect(service.getOrganismsSpecimens).toHaveBeenCalled();

    component.target_type = 'paper';
    spyOn(service, 'getOrganism').and.returnValue(observableOf({hits: {hits: [{_source: {publishedArticles: [{id: 'rec1'},{id: 'rec2'}]}}]}}));
    component.ngOnInit();
    expect(service.getOrganism).toHaveBeenCalled();

    component.source_type = 'specimen';
    component.target_type = 'specimen';
    spyOn(service, 'getSpecimenRelationships').and.returnValue(observableOf({hits: {hits: [{id: 'rec1'},{id: 'rec2'}]}}));
    component.ngOnInit();
    expect(service.getSpecimenRelationships).toHaveBeenCalled();

    component.target_type = 'file';
    spyOn(service, 'getSpecimenFiles').and.returnValue(observableOf([{id: 'rec1'},{id: 'rec2'}]));
    component.ngOnInit();
    expect(service.getSpecimenFiles).toHaveBeenCalled();

    component.target_type = 'paper';
    spyOn(service, 'getSpecimen').and.returnValue(observableOf({hits: {hits: [{_source: {publishedArticles: [{id: 'rec1'},{id: 'rec2'}]}}]}}));
    component.ngOnInit();
    expect(service.getSpecimen).toHaveBeenCalled();
    
    component.target_type = 'analysis';
    spyOn(service, 'getAnalysesBySample').and.returnValue(observableOf({hits: {hits: [{id: 'rec1'},{id: 'rec2'}]}}));
    component.ngOnInit();
    expect(service.getAnalysesBySample).toHaveBeenCalled();

  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
