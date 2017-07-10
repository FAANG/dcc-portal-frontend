import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found.component';
import { SpecimenTableComponent } from './specimen/specimen-table.component';
import { SpecimenDetailComponent } from './specimen/specimen-detail.component';
import { SpecimenFilesComponent } from './specimen/specimen-files.component';
import { OrganismTableComponent } from './organism/organism-table.component';
import { OrganismDetailComponent } from './organism/organism-detail.component';
import { OrganismSpecimensComponent } from './organism/organism-specimens.component';
import { SearchResultsComponent } from './search/search-results.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'specimen', component: SpecimenTableComponent},
  { path: 'specimen/:biosampleId', component: SpecimenDetailComponent},
  { path: 'organism', component: OrganismTableComponent},
  { path: 'organism/:biosampleId', component: OrganismDetailComponent},
  { path: 'search', component: SearchResultsComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
