import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileComponent } from './file/file.component';
import { AppRoutingModule } from './app-routing.module';
// import {ApiDataService} from './services/api-data.service';
// import {ApiFiltersService} from './services/api-filters.service';
// import {AggregationService} from './services/aggregation.service';
import { FilterComponent } from './shared/filter/filter.component';
// import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import { ActiveFilterComponent } from './shared/active-filter/active-filter.component';
import { HomeComponent } from './home/home.component';
import { OrganismComponent } from './organism/organism.component';
import { SpecimenComponent } from './specimen/specimen.component';
import { DatasetComponent } from './dataset/dataset.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ArticleComponent } from './article/article.component';
import { HeaderComponent } from './shared/header/header.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { FileDetailComponent } from './file/file-detail/file-detail.component';
import { RobustLinkComponent } from './shared/robust-link/robust-link.component';
import { RelatedItemsComponent } from './shared/related-items/related-items.component';
import { OrganismDetailComponent } from './organism/organism-detail/organism-detail.component';
import { SpecimenDetailComponent } from './specimen/specimen-detail/specimen-detail.component';
import { DatasetDetailComponent } from './dataset/dataset-detail/dataset-detail.component';
import { AnalysisDetailComponent } from './analysis/analysis-detail/analysis-detail.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { SubprojectDetailComponent } from './subprojects/subproject-detail/subproject-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ServiceWorkerModule } from '@angular/service-worker';
// import { environment } from '../environments/environment';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ProtocolSampleComponent } from './protocol-sample/protocol-sample.component';
import { ProtocolExperimentComponent } from './protocol-experiment/protocol-experiment.component';
import { ProtocolSampleDetailsComponent } from './protocol-sample/protocol-sample-details/protocol-sample-details.component';
import {ProtocolExperimentDetailsComponent} from './protocol-experiment/protocol-experiment-details/protocol-experiment-details.component';
// import { ChartsModule } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { OrganismsSummaryComponent } from './organisms-summary/organisms-summary.component';
import { SpecimensSummaryComponent } from './specimens-summary/specimens-summary.component';
import { DatasetsSummaryComponent } from './datasets-summary/datasets-summary.component';
import { FilesSummaryComponent } from './files-summary/files-summary.component';
// import {SlicePipe} from '@angular/common';
// import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ProtocolAnalysisComponent } from './protocol-analysis/protocol-analysis.component';
import { NonExistingComponent } from './non-existing/non-existing.component';
// import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { IndeterminateDirective } from './shared/indeterminate.directive';
import {RulesetAnalysisComponent} from './rulesets/ruleset-analysis/ruleset-analysis.component';
import {RulesetSampleComponent} from './rulesets/ruleset-sample/ruleset-sample.component';
import {RulesetExperimentComponent} from './rulesets/ruleset-experiment/ruleset-experiment.component';
import { FooterComponent } from './shared/footer/footer.component';
import {FormsModule} from '@angular/forms';
// import { ValidationSamplesComponent } from './validation/validation-samples/validation-samples.component';
// import { ValidationExperimentsComponent } from './validation/validation-experiments/validation-experiments.component';
// import { ValidationAnalysesComponent } from './validation/validation-analyses/validation-analyses.component';
import { UsdaBovineComponent } from './subprojects/usda-bovine/usda-bovine.component';
import { SheepatlasComponent } from './subprojects/sheepatlas/sheepatlas.component';
// import {FileUploadModule} from 'ng2-file-upload';
import { SubprojectComponent } from './subprojects/subproject.component';
// import {JwtModule} from '@auth0/angular-jwt';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableClientSideComponent } from './shared/table-client-side/table-client-side.component';
// import {LoginComponent} from './login/login.component';
import {FilesUploadComponent} from './files-upload/files-upload.component';
// import {UserService} from './services/user.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { OntologyImproverComponent } from './ontology-improver/ontology-improver.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OntologyDetailComponent } from './ontology-improver/ontology-detail/ontology-detail.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from '@angular/material/menu';
import { ApiDocsComponent } from './api-docs/api-docs.component';
import { QueryLanguageComponent } from './query-language/query-language.component';
import { TrackhubsSubmissionComponent } from './trackhubs-submission/trackhubs-submission.component';
import { BulkFilesUploaderComponent } from './bulk-files-uploader/bulk-files-uploader.component';
import { EurofaangInfoComponent } from './subprojects/subproject-detail/eurofaang-info/eurofaang-info.component';

