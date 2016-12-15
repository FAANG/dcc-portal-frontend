import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { OrganismTableComponent }  from './organism-table.component';
import { OrganismDetailComponent }  from './organism-detail.component';
import { OrganismSpecimensComponent }  from './organism-specimens.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ 
    OrganismTableComponent,  
    OrganismDetailComponent,
    OrganismSpecimensComponent
  ],
})
export class OrganismModule { };
