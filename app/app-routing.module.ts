import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home.component';
import { SpecimenTableComponent } from './specimen/specimen-table.component';
import { SpecimenDetailComponent } from './specimen/specimen-detail.component';
import { SpecimenFilesComponent } from './specimen/specimen-files.component';
import { OrganismTableComponent } from './organism/organism-table.component';
import { OrganismDetailComponent } from './organism/organism-detail.component';
import { OrganismSpecimensComponent } from './organism/organism-specimens.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'specimen', component: SpecimenTableComponent},
  { path: 'specimen/:id', component: SpecimenDetailComponent},
  { path: 'organism', component: OrganismTableComponent},
  { path: 'organism/:id', component: OrganismDetailComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
