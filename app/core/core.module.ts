import { NgModule, ModuleWithProviders, Optional, SkipSelf }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home.component';
import { DoSomethingService } from './services/do-something.service';

@NgModule({
  imports: [ SharedModule, CommonModule ],
  providers: [ DoSomethingService ],
  declarations: [ HomeComponent ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only')
    }
  }
}
