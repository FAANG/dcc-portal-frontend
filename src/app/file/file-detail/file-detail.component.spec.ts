import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDetailComponent } from './file-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {NgxPaginationModule} from 'ngx-pagination';

describe('FileDetailComponent', () => {
  let component: FileDetailComponent;
  let fixture: ComponentFixture<FileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileDetailComponent,
        HeaderComponent,
        RobustLinkComponent,
        RelatedItemsComponent,
      ],
      imports: [
        NgxSmartModalModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule,
      ],
      providers: [
        NgxSmartModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checkIsObject should return true if input is object', () => {
    expect(component.checkIsObject({})).toEqual(true);
  });

  it('checkIsObject should return false if input is not object', () => {
    expect(component.checkIsObject('')).toEqual(false);
  });

  it('expandObject should assign right values to experiment', () => {
    const data = {standardMet: 'Legacy', accession: 'SRX339479', assayType: 'whole genome sequencing assay', experimentTarget: 'input DNA'};
    component.expandObject(data);
    expect(component.experiment).toEqual({assayType: 'whole genome sequencing assay', experimentTarget: 'input DNA'});
  });
});
