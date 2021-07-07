import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileComponent } from './file/file.component';
import { AppRoutingModule } from './app-routing.module';
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
import { SubprojectDetailComponent } from './subprojects/subproject-detail/subproject-detail.component';

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
import { UsdaBovineComponent } from './subprojects/usda-bovine/usda-bovine.component';
import { SheepatlasComponent } from './subprojects/sheepatlas/sheepatlas.component';
import {FileUploadModule} from 'ng2-file-upload';
import { SubprojectComponent } from './subprojects/subproject.component';
import {AuthModule} from 'ng-ebi-authorization';
import {JwtModule} from '@auth0/angular-jwt';
import { AapComponent } from './aap/aap.component';
import 'hammerjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { TableClientSideComponent } from './shared/table-client-side/table-client-side.component';
import {LoginComponent} from './login/login.component';
import {FilesUploadComponent} from './files-upload/files-upload.component';
import {UserService} from './services/user.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { OntologyImproverComponent } from './ontology-improver/ontology-improver.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import { MatRadioModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OntologyDetailComponent } from './ontology-improver/ontology-detail/ontology-detail.component';
import { MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { ApiDocsComponent } from './api-docs/api-docs.component';

export function getToken(): string {
  return localStorage.getItem('jwt_token') || '';
}

export function updateToken(newToken: string): void {
  return localStorage.setItem('jwt_token', newToken);
}

export function removeToken(): void {
  return localStorage.removeItem('jwt_token');
}

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
    SubprojectDetailComponent,
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
    UsdaBovineComponent,
    SheepatlasComponent,
    SubprojectComponent,
    AapComponent,
    TableClientSideComponent,
    LoginComponent,
    FilesUploadComponent,
    OntologyImproverComponent,
    OntologyDetailComponent,
    ApiDocsComponent
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    AuthModule.forRoot({
      aapURL: 'https://api.aai.ebi.ac.uk',
      tokenGetter: getToken,
      tokenUpdater: updateToken,
      tokenRemover: removeToken
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['api.aai.ebi.ac.uk'],
        blacklistedRoutes: ['https://api.aai.ebi.ac.uk/auth']
      }
    }),
    BsDropdownModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxSmartModalModule.forRoot(),
    NgbModule.forRoot(),
  ],
  providers: [ApiDataService, AggregationService, ExportService, SearchService, SlicePipe, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
