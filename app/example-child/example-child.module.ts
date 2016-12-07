import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ExampleChildComponent }  from './example-child.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ ExampleChildComponent ],
})
export class ExampleChildModule { };
