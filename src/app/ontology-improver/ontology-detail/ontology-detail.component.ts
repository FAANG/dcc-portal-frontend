import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiDataService} from '../../services/api-data.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-ontology-detail',
  templateUrl: './ontology-detail.component.html',
  styleUrls: ['./ontology-detail.component.css'],
  standalone: true,
  imports: [HeaderComponent, FlexModule, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle,
    MatIconButton, MatIcon]
})
export class OntologyDetailComponent implements OnInit {
  ontologyDbId = '';
  data: any;

  constructor(
    private dataService: ApiDataService,
    private route: ActivatedRoute,
    private titleService: Title,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    void this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.ontologyDbId = params['id'];
      this.titleService.setTitle('Ontology');
    });
    this.data = this.dataService.getOntologyById(this.ontologyDbId, 'ontologies').subscribe(
      (data: any) => {
        this.data = data;
        void this.spinner.hide();
        this.titleService.setTitle(`${this.data.id} | Ontology`);
    });
  }

  generateStatusMsg(action: { status: string; user: any; project: any[] | undefined; }) {
    if (action.status === 'Awaiting Assessment') {
      return `${action.user} created the ontology`;
    } else if (action.status.toLowerCase() === 'verified') {
      return `${action.user} verified that the ontology is suitable`;
    } else if (action.status.toLowerCase() === 'needs improvement') {
      let msg = `${action.user} suggested improvements to the ontology`;
      if (action.project !== undefined && action.project.length > 0) {
        msg += `for project(s) ${action.project.join(', ')}`;
      }
      return msg;
    }
    return '';
  }

}
