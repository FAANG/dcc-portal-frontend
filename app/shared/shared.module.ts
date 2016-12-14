import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShareExampleComponent } from './components/share-example.component';

@NgModule({
  imports: [ CommonModule, RouterModule ],
  declarations: [ ShareExampleComponent ],
  exports: [ CommonModule, RouterModule, ShareExampleComponent ]
})
export class SharedModule { }
