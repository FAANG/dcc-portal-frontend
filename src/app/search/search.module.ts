import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';


import { SearchResultsComponent }  from './search-results.component';
import { SearchOrganismComponent } from './search-organism.component';
import { SearchSpecimenComponent } from './search-specimen.component';
import { SearchFileComponent } from './search-file.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ 
    SearchResultsComponent,
    SearchOrganismComponent,
    SearchSpecimenComponent,
    SearchFileComponent
  ]
})
export class SearchModule { };