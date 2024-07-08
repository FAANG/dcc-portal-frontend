import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnalysisDetailComponent } from './analysis-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AnalysisDetailComponent', () => {
  let component: AnalysisDetailComponent;
  let fixture: ComponentFixture<AnalysisDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        AnalysisDetailComponent,
        HeaderComponent,
        RobustLinkComponent,
        RelatedItemsComponent,
    ],
    imports: [NgxPaginationModule,
        RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
});
