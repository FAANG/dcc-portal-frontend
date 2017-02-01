import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SearchResultsComponent }  from './search-results.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ 
    SearchResultsComponent,
  ],
})
export class SearchModule { };