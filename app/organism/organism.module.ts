import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { OrganismDetailComponent }  from './organism-detail.component';
import { OrganismSpecimensComponent }  from './organism-specimens.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ 
    OrganismDetailComponent,
    OrganismSpecimensComponent
  ],
})
export class OrganismModule { };
