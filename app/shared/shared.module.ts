import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiErrorComponent } from './components/api-error.component';
import { ApiSlowResponseComponent } from './components/api-slow-response.component';
import { NavbarComponent } from './components/navbar.component';
import { FaangFilterComponent } from './components/faang-filter.component';

@NgModule({
  imports: [ CommonModule, RouterModule ],
  declarations: [ ApiErrorComponent, ApiSlowResponseComponent, NavbarComponent, FaangFilterComponent ],
  exports: [ CommonModule, RouterModule, ApiErrorComponent, ApiSlowResponseComponent, NavbarComponent, FaangFilterComponent ]
})
export class SharedModule { }
