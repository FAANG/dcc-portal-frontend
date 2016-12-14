import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule }  from './core/core.module';
import { SpecimenModule } from './specimen/specimen.module';
import { OrganismModule } from './organism/organism.module';

@NgModule({
  imports: [ BrowserModule, CoreModule, AppRoutingModule, SpecimenModule, OrganismModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
