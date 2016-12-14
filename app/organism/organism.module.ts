import { NgModule }      from '@angular/core';

import { OrganismTableComponent }  from './organism-table.component';
import { OrganismDetailComponent }  from './organism-detail.component';
import { OrganismSpecimensComponent }  from './organism-specimens.component';

@NgModule({
  declarations: [ 
    OrganismTableComponent,  
    OrganismDetailComponent,
    OrganismSpecimensComponent
  ],
})
export class OrganismModule { };
