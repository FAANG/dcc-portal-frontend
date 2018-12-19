import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FileTableComponent} from './file-table/file-table.component';
import {HomeComponent} from './home/home.component';
import {OrganismComponent} from './organism/organism.component';
import {SpecimenComponent} from './specimen/specimen.component';
import {DatasetComponent} from './dataset/dataset.component';
import {SearchComponent} from './search/search.component';
import {HelpComponent} from './help/help.component';
import {FileDetailComponent} from './file-table/file-detail/file-detail.component';
import {OrganismDetailComponent} from './organism/organism-detail/organism-detail.component';
import {SpecimenDetailComponent} from './specimen/specimen-detail/specimen-detail.component';
import {DatasetDetailComponent} from './dataset/dataset-detail/dataset-detail.component';
import {ApiComponent} from './help/api/api.component';
import {ProtocolComponent} from './protocol/protocol.component';
import {ProtocolDetailComponent} from './protocol/protocol-detail/protocol-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'organism', component: OrganismComponent},
  {path: 'organism/:id', component: OrganismDetailComponent},
  {path: 'specimen', component: SpecimenComponent},
  {path: 'specimen/:id', component: SpecimenDetailComponent},
  {path: 'dataset', component: DatasetComponent},
  {path: 'dataset/:id', component: DatasetDetailComponent},
  {path: 'file', component: FileTableComponent},
  {path: 'file/:id', component: FileDetailComponent},
  {path: 'protocol', component: ProtocolComponent},
  {path: 'protocol/:id', component: ProtocolDetailComponent},
  {path: 'search', component: SearchComponent},
  {path: 'help', component: HelpComponent},
  {path: 'help/api', component: ApiComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
