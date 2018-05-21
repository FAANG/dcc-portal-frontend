import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home.component';
import { HelpComponent } from './core/components/help.component';
import { PrivacyComponent } from './core/components/privacy.component';
import { TermsComponent } from './core/components/terms.component';
import { ApiComponent } from './core/components/api.component';
import { PageNotFoundComponent } from './core/components/page-not-found.component';
import { SpecimenTableComponent } from './specimen/specimen-table.component';
import { SpecimenDetailComponent } from './specimen/specimen-detail.component';
import { SpecimenFilesComponent } from './specimen/specimen-files.component';
import { OrganismTableComponent } from './organism/organism-table.component';
import { OrganismDetailComponent } from './organism/organism-detail.component';
import { OrganismSpecimensComponent } from './organism/organism-specimens.component';
import { SearchResultsComponent } from './search/search-results.component';
import { FileTableComponent } from './file/file-table.component';
import { FileDetailComponent } from './file/file-detail.component';
import { DatasetTableComponent } from './dataset/dataset-table.component';
import { DatasetDetailComponent } from './dataset/dataset-detail.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'help', component: HelpComponent},
  { path: 'help/api', component: ApiComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'specimen', component: SpecimenTableComponent},
  { path: 'specimen/:biosampleId', component: SpecimenDetailComponent},
  { path: 'organism', component: OrganismTableComponent},
  { path: 'organism/:biosampleId', component: OrganismDetailComponent},
  { path: 'dataset', component: DatasetTableComponent},
  { path: 'dataset/:accession', component: DatasetDetailComponent},
  { path: 'file', component: FileTableComponent},
  { path: 'file/:fileId', component: FileDetailComponent},
  { path: 'search', component: SearchResultsComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
