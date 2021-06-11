import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {OntologyService} from '../../services/ontology.service';

@Component({
  selector: 'app-ontology-detail',
  templateUrl: './ontology-detail.component.html',
  styleUrls: ['./ontology-detail.component.css']
})
export class OntologyDetailComponent implements OnInit {
  ontologyId: string;
  data;
  
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private ontologyService: OntologyService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.ontologyId = params['id'];
      this.titleService.setTitle(`${this.ontologyId} | Ontology`);
    });
    this.data = this.ontologyService.getOntologyById(this.ontologyId).subscribe(
      (data: any) => {
        this.data = data;
    });
  }

  getColour(ontology_support: string, ontology_status: string, opacity: number) {
    if (ontology_status == 'Verified') {
      if (ontology_support == 'https://www.ebi.ac.uk/vg/faang' || ontology_support == 'FAANG')
        return 'rgba(0, 255, 0, ' + opacity + ')';
      else
        return 'rgba(255, 255, 0, ' + opacity + ')';
    }
    else if (ontology_status == 'Awaiting Assessment')
      return 'rgba(0, 125, 255, ' + opacity + ')';
    else if (ontology_status == 'Needs Improvement')
      return 'rgba(255, 255, 0, ' + opacity + ')';
    else if (ontology_status == 'Not yet supported')
      return 'rgba(255, 0, 0, ' + opacity + ')';
    else
      return 'rgba(255, 255, 255, ' + opacity + ')';
  }

}
