import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';


import { SearchResultsComponent }  from './search-results.component';
import { SearchTemplateComponent } from './search-template.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ 
    SearchResultsComponent,
    SearchTemplateComponent
  ]
})
export class SearchModule { };