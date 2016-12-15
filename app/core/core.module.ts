import { NgModule, ModuleWithProviders, Optional, SkipSelf }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home.component';

import { ApiSpecimenService }  from './services/api-specimen.service';
import { ApiOrganismService }  from './services/api-organism.service';
import { ApiFileService }  from './services/api-file.service';

@NgModule({
  imports: [ SharedModule, CommonModule, HttpModule ],
  providers: [ ApiSpecimenService, ApiOrganismService, ApiFileService ],
  declarations: [ HomeComponent ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only')
    }
  }
}
