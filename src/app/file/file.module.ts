import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { FileTableComponent }  from './file-table.component';
import { FileDetailComponent }  from './file-detail.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ 
    FileTableComponent,  
    FileDetailComponent
  ]
})
export class FileModule { };
