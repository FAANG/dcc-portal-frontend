import { NgModule }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule }  from './core/core.module';
import { SharedModule }  from './shared/shared.module';
import { SpecimenModule } from './specimen/specimen.module';
import { OrganismModule } from './organism/organism.module';
import { SearchModule } from './search/search.module';

@NgModule({
  imports: [ BrowserModule, CoreModule, AppRoutingModule, SharedModule, SpecimenModule, OrganismModule, SearchModule ],
  declarations: [ AppComponent ],
  providers: [ Title ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }