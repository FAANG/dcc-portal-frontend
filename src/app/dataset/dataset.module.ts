import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DatasetTableComponent }  from './dataset-table.component';
import { DatasetDetailComponent }  from './dataset-detail.component';
import { DatasetRelatedTemplateComponent} from './dataset-related-template.component';
//import { RunFilesComponent }  from './run-files.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ 
    DatasetTableComponent,  
    DatasetDetailComponent,
    DatasetRelatedTemplateComponent
//    ,RunFilesComponent
  ]
})
export class DatasetModule { };
