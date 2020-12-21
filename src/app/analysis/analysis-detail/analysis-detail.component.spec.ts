import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnalysisDetailComponent } from './analysis-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';

describe('AnalysisDetailComponent', () => {
  let component: AnalysisDetailComponent;
  let fixture: ComponentFixture<AnalysisDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AnalysisDetailComponent,
        HeaderComponent,
        RobustLinkComponent,
        RelatedItemsComponent,
      ],
      imports: [
        NgxPaginationModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisDetailComponent);
    component = fixture.componentInstance;
    component.accession = 'ERZ887818';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('wrong analysis accession', () => {
    component.accession = 'fake accession';
    const spyOnInit = spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(spyOnInit.calls.count()).toEqual(1);
    expect(component.analysis).toBeUndefined();
  });

  it('correct analysis accession', () => {
    const spyOnInit = spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(spyOnInit.calls.count()).toEqual(1);
    expect(component.analysis).toBeUndefined();
    // expect(component.analysis['accession']).toEqual(component.accession);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
