import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OrganismComponent} from './organism/organism.component';
import {OrganismDetailComponent} from './organism/organism-detail/organism-detail.component';
import {SpecimenComponent} from './specimen/specimen.component';
import {SpecimenDetailComponent} from './specimen/specimen-detail/specimen-detail.component';
import {DatasetComponent} from './dataset/dataset.component';
import {DatasetDetailComponent} from './dataset/dataset-detail/dataset-detail.component';
import {FileComponent} from './file/file.component';
import {FileDetailComponent} from './file/file-detail/file-detail.component';
import {AnalysisComponent} from './analysis/analysis.component';
import {AnalysisDetailComponent} from './analysis/analysis-detail/analysis-detail.component';
import {ArticleComponent} from './article/article.component';
import {ArticleDetailComponent} from './article/article-detail/article-detail.component';
import {ProtocolSampleComponent} from './protocol-sample/protocol-sample.component';
import {ProtocolSampleDetailsComponent} from './protocol-sample/protocol-sample-details/protocol-sample-details.component';
import {ProtocolExperimentComponent} from './protocol-experiment/protocol-experiment.component';
import {ProtocolExperimentDetailsComponent} from './protocol-experiment/protocol-experiment-details/protocol-experiment-details.component';
import {ProtocolAnalysisComponent} from './protocol-analysis/protocol-analysis.component';
import {ProtocolAnalysisDetailsComponent} from './protocol-analysis/protocol-analysis-details/protocol-analysis-details.component';
import {OrganismsSummaryComponent} from './organisms-summary/organisms-summary.component';
import {SpecimensSummaryComponent} from './specimens-summary/specimens-summary.component';
import {DatasetsSummaryComponent} from './datasets-summary/datasets-summary.component';
import {FilesSummaryComponent} from './files-summary/files-summary.component';
import {RulesetAnalysisComponent} from './rulesets/ruleset-analysis/ruleset-analysis.component';
import {RulesetSampleComponent} from './rulesets/ruleset-sample/ruleset-sample.component';
import {RulesetExperimentComponent} from './rulesets/ruleset-experiment/ruleset-experiment.component';
import {ValidationSamplesComponent} from './validation/validation-samples/validation-samples.component';
import {ValidationExperimentsComponent} from './validation/validation-experiments/validation-experiments.component';
import {ValidationAnalysesComponent} from './validation/validation-analyses/validation-analyses.component';
import {SubprojectComponent} from './subprojects/subproject.component';
import { SubprojectDetailComponent } from './subprojects/subproject-detail/subproject-detail.component';
import {LoginComponent} from './login/login.component';
import {FilesUploadComponent} from './files-upload/files-upload.component';
import { OntologyImproverComponent } from './ontology-improver/ontology-improver.component';
import { OntologyDetailComponent } from './ontology-improver/ontology-detail/ontology-detail.component';
import { ApiDocsComponent } from './api-docs/api-docs.component';
import { TrackhubsSubmissionComponent } from './trackhubs-submission/trackhubs-submission.component';
import { NextflowSubmissionComponent } from './nextflow-submission/nextflow-submission.component';
import { LocalGenomeBrowserComponent } from './local-genome-browser/local-genome-browser.component';
import { GraphqlComponent } from './graphql/graphql.component';
import { GlobalSearchComponent } from './globalsearch/globalsearch.component';
import {NonExistingComponent} from './non-existing/non-existing.component';
import {ValidationBetaComponent} from './validation-beta/validation-beta.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'organism', component: OrganismComponent},
  {path: 'organism/:id', component: OrganismDetailComponent},
  {path: 'specimen', component: SpecimenComponent},
  {path: 'specimen/:id', component: SpecimenDetailComponent},
  {path: 'dataset', component: DatasetComponent},
  {path: 'dataset/:id', component: DatasetDetailComponent},
  {path: 'file', component: FileComponent},
  {path: 'file/:id', component: FileDetailComponent},
  {path: 'analysis', component: AnalysisComponent},
  {path: 'analysis/:id', component: AnalysisDetailComponent},
  {path: 'article', component: ArticleComponent},
  {path: 'article/:id', component: ArticleDetailComponent},
  {path: 'protocol/samples', component: ProtocolSampleComponent},
  {path: 'protocol/samples/:id', component: ProtocolSampleDetailsComponent},
  {path: 'protocol/experiments', component: ProtocolExperimentComponent},
  {path: 'protocol/experiments/:id', component: ProtocolExperimentDetailsComponent},
  {path: 'protocol/analysis', component: ProtocolAnalysisComponent},
  {path: 'protocol/analysis/:id', component: ProtocolAnalysisDetailsComponent},
  {path: 'summary', redirectTo: 'summary/organisms', pathMatch: 'full'},
  {path: 'summary/organisms', component: OrganismsSummaryComponent},
  {path: 'summary/specimens', component: SpecimensSummaryComponent},
  {path: 'summary/datasets', component: DatasetsSummaryComponent},
  {path: 'summary/files', component: FilesSummaryComponent},
  {path: 'ruleset/samples', component: RulesetSampleComponent},
  {path: 'ruleset/experiments', component: RulesetExperimentComponent},
  {path: 'ruleset/analyses', component: RulesetAnalysisComponent},
  {path: 'validation/samples', component: ValidationSamplesComponent},
  {path: 'validation/experiments', component: ValidationExperimentsComponent},
  {path: 'validation/analyses', component: ValidationAnalysesComponent},
  {path: 'projects', component: SubprojectComponent},
  {path: 'projects/:id', component: SubprojectDetailComponent},
  {path: 'login', component: LoginComponent},

  {path: 'upload_protocol', component: FilesUploadComponent},
  {path: 'ontology', component: OntologyImproverComponent},
  {path: 'ontology/:id', component: OntologyDetailComponent},

  {path: 'validation_beta', component: ValidationBetaComponent},


  {path: 'api', component: ApiDocsComponent},
  {path: 'trackhubs', component: TrackhubsSubmissionComponent},
  {path: 'nextflowSubmission', component: NextflowSubmissionComponent},
  {path: 'genome_browser', component: LocalGenomeBrowserComponent},
  {path: 'graphql', component: GraphqlComponent},
  {path: 'globalsearch', component: GlobalSearchComponent},
  {path: '404', component: NonExistingComponent},
  {path: '**', component: NonExistingComponent}
];
