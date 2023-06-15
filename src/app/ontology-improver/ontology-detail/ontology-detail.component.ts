import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiDataService} from '../../services/api-data.service';

@Component({
  selector: 'app-ontology-detail',
  templateUrl: './ontology-detail.component.html',
  styleUrls: ['./ontology-detail.component.css']
})
export class OntologyDetailComponent implements OnInit {
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
    this.data = this.dataService.getOntologyById(this.ontologyDbId).subscribe(
      (data: any) => {
        this.data = data;
        this.spinner.hide();
        this.titleService.setTitle(`${this.data.id} | Ontology`);
    });
  }

}
