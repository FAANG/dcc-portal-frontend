import { NgModule, ModuleWithProviders, Optional, SkipSelf }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home.component';
import { HelpComponent } from './components/help.component';
import { ApiComponent } from './components/api.component';
import { PageNotFoundComponent } from './components/page-not-found.component';

import { ApiSpecimenService }  from './services/api-specimen.service';
import { ApiOrganismService }  from './services/api-organism.service';
import { ApiFileService }  from './services/api-file.service';
import { ApiDatasetService }  from './services/api-dataset.service';
import { ApiTimeoutService }  from './services/api-timeout.service';
import { ApiErrorService }  from './services/api-error.service';

@NgModule({
  imports: [ SharedModule, CommonModule, HttpModule ],
  providers: [ ApiSpecimenService, ApiOrganismService, ApiFileService, ApiDatasetService, ApiTimeoutService, ApiErrorService ],
  declarations: [ HomeComponent, PageNotFoundComponent, HelpComponent, ApiComponent ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only')
    }
  }
}
