import { Component, OnInit } from '@angular/core';
import {OntologyService} from '../services/ontology.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-ontology-improver',
  templateUrl: './ontology-improver.component.html',
  styleUrls: ['./ontology-improver.component.css']
})
export class OntologyImproverComponent implements OnInit {
  hide: boolean;
  username: string;
  password: string;
  token: string;
  mode: string;
  ontologyTerms: string;
  searchResults;
  ontologyMatches;
  error: string;
  ontologyMatchTableHeaders = ['Ontology Type', 'Ontology Label', 'Ontology ID', 'Mapping Confidence', 'Source']
  ontologyColsToDisplay = ['term_type', 'ontology_label', 'ontology_id', 'mapping_confidence', 'source']
  colorStatus = {
    'green': 'Verified',
    'yellow': 'Needs Improvement',
    'blue': 'Awaiting assessment',
    'red': 'Not supported'
  }

  constructor(
    private ontologyService: OntologyService,
    private http: HttpClient) { }

  ngOnInit() {
    this.hide = true;
    this.token = 'dev';
    this.mode = 'input';
    this.ontologyTerms = '';
    this.searchResults = {};
    this.ontologyMatches = {};
  }

  login() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain',
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      }),
      responseType: 'text' as 'json'
    };
    this.http.get('https://explore.api.aai.ebi.ac.uk/auth', httpOptions)
    .subscribe(
      data => {
        console.log(data);
        this.error = null;
        this.token = data.toString();
      },
      err => {
        this.error = err;
        console.error(err);
      }
    );
  }

  logout() {
    this.token = null;
    this.username = null;
    this.password = null;
    this.ngOnInit();
  }

  searchTerms() {
    // const ontologyInput = this.ontologyTerms.split('\n').filter(n => n);
    // this.ontologyService.searchTerms(ontologyInput).subscribe(
    //   data => {
    //     console.log(data);
    //     this.searchResults = data;
    //     this.getOntologyMatches(searchResults.not_found);
    //   },
    //   error => {
    //     this.error = error;
    //   }
    // );

    // mock data
    this.searchResults = {
      'found': [
        {
          "term": "Sus scrofa",
          "term_type": "organism",
          "ontology_id": ["NCBITaxon_9823"],
          "mode": "green"
        },
        {
          "term": "Female",
          "term_type": "sex",
          "ontology_id": ["PATO_0000383"],
          "mode": "blue"
        },
        {
          "term": "Gallus gallus",
          "term_type": "organism",
          "ontology_id": ["NCBITaxon_9031"],
          "mode": "green"
        },
        {
          "term": "specimen from organism",
          "term_type": "material",
          "ontology_id": ["OBI_0001479"],
          "mode": "yellow"
        },
        {
          "term": "Sample",
          "term_type": "",
          "ontology_id": [],
          "mode": "red"
        }
      ],
      'not_found': ['white blood cells', 'Blood', 'Capra hircus']
    }
    this.getOntologyMatches(this.searchResults['not_found']);
    this.mode = 'validate';
  }

  getOntologyMatches(terms) {
    // this.ontologyService.fetchZoomaMatches(terms).subscribe(
    //   data => {
    //     this.ontologyMatches = data;
    //   },
    //   error => {
    //     this.error = error;
    //   }
    // );

    // mock data
    this.ontologyMatches = {
      "white blood cells": [],
      "Blood": [{
        "term_type": "celltype",
        "ontology_label": "blood",
        "ontology_id": ["UBERON_0000178"],
        "mapping_confidence": "GOOD",
        "source": "https://www.ebi.ac.uk/vg/faang"
      }, {
        "term_type": "celltype",
        "ontology_label": "blood",
        "ontology_id": ["BTO_0000089"],
        "mapping_confidence": "GOOD",
        "source": "https://www.ebi.ac.uk/vg/faang"
      }],
      "Capra hircus": [{
        "term_type": "organism",
        "ontology_label": "Capra hircus",
        "ontology_id": ["NCBITaxon_9925"],
        "mapping_confidence": "HIGH",
        "source": "https://www.ebi.ac.uk/vg/faang"
      }],
    };
  }

  provideOntology() {

  }

  submitTerms() {

  }

}