// to delete
import { CustomTableBuilderComponent } from './custom-table-builder/custom-table-builder.component';
import { TableServerSideComponent } from './shared/table-server-side/table-server-side.component';

import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { NextflowSubmissionComponent } from './nextflow-submission/nextflow-submission.component';
// import { NgcCookieConsentModule } from 'ngx-cookieconsent';
// import { cookieConfig } from './app.component';
import { ProtocolAnalysisDetailsComponent } from './protocol-analysis/protocol-analysis-details/protocol-analysis-details.component';
import { EnsemblAnnotationComponent } from './shared/ensembl-annotation/ensembl-annotation.component';
import { LocalGenomeBrowserComponent } from './local-genome-browser/local-genome-browser.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GraphQLModule } from './graphql.module';
import { GraphqlComponent } from './graphql/graphql.component';
import { DisplayDataComponent } from './graphql/display-data/display-data.component';
import { IndexFiltersComponent } from './graphql/index-filters/index-filters.component';
import {ShortenTitlePipe} from './graphql/display-data/shorten-title.pipe';
import { SubscriptionDialogComponent } from './shared/subscription-dialog/subscription-dialog.component';
// import { OntologyImproverWorkshopComponent } from './ontology-improver-workshop/ontology-improver-workshop.component';
// import { OntologyDetailWorkshopComponent } from './ontology-improver-workshop/ontology-detail-workshop/ontology-detail-workshop.component';
import { KoosumComponent } from './koosum/koosum.component';

export function getToken(): string {
  return localStorage.getItem('jwt_token') || '';
}

export function updateToken(newToken: string): void {
  return localStorage.setItem('jwt_token', newToken);
}

export function removeToken(): void {
  return localStorage.removeItem('jwt_token');
}

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
    FilterComponent,
    ActiveFilterComponent,
    HomeComponent,
    OrganismComponent,
    SpecimenComponent,
    DatasetComponent,
    AnalysisComponent,
    ArticleComponent,
    HeaderComponent,
    FileDetailComponent,
    RobustLinkComponent,
    RelatedItemsComponent,
    OrganismDetailComponent,
    SpecimenDetailComponent,
    DatasetDetailComponent,
    AnalysisDetailComponent,
    ArticleDetailComponent,
    SubprojectDetailComponent,
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
    // IndeterminateDirective,
    FooterComponent,
    // ValidationSamplesComponent,
    // ValidationExperimentsComponent,
    // ValidationAnalysesComponent,
    UsdaBovineComponent,
    SheepatlasComponent,
    SubprojectComponent,
    TableClientSideComponent,
    // LoginComponent,
    FilesUploadComponent,
    OntologyImproverComponent,
    OntologyDetailComponent,
    ApiDocsComponent,
    QueryLanguageComponent,
    TrackhubsSubmissionComponent,
    BulkFilesUploaderComponent,
    EurofaangInfoComponent,

    // to delete
    CustomTableBuilderComponent,
    TableServerSideComponent,
    NextflowSubmissionComponent,
    ProtocolAnalysisDetailsComponent,
    EnsemblAnnotationComponent,
    LocalGenomeBrowserComponent,
    GraphqlComponent,
    DisplayDataComponent,
    IndexFiltersComponent,
    ShortenTitlePipe,
    SubscriptionDialogComponent,
    // OntologyImproverWorkshopComponent,
    // OntologyDetailWorkshopComponent,
    KoosumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgxPaginationModule,
    NgxSpinnerModule,
    // NgbDropdownModule,
    BrowserAnimationsModule,
    // ChartsModule,
    NgChartsModule,
    FormsModule,
    // FileUploadModule,
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
    MatFormFieldModule,
    MatMenuModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatBadgeModule,
    MatTreeModule,
    MatDividerModule,
    MatCheckboxModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: getToken,
    //     whitelistedDomains: ['api.aai.ebi.ac.uk'],
    //     blacklistedRoutes: ['https://api.aai.ebi.ac.uk/auth']
    //   }
    // }),
    // BsDropdownModule.forRoot(),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxSmartModalModule.forRoot(),
    // NgbModule,
    // NgcCookieConsentModule.forRoot(cookieConfig),
    GraphQLModule
  ],
  // entryComponents: [
  //   SubscriptionDialogComponent,
  // ],
  // providers: [ApiDataService, AggregationService, SlicePipe, UserService, ApiFiltersService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
