import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SpecimenDetailComponent }  from './specimen-detail.component';
import { SpecimenFilesComponent }  from './specimen-files.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ 
    SpecimenDetailComponent,
    SpecimenFilesComponent
  ],
})
export class SpecimenModule { };
