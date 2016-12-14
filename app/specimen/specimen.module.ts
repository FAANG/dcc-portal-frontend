import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SpecimenTableComponent }  from './specimen-table.component';
import { SpecimenDetailComponent }  from './specimen-detail.component';
import { SpecimenFilesComponent }  from './specimen-files.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ 
    SpecimenTableComponent,
    SpecimenDetailComponent,
    SpecimenFilesComponent
  ],
})
export class SpecimenModule { };
