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
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './help/help.component';
import { HeaderComponent } from './shared/header/header.component';
import {Angular2CsvModule} from 'angular2-csv';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ExportService} from './services/export.service';
import { FileDetailComponent } from './file-table/file-detail/file-detail.component';
import { RobustLinkComponent } from './shared/robust-link/robust-link.component';
import { RunFilesComponent } from './shared/run-files/run-files.component';
import { OrganismDetailComponent } from './organism/organism-detail/organism-detail.component';
import { OrganismSpecimenComponent } from './organism/organism-specimen/organism-specimen.component';
import { SpecimenDetailComponent } from './specimen/specimen-detail/specimen-detail.component';
import { SpecimenFilesComponent } from './specimen/specimen-files/specimen-files.component';
import { SearchTemplateComponent } from './search/search-template/search-template.component';
import { DatasetDetailComponent } from './dataset/dataset-detail/dataset-detail.component';
import { DatasetRelatedTemplateComponent } from './dataset/dataset-related-template/dataset-related-template.component';
import {SearchService} from './services/search.service';
import {CookieLawModule} from 'angular2-cookie-law';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ApiComponent } from './help/api/api.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ProtocolComponent } from './protocol/protocol.component';
import { ProtocolSamplesComponent } from './protocol/protocol-samples/protocol-samples.component';
import { ProtocolExperimentsComponent } from './protocol/protocol-experiments/protocol-experiments.component';
import { ProtocolSamplesDetailComponent } from './protocol/protocol-samples/protocol-samples-detail/protocol-samples-detail.component';
import { ProtocolExperimentsDetailComponent } from './protocol/protocol-experiments/protocol-experiments-detail/protocol-experiments-detail.component';

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
    SearchComponent,
    HelpComponent,
    HeaderComponent,
    FileDetailComponent,
    RobustLinkComponent,
    RunFilesComponent,
    OrganismDetailComponent,
    OrganismSpecimenComponent,
    SpecimenDetailComponent,
    SpecimenFilesComponent,
    SearchTemplateComponent,
    DatasetDetailComponent,
    DatasetRelatedTemplateComponent,
    ApiComponent,
    ProtocolComponent,
    ProtocolSamplesComponent,
    ProtocolExperimentsComponent,
    ProtocolSamplesDetailComponent,
    ProtocolExperimentsDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Angular2CsvModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    CookieLawModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxSmartModalModule.forRoot(),
  ],
  providers: [ApiFileService, AggregationService, ExportService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
