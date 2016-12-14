import { NgModule }      from '@angular/core';

import { SpecimenTableComponent }  from './specimen-table.component';
import { SpecimenDetailComponent }  from './specimen-detail.component';
import { SpecimenFilesComponent }  from './specimen-files.component';

@NgModule({
  declarations: [ 
    SpecimenTableComponent,
    SpecimenDetailComponent,
    SpecimenFilesComponent
  ],
})
export class SpecimenModule { };
