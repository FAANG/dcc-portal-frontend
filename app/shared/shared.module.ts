import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiErrorComponent } from './components/api-error.component';

@NgModule({
  imports: [ CommonModule, RouterModule ],
  declarations: [ ApiErrorComponent ],
  exports: [ CommonModule, RouterModule, ApiErrorComponent ]
})
export class SharedModule { }
