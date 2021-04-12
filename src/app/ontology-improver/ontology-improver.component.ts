import { Component, OnInit } from '@angular/core';
import {OntologyService} from '../services/ontology.service';

@Component({
  selector: 'app-ontology-improver',
  templateUrl: './ontology-improver.component.html',
  styleUrls: ['./ontology-improver.component.css']
})
export class OntologyImproverComponent implements OnInit {
  ontologyTerms: string;
  error: string;
  ontologyMatches = {};
  ontologyMatchTableHeaders = ['Ontology Type', 'Ontology Label', 'Ontology ID', 'Mapping Confidence', 'Source']
  ontologyColsToDisplay = ['term_type', 'ontology_label', 'ontology_id', 'mapping_confidence', 'source']

  constructor(private ontologyService: OntologyService) { }

  ngOnInit() {
    
  }

  submitTerms() {
    const ontologyInput = this.ontologyTerms.split('\n').filter(n => n);
    this.ontologyService.submitOntologyTerms(ontologyInput).subscribe(
      data => {
        console.log(data);
        this.ontologyMatches = data;
      },
      error => {
        this.error = error;
      }
    );
  }

}
