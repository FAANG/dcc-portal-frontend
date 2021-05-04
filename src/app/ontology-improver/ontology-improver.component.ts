import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {OntologyService} from '../services/ontology.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-ontology-improver',
  templateUrl: './ontology-improver.component.html',
  styleUrls: ['./ontology-improver.component.css']
})
export class OntologyImproverComponent implements OnInit {
  @ViewChild('modalTemplate', { static: true }) public modalTemplate: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  summaryTableData: MatTableDataSource<any>;
  hide: boolean;
  username: string;
  password: string;
  token: string;
  mode: string;
  ontologyTerms: string;
  searchResults;
  ontologyMatches;
  ontologyMatchesOld;
  selectedTerm;
  error: string;
  dialogRef;
  ontologyMatchTableHeaders = ['Ontology Type', 'Ontology Label', 'Ontology ID', 'Mapping Confidence', 'Source']
  ontologyMatchColsToDisplay = ['term_type', 'ontology_label', 'ontology_id', 'mapping_confidence', 'source']

  constructor(
    private ontologyService: OntologyService,
    private http: HttpClient,
    public dialog: MatDialog,
    public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.hide = true;
    this.token = '';
    this.mode = 'input';
    this.ontologyTerms = '';
    this.searchResults = {};
    this.ontologyMatches = {};
    this.selectedTerm = {'key': '', 'index': 0};
    this.ontologyService.getOntologies().subscribe(
      data => {
        this.summaryTableData = new MatTableDataSource<any>(data);
        this.summaryTableData.paginator = this.paginator;
        this.summaryTableData.sort = this.sort;
      }
    );
    // for dev
    this.token = 'dev';
    // this.username = 'aksh';
    this.tabGroup.selectedIndex = 1;
    this.ontologyTerms = 'gut\nwhite blood cells\nspecimen';
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.summaryTableData.filter = filterValue.trim().toLowerCase();
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
        this.ontologyMatchesOld = JSON.parse(JSON.stringify(data));
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
    // mark current ontology as selected
    data['selected'] = true;
    let l = this.ontologyMatches[key].length;
    for (let i = 0; i < l; i += 1) {
      if (i != index) {
        // deselect other ontologies of that particular term
        this.ontologyMatches[key][i]['selected'] = false;
        // reset ontology_status of other ontologies
        this.ontologyMatches[key][i]['ontology_status'] = '';
      }
    }
    //open modal for validation
    this.openModal(data);
  }

  editValidation(key: string, index: number) {
    var data = this.ontologyMatches[key][index];
    this.selectedTerm.key = key;
    this.selectedTerm.index = index;
    this.openModal(data);
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
    // if user marked ontology as needing improvement and also suggested changes
    // set status as awaiting assesment
    if (data.ontology_status == 'Needs Improvement') {
      const ontologyOld = this.ontologyMatchesOld[this.selectedTerm.key][this.selectedTerm.index];
      if (data.term_type !== ontologyOld.term_type || 
          data.ontology_id !== ontologyOld.ontology_id ||
          data.ontology_label !== ontologyOld.ontology_label) {
        data.ontology_status = 'Awaiting Assessment';
      }
    }
    // If user had previously suggested changes to an ontology, but then marks it suitable
    // revert user changes to original values obtained from db/zooma
    if (data.ontology_status == 'Verified') {
      const ontologyOld = this.ontologyMatchesOld[this.selectedTerm.key][this.selectedTerm.index];
      if (data.term_type !== ontologyOld.term_type || 
         data.ontology_id !== ontologyOld.ontology_id ||
          data.ontology_label !== ontologyOld.ontology_label) {
        data = JSON.parse(JSON.stringify(ontologyOld));
        data['ontology_status'] = 'Verified';
        data['selected'] = true;
      }
    }
    // save validation on the ontology and refresh accordion
    // copying to another object and re-assigning is necessary to refresh the accordion on save
    let updatedOntologyMatches = JSON.parse(JSON.stringify(this.ontologyMatches));
    updatedOntologyMatches[this.selectedTerm.key][this.selectedTerm.index] = data;
    this.ontologyMatches = updatedOntologyMatches;
    // close modal
    this.closeModal();
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

  submitTerms() {
    var valid = true; // check if submission is valid
    // get selected and validated ontologies
    const validatedOntologies = [];
    for (const prop in this.ontologyMatches) {
      let l = this.ontologyMatches[prop].length;
      for (let index = 0; index < l; index += 1) {
        if (this.ontologyMatches[prop][index]['selected'])  {
          let ontology = {};
          let data = this.ontologyMatches[prop][index];
          // ontology should either be verified/flagged or a ontology being provided,
          // i.e. ontology status field should not be empty
          if (!data['ontology_status'] || data['ontology_status'].length == 0) {
            valid = false;
            this.openSnackbar('Please validate all ontologies', 'Dismiss');
            break;
          }
          // ontology label and type fields should not be empty
          else if (data['ontology_label'].length == 0 || !data['term_type'] || data['term_type'].length == 0){
            valid = false;
            this.openSnackbar('Ontology labels/types should not be empty', 'Dismiss');
            break;
          }
          ontology['ontology_term'] = data['ontology_label'];
          ontology['ontology_type'] = data['term_type'] ? data['term_type'] : '';
          ontology['ontology_id'] = data['ontology_id'] ? data['ontology_id'] : '';
          ontology['ontology_support'] = data['source'] ? data['source'] : 'Not yet supported';
          ontology['ontology_status'] = data['ontology_status'];
          validatedOntologies.push(ontology);
          break;
        }
      }
      if (!valid) {
        break;
      }
    }
    if (valid) {
      // ontologies should be selected for each of the terms
      if (validatedOntologies.length == Object.keys(this.ontologyMatches).length) {
        // submit to validate endpoint if valid request
        const request = {};
        request['user'] = this.username;
        request['ontologies'] = validatedOntologies;
        this.ontologyService.validateTerms(request).subscribe(
          data => {
            this.openSnackbar('Ontologies submitted successfully', 'View Summary');
          },
          error => {
            this.openSnackbar('Submission Failed!', 'Dismiss');
          }
        );
      } else {
        // if invalid request, show message
        this.openSnackbar('Please select ontology matches for all terms', 'Dismiss');
      }
    }
  }

  openSnackbar(message: string, action: string) {
    const snackBarRef = this.snackbar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    snackBarRef.afterDismissed().subscribe(result => {
      if (message == 'Ontologies submitted successfully') {
        this.ngOnInit();
        this.tabGroup.selectedIndex = 0;
      }
    });
  }

}
