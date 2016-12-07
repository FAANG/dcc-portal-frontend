import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareExampleComponent } from './components/share-example.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ShareExampleComponent ],
  exports: [ CommonModule, ShareExampleComponent ]
})
export class SharedModule { }
