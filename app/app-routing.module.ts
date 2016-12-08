import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home.component';
import { SpecimenDetailComponent } from './specimen/specimen-detail.component';
import { SpecimenFilesComponent } from './specimen/specimen-files.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'specimen', component: SpecimenDetailComponent},
  { path: 'specimen', component: SpecimenFilesComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
