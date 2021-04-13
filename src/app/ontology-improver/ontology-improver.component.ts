import { Component, OnInit } from '@angular/core';
import {OntologyService} from '../services/ontology.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-ontology-improver',
  templateUrl: './ontology-improver.component.html',
  styleUrls: ['./ontology-improver.component.css']
})
export class OntologyImproverComponent implements OnInit {
  ontologyTerms: string;
  error: string;
  ontologyMatches;
  username: string;
  password: string;
  token: string;
  hide: boolean;
  ontologyMatchTableHeaders = ['Ontology Type', 'Ontology Label', 'Ontology ID', 'Mapping Confidence', 'Source']
  ontologyColsToDisplay = ['term_type', 'ontology_label', 'ontology_id', 'mapping_confidence', 'source']

  constructor(
    private ontologyService: OntologyService,
    private http: HttpClient) { }

  ngOnInit() {
    this.hide = true;
    this.ontologyTerms = '';
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
    // this.ontologyMatches = {
    //   "sus scrofa": [{
    //     "term_type": "organism",
    //     "ontology_label": "Sus scrofa",
    //     "ontology_id": ["NCBITaxon_9823"],
    //     "mapping_confidence": "HIGH",
    //     "source": "https://www.ebi.ac.uk/vg/faang"
    //   }],
    //   "blood": [{
    //     "term_type": "celltype",
    //     "ontology_label": "blood",
    //     "ontology_id": ["UBERON_0000178"],
    //     "mapping_confidence": "GOOD",
    //     "source": "https://www.ebi.ac.uk/vg/faang"
    //   }, {
    //     "term_type": "celltype",
    //     "ontology_label": "blood",
    //     "ontology_id": ["BTO_0000089"],
    //     "mapping_confidence": "GOOD",
    //     "source": "https://www.ebi.ac.uk/vg/faang"
    //   }],
    //   "specimen from organism": [{
    //     "term_type": "material",
    //     "ontology_label": "specimen from organism",
    //     "ontology_id": ["OBI_0001479"],
    //     "mapping_confidence": "HIGH",
    //     "source": "https://www.ebi.ac.uk/vg/faang"
    //   }],
    //   "mus musculus": [{
    //     "term_type": "genus species",
    //     "ontology_label": "Mus musculus",
    //     "ontology_id": ["NCBITaxon_10090"],
    //     "mapping_confidence": "GOOD",
    //     "source": "https://www.ebi.ac.uk/about/collaborations/human-cell-atlas"
    //   }, {
    //     "term_type": "genus species",
    //     "ontology_label": "Mus musculus",
    //     "ontology_id": ["NCBITaxon_10090", "NCBITaxon_10091"],
    //     "mapping_confidence": "GOOD",
    //     "source": "https://www.ebi.ac.uk/about/collaborations/human-cell-atlas"
    //   }],
    //   "female": [{
    //     "term_type": "sex",
    //     "ontology_label": "female",
    //     "ontology_id": ["PATO_0000383"],
    //     "mapping_confidence": "HIGH",
    //     "source": "https://www.ebi.ac.uk/vg/faang"
    //   }],
    //   "organism specimen": [{
    //     "term_type": "material",
    //     "ontology_label": "specimen from organism",
    //     "ontology_id": ["OBI_0001479"],
    //     "mapping_confidence": "GOOD",
    //     "source": "https://www.ebi.ac.uk/vg/faang"
    //   }]
    // }
  }

}
