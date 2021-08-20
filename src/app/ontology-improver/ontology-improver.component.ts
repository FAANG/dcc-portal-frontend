import {Component, OnInit, ViewChild, TemplateRef, ViewChildren, QueryList, AfterViewInit} from '@angular/core';
import {OntologyService} from '../services/ontology.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTabGroup} from '@angular/material/tabs';
import {Observable, Subscription} from 'rxjs';
import {TableClientSideComponent}  from '../shared/table-client-side/table-client-side.component';
import {AggregationService} from '../services/aggregation.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ontology-improver',
  templateUrl: './ontology-improver.component.html',
  styleUrls: ['./ontology-improver.component.css']
})
export class OntologyImproverComponent implements OnInit, AfterViewInit {
  @ViewChild('loginModalTemplate', { static: true }) public loginModalTemplate: TemplateRef<any>;
  @ViewChild('editModalTemplate', { static: true }) public editModalTemplate: TemplateRef<any>;
  @ViewChild('modalTemplate', { static: true }) public modalTemplate: TemplateRef<any>;
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  @ViewChild('ontologyTermTemplate', { static: true }) ontologyTermTemplate: TemplateRef<any>;
  @ViewChild('ontologyStatusTemplate', { static: true }) ontologyStatusTemplate: TemplateRef<any>;
  @ViewChild('typeCountTemplate', { static: true }) typeCountTemplate: TemplateRef<any>;
  @ViewChild('statusCountTemplate', { static: true }) statusCountTemplate: TemplateRef<any>;
  @ViewChildren("tableComp") tableComponents: QueryList<TableClientSideComponent>;
  private tableClientComponent: TableClientSideComponent;
  summaryTableData: Observable<any[]>;
  hide: boolean;
  username: string;
  password: string;
  token: string;
  mode: string;
  ontologyTerms: string;
  searchResults;
  ontologyMatches;
  ontologyMatchesOld;
  ontologyIdOptions;
  selectedTerm;
  selectedOntologyData;
  newTag: string;
  error: string;
  success: string;
  dialogRef;
  showSpinner: boolean;
  fetchedAllRecords: boolean;
  registerUser: boolean;
  aggrSubscription: Subscription;
  ontologyMatchTableHeaders = ['Ontology Type', 'Ontology Label', 'Ontology ID', 'Mapping Confidence', 'Source']
  ontologyMatchColsToDisplay = ['term_type', 'ontology_label', 'ontology_id', 'mapping_confidence', 'source']
  columnNames: string[] = ['Term', 'Type', 'Ontology ID', 'Project', 'Tags', 'Status'];
  displayFields: string[] = ['ontology_term', 'ontology_type', 'ontology_id', 'project', 'tags', 'ontology_status'];
  column_widths: string[] = ["15%", "15%", "15%", "15%", "15%", "25%"];
  statsColumns: string[] = ['Project', 'Species', 'Ontology Type Counts', 'Status Counts']
  statsFields: string[] = ['project', 'species', 'ontology_type_count', 'status_count']
  templates: Object;
  filter_field: {};
  regForm: FormGroup;
  species: Array<string>;
  usageStats: Observable<any[]>;
  constructor(
    private ontologyService: OntologyService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private aggregationService: AggregationService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.titleService.setTitle('Ontology Improver');
    this.hide = true;
    this.fetchedAllRecords = false;
    this.mode = 'input';
    this.registerUser = false;
    this.ontologyTerms = '';
    this.searchResults = {};
    this.ontologyMatches = {};
    this.filter_field = {};
    this.selectedTerm = {'key': '', 'index': 0};
    this.templates = {
      'ontology_term': this.ontologyTermTemplate,
      'ontology_status': this.ontologyStatusTemplate,
      'ontology_type_count': this.typeCountTemplate,
      'status_count': this.statusCountTemplate
    };
    this.showSpinner = false;
    this.createForm();
    // getting filters from url
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.resetFilter();
      const filters = {};
      for (const key in params) {
        if (Array.isArray(params[key])) {
          filters[key] = params[key];
          for (const value of params[key]) {
            this.aggregationService.current_active_filters.push(value);
            this.aggregationService.active_filters[key].push(value);
          }
        } else {
          filters[key] = [params[key]];
          this.aggregationService.current_active_filters.push(params[key]);
          this.aggregationService.active_filters[key].push(params[key]);
        }
      }
      this.aggregationService.field.next(this.aggregationService.active_filters);
      this.filter_field = filters;
      this.filter_field = Object.assign({}, this.filter_field);
    });
    // fetch page 1 records only
    this.ontologyService.getOntologies(10).subscribe(
      data => {
        this.summaryTableData = data;
        // fetching all records and aggregations
        this.ontologyService.getOntologies().subscribe(
          data => {
            this.summaryTableData = data;
            this.aggregationService.getAggregations(data, 'ontology');
            this.fetchedAllRecords = true;
            this.species = this.getSpecies(data);
          }
        );
      }
    );
    // setting urls params based on filters
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key] && data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      if (Object.keys(params).length > 0) {
        this.router.navigate(['ontology'], {queryParams: params});
      }
    });
    // fetch usage statistics summary
    this.ontologyService.getUsageStatistics().subscribe((data) =>{
      this.usageStats = data;
      console.log(this.usageStats);
    });
  }

  ngAfterViewInit() {
    this.tableComponents.changes.subscribe((comps: QueryList <TableClientSideComponent>) => {
        this.tableClientComponent = comps.first;
        this.aggregationService.getAggregations(this.tableClientComponent.dataSource.filteredData, 'ontology');
    });
  }

  hasActiveFilters() {
    if (typeof this.filter_field === 'undefined') {
      return false;
    }
    for (const key of Object.keys(this.filter_field)) {
      if (key !== 'search' && this.filter_field[key].length !== 0) {
        return true;
      }
    }
    return false;
  }

  resetFilter() {
    for (const key of Object.keys(this.aggregationService.active_filters)) {
      this.aggregationService.active_filters[key] = [];
    }
    this.aggregationService.current_active_filters = [];
    this.filter_field = {};
  }

  removeFilter() {
    this.resetFilter();
    this.router.navigate(['ontology'], {queryParams: {}});
  }

  passwordValidator(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPwd = group.get('confirmPwd').value;
    return password === confirmPwd ? null : { passwordsNotEqual: true }      
  }

  createForm() {
    this.regForm = this.fb.group({
       username: ['', Validators.required ],
       first_name: ['', Validators.required ],
       last_name: [''],
       email: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required ],
       confirmPwd: ['', [Validators.required, this.validateAreEqual.bind(this)]],
       organisation: ['', Validators.required ]
    },{
      updateOn: 'blur', 
    });
  }

  get pwd() {
    return this.regForm ? this.regForm.get('password').value : null;
  }

  get confirmPwd() {
    return this.regForm ? this.regForm.get('confirmPwd').value : null;
  }

  private validateAreEqual() {
    return this.pwd == this.confirmPwd ? null : {
        NotEqual: true
    };
  }

  login() {
    this.ontologyService.login(this.username, this.password).subscribe(
      data => {
        if (data) {
          this.token = data;
          // readjust table column to show edit and verify icons
          this.column_widths = ["14%", "14%", "14%", "14%", "14%", "30%"];
          this.closeModal();
        } 
        else {
          this.error = "Unable to login. Invalid credentials";
        }
      },
      error => {
        this.error = error;
      }
    )
  }

  register() {
    // check password match
    if (this.regForm.status == 'VALID') {
      let request = JSON.parse(JSON.stringify(this.regForm.value));
      delete request['confirmPwd'];
      request['password'] = btoa(request['password']);
      this.ontologyService.register(request).subscribe(
        data => {
          this.error = null;
          this.registerUser = false;
          this.closeModal();
          this.username = this.regForm.value.username;
          this.password = this.regForm.value.password;
          this.login();
        },
        error => {
          this.error = error;
        }
      )
    }
  }

  logout() {
    this.token = null;
    this.username = null;
    this.password = null;
    this.error = null;
    this.tabGroup.selectedIndex = 0;
    this.ngOnInit();
  }

  getSpecies(records) {
    // get species ontology terms
    let species = records.map((record) => {
      if (record.ontology_type == 'species') {
        return record.ontology_term;
      }
    });
    // remove empty values
    species = species.filter(n => n);
    // remove duplicates
    species = species.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    });
    return species;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filter_field['search'] = [filterValue];
    this.filter_field = Object.assign({}, this.filter_field);
  }

  editOntology(data) {
    // get possible ontology ID options from ZOOMA
    this.ontologyIdOptions = [data['ontology_id']]; // initially has only currrent id
    this.ontologyService.fetchZoomaMatches([data['ontology_term']]).subscribe(
      res => {
        this.ontologyIdOptions = res[data['ontology_term']].map(match => match['ontology_id']);
      }
    );
    // get current ontology ID
    this.selectedOntologyData = JSON.parse(JSON.stringify(data));
    this.dialogRef = this.dialog.open(this.editModalTemplate, {
      width: '50%',
      data: this.selectedOntologyData
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.selectedOntologyData = null;
      this.ontologyIdOptions = null;
      this.newTag = null;
    });
  }

  addNewTag(tag) {
    if (tag.length) {
      let tagsList = this.selectedOntologyData.tags.split(', ');
      tagsList = tagsList.filter(n => n);
      tagsList.push(tag);
      this.selectedOntologyData.tags = tagsList.join(', ');
      this.newTag = null;
    }
  }

  removeTag(tagIndex) {
    let tagsList = this.selectedOntologyData.tags.split(', ');
    tagsList.splice(tagIndex, 1);
    this.selectedOntologyData.tags = tagsList.join(', ');
  }

  addTagToolTab(data, tag) {
    if (tag.length) {
      if (data.tags) {
        let tagsList = data.tags.split(', ');
        tagsList = tagsList.filter(n => n);
        tagsList.push(tag);
        data.tags = tagsList.join(', ');
      } else {
        data.tags = tag;
      }
      this.newTag = null;
    }
    return data;
  }

  removeTagToolsTab(data, tagIndex) {
    let tagsList = data.tags.split(', ');
    tagsList.splice(tagIndex, 1);
    data.tags = tagsList.join(', ');
    return data;
  }

  submitEditedOntology(data) {
    data['ontology_status'] = 'Awaiting Assessment';
    const request = {};
    request['user'] = this.username;
    request['ontologies'] = [data];
    this.showSpinner = true;
    this.ontologyService.validateTerms(request).subscribe(
      data => {
        this.showSpinner = false;
        this.closeModal();
        if (this.tabGroup.selectedIndex == 0) {
          // update summary table
          this.ontologyService.getOntologies().subscribe(
            data => {
              this.summaryTableData = data;
              this.filter_field = Object.assign({}, this.filter_field);
              this.aggregationService.getAggregations(data, 'ontology');
              this.species = this.getSpecies(data);
            }
          );
        } else {
          // update table in ontology tool tab
          const ontologyInput = this.ontologyTerms.split('\n').filter(n => n);
          this.ontologyService.searchTerms(ontologyInput).subscribe(
            data => {
              this.searchResults = data;
            }
          );
        }
      },
      error => {
        this.showSpinner = false;
        this.openSnackbar('Submission Failed!', 'Dismiss');
      }
    );
  }

  changeOntologyStatus(data, status){
    // TODO: disable for users who have already verified this ontology
    this.openSnackbar('Updating Ontology Status...', 'Dismiss');
    const request = {};
    request['user'] = this.username
    request['ontologies'] = [{
      'id': data['id'],
      'ontology_status': status
    }];
    this.ontologyService.validateTerms(request).subscribe(
      data => {
        if (this.tabGroup.selectedIndex == 0) {
          // update summary table
          this.ontologyService.getOntologies().subscribe(
            data => {
              this.summaryTableData = data;
              this.filter_field = Object.assign({}, this.filter_field);
              this.aggregationService.getAggregations(data, 'ontology');
              this.species = this.getSpecies(data);
              // show message
              this.openSnackbar('Ontology Status Updated', 'Dismiss');
            }
          );
        } else {
          // update table in ontology tool tab
          const ontologyInput = this.ontologyTerms.split('\n').filter(n => n);
          this.ontologyService.searchTerms(ontologyInput).subscribe(
            data => {
              this.searchResults = data;
              // show message
              this.openSnackbar('Ontology Status Updated', 'Dismiss');
            }
          );
        }
      },
      error => {
        this.openSnackbar('Ontology Status Update Failed!', 'Dismiss');
      }
    );
  }

  searchTerms() {
    const ontologyInput = this.ontologyTerms.split('\n').filter(n => n);
    if (ontologyInput.length) {
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
      this.ontologyIdOptions = [];
    } else {
      data = this.ontologyMatches[key][index];
      this.selectedTerm.index = index;
      // set ontology id options
      this.ontologyIdOptions = data.ontology_id.split(',');
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
    // set ontology id options and open modal for edit
    if (data.ontology_id) {
      this.ontologyIdOptions = data.ontology_id.split(',');
    }
    this.openModal(data);
  }

  openLoginModal() {
    this.dialogRef = this.dialog.open(this.loginModalTemplate, {
      width: '40%'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (!this.token) {
        this.username = null;
        this.password = null;
        this.error = null;
        this.success = null;
        this.tabGroup.selectedIndex = 0;
        this.registerUser = false;
        this.createForm();
      }
    });
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
          ontology['project'] = data['project'] ? data['project'] : '';
          ontology['species'] = data['species'] ? data['species'] : '';
          ontology['tags'] = data['tags'] ? data['tags'] : '';
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

  tabClick(tab) {
    if (tab.index == 1 && !this.token) {
      this.openLoginModal();
    }
  }

}
