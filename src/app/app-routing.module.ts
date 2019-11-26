import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FileTableComponent} from './file-table/file-table.component';
import {HomeComponent} from './home/home.component';
import {OrganismComponent} from './organism/organism.component';
import {SpecimenComponent} from './specimen/specimen.component';
import {DatasetComponent} from './dataset/dataset.component';
import {AnalysisComponent} from './analysis/analysis.component';

import {SearchComponent} from './search/search.component';
import {HelpComponent} from './help/help.component';
import {FileDetailComponent} from './file-table/file-detail/file-detail.component';
import {OrganismDetailComponent} from './organism/organism-detail/organism-detail.component';
import {SpecimenDetailComponent} from './specimen/specimen-detail/specimen-detail.component';
import {DatasetDetailComponent} from './dataset/dataset-detail/dataset-detail.component';
import {AnalysisDetailComponent} from './analysis/analysis-detail/analysis-detail.component';

import {ApiComponent} from './help/api/api.component';
import {ProtocolSampleComponent} from './protocol-sample/protocol-sample.component';
import {ProtocolExperimentComponent} from './protocol-experiment/protocol-experiment.component';
import {ProtocolSampleDetailsComponent} from './protocol-sample/protocol-sample-details/protocol-sample-details.component';
import {ProtocolExperimentDetailsComponent} from './protocol-experiment/protocol-experiment-details/protocol-experiment-details.component';
import {OrganismsSummaryComponent} from './organisms-summary/organisms-summary.component';
import {SpecimensSummaryComponent} from './specimens-summary/specimens-summary.component';
import {DatasetsSummaryComponent} from './datasets-summary/datasets-summary.component';
import {FilesSummaryComponent} from './files-summary/files-summary.component';
import {ProtocolAnalysisComponent} from './protocol-analysis/protocol-analysis.component';
import {NonExistingComponent} from './non-existing/non-existing.component';
import {RulesetAnalysisComponent} from './rulesets/ruleset-analysis/ruleset-analysis.component';
import {RulesetSampleComponent} from './rulesets/ruleset-sample/ruleset-sample.component';
import {RulesetExperimentComponent} from './rulesets/ruleset-experiment/ruleset-experiment.component';
import {AquafaangComponent} from './subprojects/aquafaang/aquafaang.component';
import {BovregComponent} from './subprojects/bovreg/bovreg.component';
import {GeneSwitchComponent} from './subprojects/gene-switch/gene-switch.component';
import {UsdaBovineComponent} from './subprojects/usda-bovine/usda-bovine.component';
import {SheepatlasComponent} from './subprojects/sheepatlas/sheepatlas.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'organism', component: OrganismComponent},
  {path: 'organism/:id', component: OrganismDetailComponent},
  {path: 'specimen', component: SpecimenComponent},
  {path: 'specimen/:id', component: SpecimenDetailComponent},
  {path: 'dataset', component: DatasetComponent},
  {path: 'dataset/:id', component: DatasetDetailComponent},
  {path: 'file', component: FileTableComponent},
  {path: 'file/:id', component: FileDetailComponent},
  {path: 'analysis', component: AnalysisComponent},
  {path: 'analysis/:id', component: AnalysisDetailComponent},
  {path: 'protocol/samples', component: ProtocolSampleComponent},
  {path: 'protocol/samples/:id', component: ProtocolSampleDetailsComponent},
  {path: 'protocol/experiments', component: ProtocolExperimentComponent},
  {path: 'protocol/experiments/:id', component: ProtocolExperimentDetailsComponent},
  {path: 'protocol/analysis', component: ProtocolAnalysisComponent},
  {path: 'search', component: SearchComponent},
  {path: 'help', component: HelpComponent},
  {path: 'help/api', component: ApiComponent},
  {path: 'summary/organisms', component: OrganismsSummaryComponent},
  {path: 'summary/specimens', component: SpecimensSummaryComponent},
  {path: 'summary/datasets', component: DatasetsSummaryComponent},
  {path: 'summary/files', component: FilesSummaryComponent},
  {path: 'ruleset/samples', component: RulesetSampleComponent},
  {path: 'ruleset/experiments', component: RulesetExperimentComponent},
  {path: 'ruleset/analyses', component: RulesetAnalysisComponent},
  {path: 'projects/aquafaang', component: AquafaangComponent},
  {path: 'projects/bovreg', component: BovregComponent},
  {path: 'projects/gene-switch', component: GeneSwitchComponent},
  {path: 'projects/usda-bovine', component: UsdaBovineComponent},
  {path: 'projects/sheepatlas', component: SheepatlasComponent},
  {path: '404', component: NonExistingComponent},
  {path: '**', component: NonExistingComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
