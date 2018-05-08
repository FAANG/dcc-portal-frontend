import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieLawModule } from 'angular2-cookie-law';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiErrorComponent } from './components/api-error.component';
import { ApiSlowResponseComponent } from './components/api-slow-response.component';
import { NavbarComponent } from './components/navbar.component';
import { FaangFilterComponent } from './components/faang-filter.component';
import { ActiveFiltersComponent } from './components/active-filters.component';
import { RobustLinkComponent } from './robust-link.component';
import { SortElementComponent } from './components/sort-element.component';
import { ExportComponent } from './components/export.component';
import { GdprComponent } from './components/gdpr.component';

@NgModule({
  imports: [ CommonModule, RouterModule, FormsModule, BrowserAnimationsModule, CookieLawModule ],
  declarations: [
    ApiErrorComponent, ApiSlowResponseComponent,
    NavbarComponent, FaangFilterComponent,
    ActiveFiltersComponent, RobustLinkComponent, SortElementComponent, ExportComponent, GdprComponent ],
  exports: [
    CommonModule, RouterModule, FormsModule,
    ApiErrorComponent, ApiSlowResponseComponent,
    NavbarComponent, FaangFilterComponent, ActiveFiltersComponent,
    RobustLinkComponent, SortElementComponent, ExportComponent, GdprComponent
  ]
})
export class SharedModule { }
