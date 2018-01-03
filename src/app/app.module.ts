import { NgModule }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
//import { BusyModule } from 'angular2-busy';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule }  from './core/core.module';
import { SharedModule }  from './shared/shared.module';
import { SpecimenModule } from './specimen/specimen.module';
import { OrganismModule } from './organism/organism.module';
import { FileModule } from './file/file.module';
import { DatasetModule } from './dataset/dataset.module';
import { SearchModule } from './search/search.module';

@NgModule({
  imports: [ BrowserModule, CoreModule, AppRoutingModule, SharedModule, 
  	SpecimenModule, OrganismModule, FileModule, DatasetModule, SearchModule ],
  declarations: [ AppComponent ],
  providers: [ Title ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
