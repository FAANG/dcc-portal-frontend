import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {OntologyService} from '../services/ontology.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ontology-improver',
  templateUrl: './ontology-improver.component.html',
  styleUrls: ['./ontology-improver.component.css']
})
export class OntologyImproverComponent implements OnInit {
  @ViewChild('modalTemplate', { static: true }) public modalTemplate: TemplateRef<any>;
  hide: boolean;
  username: string;
  password: string;
  token: string;
  mode: string;
  ontologyTerms: string;
  searchResults;
  ontologyMatches;
  selectedTerm;
  error: string;
  dialogRef;
  ontologyMatchTableHeaders = ['Ontology Type', 'Ontology Label', 'Ontology ID', 'Mapping Confidence', 'Source']
  ontologyMatchColsToDisplay = ['term_type', 'ontology_label', 'ontology_id', 'mapping_confidence', 'source']

  constructor(
    private ontologyService: OntologyService,
    private http: HttpClient,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.hide = true;
    this.token = '';
    this.mode = 'login';
    this.ontologyTerms = '';
    this.searchResults = {};
    this.ontologyMatches = {};
    this.selectedTerm = {'key': '', 'index': 0};

    // for development
    // this.token = 'dev';
    // this.mode = 'input';
    // this.ontologyTerms = "Sus scrofa\nFemale\nGallus gallus\nspecimen from organism\nSample\nwhite blood cells\nblood\nCapra hircus\nasfgjdhuihkjkiuj";
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
        this.error = null;
        this.mode = 'input';
        this.token = data.toString();
      },
      err => {
        this.error = err;
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
    const ontologyInput = this.ontologyTerms.split('\n').filter(n => n);
    this.ontologyService.searchTerms(ontologyInput).subscribe(
      data => {
        this.searchResults = data;
        this.getOntologyMatches(this.searchResults.not_found);
      },
      error => {
        this.error = error;
      }
    );
    this.mode = 'validate';
  }

  getOntologyMatches(terms) {
    this.ontologyService.fetchZoomaMatches(terms).subscribe(
      data => {
        this.ontologyMatches = data;
        for (const prop in this.ontologyMatches) {
          let l = this.ontologyMatches[prop].length;
          for (let index = 0; index < l; index += 1) {
            this.ontologyMatches[prop][index]['selected'] = false;
          }
        }
      },
      error => {
        this.error = error;
      }
    );
  }

  startValidation(key: string, index: number) {
    var data;
    this.selectedTerm.key = key;
    // check if no matches found
    if (index == -1) {
      data = {'ontology_label': key, 'ontology_status': 'Not yet supported'};
      this.selectedTerm.index = 0;
    } else {
      data = this.ontologyMatches[key][index];
      this.selectedTerm.index = index;
    }
    // open modal only if the ontology was not already selected
    if (!data['selected']) {
      // mar current ontology as selected
      data['selected'] = true;
      // deselect other ontologies of that particular term
      let l = this.ontologyMatches[key].length;
      for (let i = 0; i < l; i += 1) {
        if (i != index) {
          this.ontologyMatches[key][i]['selected'] = false;
        }
      }
      //open modal for validation
      this.openModal(data);
    }
  }

  openModal(selectedOntology) {
    this.dialogRef = this.dialog.open(this.modalTemplate, {
      width: '40%',
      data: JSON.parse(JSON.stringify(selectedOntology)) // copy without reference
    });

    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  saveModalData(data) {
    // if user marked ontology as needing improvement and also suggested changes, set status as awaiting assesment
    if (data.ontology_status == 'Needs Improvement') {
      // TODO
    }
    // save validation on the ontology and refresh accordion
    // copying to another object and re-assigning is necessary to refresh the accordion on save
    let updatedOntologyMatches = JSON.parse(JSON.stringify(this.ontologyMatches));
    updatedOntologyMatches[this.selectedTerm.key][this.selectedTerm.index] = data;
    this.ontologyMatches = updatedOntologyMatches;
    // close modal
    this.closeModal();
  }

  getColour(ontology_support: string, ontology_status: string) {
    if (ontology_status == 'Verified') {
      if (ontology_support == 'https://www.ebi.ac.uk/vg/faang')
        return 'rgba(0, 255, 0, 0.3)';
      else
        return 'rgba(255, 255, 0, 0.3)';
    }
    else if (ontology_status == 'Awaiting Assessment')
      return 'rgba(0, 0, 255, 0.3)';
    else if (ontology_status == 'Needs Improvement')
      return 'rgba(255, 255, 0, 0.3)';
    else if (ontology_status == 'Not yet supported')
      return 'rgba(255, 0, 0, 0.3)';
    else
      return 'rgba(255, 255, 255, 1)';
  }

  submitTerms() {
    // get selected and validated ontologies
    const validatedOntologies = [];
    for (const prop in this.ontologyMatches) {
      let l = this.ontologyMatches[prop].length;
      for (let index = 0; index < l; index += 1) {
        if (this.ontologyMatches[prop][index]['selected'])  {
          let ontology = {};
          let data = this.ontologyMatches[prop][index];
          ontology['ontology_term'] = data['ontology_label'];
          ontology['ontology_type'] = data['term_type'] ? data['term_type'] : '';
          ontology['ontology_id'] = data['ontology_id'] ? data['ontology_id'] : '';
          ontology['ontology_support'] = data['source'] ? data['source'] : 'Not yet supported';
          ontology['ontology_status'] = data['ontology_status'];
          validatedOntologies.push(ontology);
          break;
        }
      }
    }
    // submit to validate endpoint
    const request = {};
    request['user'] = this.username;
    request['ontologies'] = validatedOntologies;
    this.ontologyService.validateTerms(request).subscribe(
      data => {
      },
      error => {
        this.error = error;
      }
    );
    // go to summary page
    this.mode = 'table';
  }

}
