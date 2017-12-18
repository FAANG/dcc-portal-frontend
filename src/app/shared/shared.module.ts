import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BusyModule } from 'angular2-busy';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ApiErrorComponent } from './components/api-error.component';
import { ApiSlowResponseComponent } from './components/api-slow-response.component';
import { NavbarComponent } from './components/navbar.component';
import { FaangFilterComponent } from './components/faang-filter.component';
import { ActiveFiltersComponent } from './components/active-filters.component';
import { RobustLinkComponent } from './robust-link.component';
import { SortElementComponent } from './components/sort-element.component';
import { ExportComponent } from './components/export.component';

@NgModule({
  imports: [ CommonModule, RouterModule, FormsModule, BusyModule, BrowserAnimationsModule ],
  declarations: [ ApiErrorComponent, ApiSlowResponseComponent, NavbarComponent, FaangFilterComponent, ActiveFiltersComponent, RobustLinkComponent, SortElementComponent, ExportComponent ],
  exports: [ CommonModule, RouterModule, FormsModule, ApiErrorComponent, ApiSlowResponseComponent, NavbarComponent, FaangFilterComponent, ActiveFiltersComponent, RobustLinkComponent, SortElementComponent, ExportComponent ]
})
export class SharedModule { }
