import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileTableComponent } from './file-table/file-table.component';
import { AppRoutingModule } from './/app-routing.module';
import {ApiFileService} from './services/api-file.service';
import {AggregationService} from './services/aggregation.service';
import { FilterComponent } from './shared/filter/filter.component';
import {SortPipe} from './pipes/sort.pipe';
import {FilterPipe} from './pipes/filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import { ActiveFilterComponent } from './shared/active-filter/active-filter.component';
import { ExportComponent } from './shared/export/export.component';
import { HomeComponent } from './home/home.component';
import { OrganismComponent } from './organism/organism.component';
import { SpecimenComponent } from './specimen/specimen.component';
import { DatasetComponent } from './dataset/dataset.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './help/help.component';
import { HeaderComponent } from './shared/header/header.component';
import {Angular2CsvModule} from 'angular2-csv';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ExportService} from './services/export.service';
import { FileDetailComponent } from './file-table/file-detail/file-detail.component';
import { RobustLinkComponent } from './shared/robust-link/robust-link.component';
import { RelatedItemsComponent } from './shared/related-items/related-items.component';
import { RunFilesComponent } from './shared/run-files/run-files.component';
import { OrganismDetailComponent } from './organism/organism-detail/organism-detail.component';
import { SpecimenDetailComponent } from './specimen/specimen-detail/specimen-detail.component';
import { SearchTemplateComponent } from './search/search-template/search-template.component';
import { DatasetDetailComponent } from './dataset/dataset-detail/dataset-detail.component';
import { AnalysisDetailComponent } from './analysis/analysis-detail/analysis-detail.component';
import { SearchService } from './services/search.service';
import { CookieLawModule } from 'angular2-cookie-law';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ApiComponent } from './help/api/api.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ProtocolSampleComponent } from './protocol-sample/protocol-sample.component';
import { ProtocolExperimentComponent } from './protocol-experiment/protocol-experiment.component';
import { ProtocolSampleDetailsComponent } from './protocol-sample/protocol-sample-details/protocol-sample-details.component';
import {ProtocolExperimentDetailsComponent} from './protocol-experiment/protocol-experiment-details/protocol-experiment-details.component';
import { ChartsModule } from 'ng2-charts';
import { OrganismsSummaryComponent } from './organisms-summary/organisms-summary.component';
import { SpecimensSummaryComponent } from './specimens-summary/specimens-summary.component';
import { DatasetsSummaryComponent } from './datasets-summary/datasets-summary.component';
import { FilesSummaryComponent } from './files-summary/files-summary.component';
import {SlicePipe} from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap';
import { ProtocolAnalysisComponent } from './protocol-analysis/protocol-analysis.component';
import { NonExistingComponent } from './non-existing/non-existing.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FileTableComponent,
    FilterComponent,
    SortPipe,
    FilterPipe,
    ActiveFilterComponent,
    ExportComponent,
    HomeComponent,
    OrganismComponent,
    SpecimenComponent,
    DatasetComponent,
    AnalysisComponent,
    SearchComponent,
    HelpComponent,
    HeaderComponent,
    FileDetailComponent,
    RobustLinkComponent,
    RelatedItemsComponent,
    RunFilesComponent,
    OrganismDetailComponent,
    SpecimenDetailComponent,
    SearchTemplateComponent,
    DatasetDetailComponent,
    AnalysisDetailComponent,
    ApiComponent,
    ProtocolSampleComponent,
    ProtocolExperimentComponent,
    ProtocolSampleDetailsComponent,
    ProtocolExperimentDetailsComponent,
    OrganismsSummaryComponent,
    SpecimensSummaryComponent,
    DatasetsSummaryComponent,
    FilesSummaryComponent,
    ProtocolAnalysisComponent,
    NonExistingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Angular2CsvModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    CookieLawModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxSmartModalModule.forRoot(),
  ],
  providers: [ApiFileService, AggregationService, ExportService, SearchService, SlicePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
