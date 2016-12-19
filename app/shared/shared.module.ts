import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiErrorComponent } from './components/api-error.component';
import { ApiSlowResponseComponent } from './components/api-slow-response.component';

@NgModule({
  imports: [ CommonModule, RouterModule ],
  declarations: [ ApiErrorComponent, ApiSlowResponseComponent ],
  exports: [ CommonModule, RouterModule, ApiErrorComponent, ApiSlowResponseComponent ]
})
export class SharedModule { }
