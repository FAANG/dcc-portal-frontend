import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiDataService} from '../../services/api-data.service';

@Component({
  selector: 'app-ontology-detail-workshop',
  templateUrl: './ontology-detail-workshop.component.html',
  styleUrls: ['./ontology-detail-workshop.component.css']
})
export class OntologyDetailWorkshopComponent implements OnInit {
  ontologyDbId: string;
  data;

  constructor(
    private dataService: ApiDataService,
    private route: ActivatedRoute,
    private titleService: Title,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.ontologyDbId = params['id'];
      this.titleService.setTitle('Ontology');
    });
    this.data = this.dataService.getOntologyById(this.ontologyDbId, 'ontologies_test').subscribe(
      (data: any) => {
        this.data = data;
        this.spinner.hide();
        this.titleService.setTitle(`${this.data.id} | Ontology`);
      });
  }

  generateStatusMsg(action) {
    if (action.status === 'Awaiting Assessment') {
      return `${action.user} created the ontology`
    } else if (action.status.toLowerCase() === 'verified') {
      return `${action.user} verified that the ontology is suitable`
    } else if (action.status.toLowerCase() === 'needs improvement') {
      let msg = `${action.user} suggested improvements to the ontology`
      if (action.project != undefined && action.project.length > 0) {
        msg += `for project(s) ${action.project.join(', ')}`
      }
      return msg
    }
  }

}
