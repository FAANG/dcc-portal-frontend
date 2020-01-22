import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileComponent } from './file/file.component';
import { AppRoutingModule } from './/app-routing.module';
import {ApiDataService} from './services/api-data.service';
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
import { ArticleComponent } from './article/article.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './help/help.component';
import { HeaderComponent } from './shared/header/header.component';
import {Angular2CsvModule} from 'angular2-csv';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ExportService} from './services/export.service';
import { FileDetailComponent } from './file/file-detail/file-detail.component';
import { RobustLinkComponent } from './shared/robust-link/robust-link.component';
import { RelatedItemsComponent } from './shared/related-items/related-items.component';
import { OrganismDetailComponent } from './organism/organism-detail/organism-detail.component';
import { SpecimenDetailComponent } from './specimen/specimen-detail/specimen-detail.component';
import { SearchTemplateComponent } from './search/search-template/search-template.component';
import { DatasetDetailComponent } from './dataset/dataset-detail/dataset-detail.component';
import { AnalysisDetailComponent } from './analysis/analysis-detail/analysis-detail.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
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
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { IndeterminateDirective } from './shared/indeterminate.directive';
import {RulesetAnalysisComponent} from './rulesets/ruleset-analysis/ruleset-analysis.component';
import {RulesetSampleComponent} from './rulesets/ruleset-sample/ruleset-sample.component';
import {RulesetExperimentComponent} from './rulesets/ruleset-experiment/ruleset-experiment.component';
import { FooterComponent } from './shared/footer/footer.component';
import {FormsModule} from '@angular/forms';
import { ValidationSamplesComponent } from './validation/validation-samples/validation-samples.component';
import { ValidationExperimentsComponent } from './validation/validation-experiments/validation-experiments.component';
import { ValidationAnalysesComponent } from './validation/validation-analyses/validation-analyses.component';
import { AquafaangComponent } from './subprojects/aquafaang/aquafaang.component';
import { BovregComponent } from './subprojects/bovreg/bovreg.component';
import { GeneSwitchComponent } from './subprojects/gene-switch/gene-switch.component';
import { UsdaBovineComponent } from './subprojects/usda-bovine/usda-bovine.component';
import { SheepatlasComponent } from './subprojects/sheepatlas/sheepatlas.component';
import {FileUploadModule} from 'ng2-file-upload';
import { SubprojectsLandingComponent } from './subprojects/subprojects-landing/subprojects-landing.component';
import {AuthModule} from 'ng-ebi-authorization';
import {JwtModule} from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
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
    ArticleComponent,
    SearchComponent,
    HelpComponent,
    HeaderComponent,
    FileDetailComponent,
    RobustLinkComponent,
    RelatedItemsComponent,
    OrganismDetailComponent,
    SpecimenDetailComponent,
    SearchTemplateComponent,
    DatasetDetailComponent,
    AnalysisDetailComponent,
    ArticleDetailComponent,
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
    RulesetSampleComponent,
    RulesetExperimentComponent,
    RulesetAnalysisComponent,
    IndeterminateDirective,
    FooterComponent,
    ValidationSamplesComponent,
    ValidationExperimentsComponent,
    ValidationAnalysesComponent,
    AquafaangComponent,
    BovregComponent,
    GeneSwitchComponent,
    UsdaBovineComponent,
    SheepatlasComponent,
    SubprojectsLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Angular2CsvModule,
    NgxSpinnerModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    CookieLawModule,
    ChartsModule,
    FormsModule,
    FileUploadModule,
    AuthModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('id_token')
      }
    }),
    BsDropdownModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxSmartModalModule.forRoot(),
    NgbModule.forRoot(),
  ],
  providers: [ApiDataService, AggregationService, ExportService, SearchService, SlicePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
