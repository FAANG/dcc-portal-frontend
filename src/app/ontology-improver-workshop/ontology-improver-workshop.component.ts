import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {OntologyService} from '../services/ontology-workshop.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTabGroup} from '@angular/material/tabs';
import {Observable, Subscription} from 'rxjs';
import {TableServerSideComponent}  from '../shared/table-server-side/table-server-side.component';
import {AggregationService} from '../services/aggregation.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ApiDataService} from '../services/api-data.service';

@Component({
  selector: 'app-ontology-improver-workshop',
  templateUrl: './ontology-improver-workshop.component.html',
  styleUrls: ['./ontology-improver-workshop.component.css']
})
export class OntologyImproverWorkshopComponent implements OnInit, OnDestroy {
  @ViewChild('loginModalTemplate', { static: true }) public loginModalTemplate: TemplateRef<any>;
  @ViewChild('editModalTemplate', { static: true }) public editModalTemplate: TemplateRef<any>;
  @ViewChild('selectProjectModalTemplate', { static: true }) public selectProjectModalTemplate: TemplateRef<any>;
  @ViewChild('validateModalTemplate', { static: true }) public validateModalTemplate: TemplateRef<any>;
  @ViewChild('activityModalTemplate', { static: true }) public activityModalTemplate: TemplateRef<any>;
  @ViewChild('modalTemplate', { static: true }) public modalTemplate: TemplateRef<any>;
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  @ViewChild('ontologyTermTemplate', { static: true }) ontologyTermTemplate: TemplateRef<any>;
  @ViewChild('ontologyTypeTemplate', { static: true }) ontologyTypeTemplate: TemplateRef<any>;
  @ViewChild('ontologyProjectTemplate', { static: true }) ontologyProjectTemplate: TemplateRef<any>;
  @ViewChild('ontologyTagsTemplate', { static: true }) ontologyTagsTemplate: TemplateRef<any>;
  @ViewChild('ontologyVotesTemplate', { static: true }) ontologyVotesTemplate: TemplateRef<any>;
  @ViewChild('typeCountTemplate', { static: true }) typeCountTemplate: TemplateRef<any>;
  @ViewChild('activityTemplate', { static: true }) activityTemplate: TemplateRef<any>;
  @ViewChild('tableComp', { static: true }) tableServerComponent: TableServerSideComponent;
  public loadTableDataFunction: Function;
  hide: boolean;
  username: string;
  password: string;
  token: string;
  mode: string;
  ontologyTerms: string;
  searchResults;
  ontologyMatches;
  ontologyIdOptions;
  selectedTerm;
  selectedOntologyData;
  newTag = {'tags': null, 'synonyms': null};
  error: string;
  success: string;
  dialogRef;
  showSpinner: boolean;
  registerUser: boolean;
  aggrSubscription: Subscription;
  ontologyMatchTableHeaders = ['Ontology Type', 'Ontology Label', 'Ontology ID', 'Mapping Confidence', 'Source']
  ontologyMatchColsToDisplay = ['term_type', 'ontology_label', 'ontology_id', 'mapping_confidence', 'source']
  columnNames: string[] = ['Term', 'Type', 'Ontology ID', 'Project', 'Tags', 'Status'];
  displayFields: string[] = ['term', 'type', 'id', 'projects', 'tags', 'upvotes_count'];
  statsColumns: string[] = ['Project', 'Species', 'Ontology Type Counts', 'Activity']
  statsFields: string[] = ['project', 'species', 'type_counts', 'activity']
  templates: Object;
  filter_field: {};
  regForm: FormGroup;
  species;
  types;
  usageStats: Observable<any[]>;
  disableOntologyCreation: boolean;
  originalOntologyTerm: string;

  query = {
    'sort': ['key', 'asc'],
    '_source': [
      'key',
      'term',
      'type',
      'id',
      'support',
      'projects',
      'tags',
      'species',
      'synonyms',
      'summary',
      'upvotes_count',
      'downvotes_count',
      'status_activity'
    ],
    'search': ''
  };
  defaultSort = ['key', 'asc'];

  constructor(
    private dataService: ApiDataService,
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
    this.token = localStorage.getItem("token");
    this.username = localStorage.getItem("user");
    this.hide = true;
    this.disableOntologyCreation = false;
    this.mode = 'input';
    this.registerUser = false;
    this.ontologyTerms = '';
    this.searchResults = {};
    this.ontologyMatches = {};
    this.filter_field = {};
    this.selectedTerm = {'key': '', 'index': 0};
    this.showSpinner = false;
    this.createForm();

    this.templates = {
      'term': this.ontologyTermTemplate,
      'type': this.ontologyTypeTemplate,
      'projects': this.ontologyProjectTemplate,
      'tags': this.ontologyTagsTemplate,
      'type_counts': this.typeCountTemplate,
      'activity': this.activityTemplate,
      'upvotes_count': this.ontologyVotesTemplate
    };
    this.loadTableDataFunction = this.dataService.getAllOntologies.bind(this.dataService);
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
      this.query['filters'] = filters;
      this.filter_field = Object.assign({}, this.filter_field);
    });
    this.tableServerComponent.dataUpdate.subscribe((data) => {
      this.aggregationService.getAggregations(data.aggregations, 'ontology');
    });
    // setting urls params based on filters
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key] && data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      this.router.navigate(['ontology'], {queryParams: params});
    });
    // fetch usage statistics summary
    this.ontologyService.getUsageStatistics().subscribe((data) =>{
      this.usageStats = data;
    });
    // fetch FAANG species list for selection
    this.ontologyService.getSpecies().subscribe((res: any) => {
      this.species = res;
    });
    // fetch FAANG ontology types list for selection
    this.ontologyService.getTypes().subscribe((res: any) => {
      this.types = res;
    });
  }

  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
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
          localStorage.setItem("token", data);
          localStorage.setItem("user", this.username);
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
    this.token = '';
    this.username = null;
    localStorage.setItem("token", '');
    localStorage.setItem("user", '');
    this.password = null;
    this.error = null;
    this.tabGroup.selectedIndex = 0;
    this.ngOnInit();
  }

  startOntologyValidation(data, status) {
    this.dialogRef = this.dialog.open(this.selectProjectModalTemplate, {
      width: '50%',
      height: '40%',
      data: {
        'ontology': data,
        'project': null,
        'status': status
      }
    });
  }

  validateOntology(data, project, status) {
    if (status == 'Verified') {
      this.submitFeedback(data, project, status);
    } else {
      this.dialogRef.close();
      this.dialogRef = this.dialog.open(this.validateModalTemplate, {
        width: '50%',
        data: {
          'ontology': data,
          'project': project,
          'status': status
        }
      });
      this.originalOntologyTerm = Object.assign({}, data)
    }
  }

  submitFeedback(data, project, status) {
    if (status == 'Needs Improvement' && this.originalOntologyTerm['term'] == data['term'] ){
      this.dialogRef.close();
      this.openSnackbar('Please ensure that the downvoted term has been modified before submitting it', 'Dismiss');
      return;
    }
    this.dialogRef.close();
    this.openSnackbar('Saving feedback...', 'Dismiss');
    const requestBody = {
      'ontology': data,
      'user': this.username,
      'project': project,
      'status': status
    }
    this.ontologyService.validateTerms(requestBody).subscribe(
      data => {
        this.showSpinner = false;
        this.openSnackbar('Feeback submitted!', 'Dismiss');
        if (this.tabGroup.selectedIndex == 0) {
          // update ontology table
          setTimeout(() => {
            this.filter_field = Object.assign({}, this.filter_field);
          }, 1000);
        } else {
          // update existing terms table in ontology tool tab
          setTimeout(() => {
            this.searchResults.filter = Object.assign({}, this.searchResults.filter);
          }, 1000);
        }
        // update summary statistics
        this.ontologyService.getUsageStatistics().subscribe((data) =>{
          this.usageStats = data;
        });
      },
      error => {
        this.showSpinner = false;
        this.openSnackbar('Submission failed!', 'Dismiss');
      }
    );
  }

  displayStatusActivity(data) {
    this.dialogRef = this.dialog.open(this.activityModalTemplate, {
      width: '50%',
      data: data
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filter_field['search'] = [filterValue];
    this.filter_field = Object.assign({}, this.filter_field);
  }

  editOntology(data) {
    // get current ontology data
    this.selectedOntologyData = JSON.parse(JSON.stringify(data));
    this.dialogRef = this.dialog.open(this.editModalTemplate, {
      width: '50%',
      data: this.selectedOntologyData
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.selectedOntologyData = null;
      this.newTag = {'tags': null, 'synonyms': null};
    });
  }

  addNewTag(tag, prop) {
    if (tag.length) {
      let tagsList = this.selectedOntologyData[prop];
      tagsList = tagsList.filter(n => n);
      tagsList.push(tag);
      this.selectedOntologyData[prop] = tagsList;
      this.newTag[prop] = null;
    }
  }

  editTag(data, tag, prop) {
    this.newTag[prop] = tag;
    data[prop] = data[prop].filter(function(e) { return e !== tag });
  }

  removeTag(data, tag, prop) {
    data[prop] = data[prop].filter(function(e) { return e !== tag });
  }

  addTagToolTab(data, tag, prop) {
    if (tag.length) {
      if (data[prop]) {
        let tagsList = data[prop];
        tagsList = tagsList.filter(n => n);
        tagsList.push(tag);
        data[prop] = tagsList;
      } else {
        data[prop] = [tag];
      }
      this.newTag[prop] = null;
    }
  }

  submitEditedOntology(editedData) {
    let data = JSON.parse(JSON.stringify(editedData));
    const request = {};
    request['user'] = this.username;
    request['ontologies'] = [data];
    this.showSpinner = true;
    this.ontologyService.createUpdateOntologies(request).subscribe(
      data => {
        this.openSnackbar('Ontology updated!', 'Dismiss');
        this.showSpinner = false;
        this.closeModal();
        if (this.tabGroup.selectedIndex == 0) {
          // update ontology table
          setTimeout(() => {
            this.filter_field = Object.assign({}, this.filter_field);
          }, 1000);
        } else {
          // update existing terms table in ontology tool tab
          setTimeout(() => {
            this.searchResults.filter = Object.assign({}, this.searchResults.filter);
          }, 1000);
        }
        // update summary statistics
        this.ontologyService.getUsageStatistics().subscribe((data) =>{
          this.usageStats = data;
        });
      },
      error => {
        this.showSpinner = false;
        this.openSnackbar('Submission Failed!', 'Dismiss');
      }
    );
  }

  searchTerms() {
    const ontologyInput = this.ontologyTerms.split('\n').filter(n => n);
    if (ontologyInput.length) {
      this.ontologyService.searchTerms(ontologyInput).subscribe(
        data => {
          this.searchResults['found'] = data.map(ontology => ontology['term']);
          this.searchResults['filter'] = {
            'term': ontologyInput
          };
          this.searchResults['query'] = JSON.parse(JSON.stringify(this.query));
          this.searchResults['query']['filters'] = this.searchResults['filter'];
          let not_found = [];
          ontologyInput.forEach(term => {
            if (!this.searchResults['found'].includes(term)) {
              not_found.push(term);
            }
          });
          this.getOntologyMatches(not_found);
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
        for (const term in this.ontologyMatches) {
          let ontologyMatchesArr = this.ontologyMatches[term].length;
          for (let index = 0; index < ontologyMatchesArr; index += 1) {
            this.ontologyMatches[term][index]['selected'] = false;
            this.ontologyMatches[term][index]['term_type'] = this.ontologyMatches[term][index]['term_type'].split(', ');
            // fetch ontology details from OLS
            this.ontologyService.getDetailsFromOls(this.ontologyMatches[term][index]).subscribe(
              (res: any) => {
                this.disableOntologyCreation = false;
                this.ontologyMatches[term][index] = res;
              },
              (err: any) => {
                // handle OLS downtime here
                if (err.status == 500) {
                  this.disableOntologyCreation = true;
                  this.openSnackbar('The Ontology Lookup Service (OLS) is down. New ontologies cannot be created at the moment. Please try again later.', 'Dismiss');
                }
              });
          }
        }
      },
      error => {
        this.error = error;
      }
    );
  }

  addNewOntology(key: string, index: number) {
    var data;
    this.selectedTerm.key = key;
    // check if no matches found
    if (index == -1) {
      data = {'ontology_label': key};
      this.selectedTerm.index = 0;
      this.ontologyIdOptions = [];
    } else {
      data = JSON.parse(JSON.stringify(this.ontologyMatches[key][index]));
      this.selectedTerm.index = index;
      // set ontology id options
      this.ontologyIdOptions = data.ontology_id.split(', ');
    }
    data.ontology_id = data['ontology_id'] ? data['ontology_id'].split(', '): [];
    data.project = data['project'] ? data['project']: [];
    data.species = data['species'] ? data['species']: [];
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

  editNewOntology(key: string, index: number) {
    var data = JSON.parse(JSON.stringify(this.ontologyMatches[key][index]));
    this.selectedTerm.key = key;
    this.selectedTerm.index = index;
    // set ontology id options and open modal for edit
    if (data.ontology_id) {
      this.ontologyIdOptions = data.ontology_id.split(', ');
    }
    data.ontology_id = data['ontology_id'] ? data['ontology_id'].split(', '): [];
    data.project = data['project'] ? data['project']: [];
    data.species = data['species'] ? data['species']: [];
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
    // save validation on the ontology and refresh accordion
    // copying to another object and re-assigning is necessary to refresh the accordion on save
    let updatedOntologyMatches = JSON.parse(JSON.stringify(this.ontologyMatches));
    let updatedData = JSON.parse(JSON.stringify(data));
    updatedData.ontology_id = updatedData['ontology_id'].join(', ');
    updatedOntologyMatches[this.selectedTerm.key][this.selectedTerm.index] = updatedData;
    this.ontologyMatches = updatedOntologyMatches;
    // close modal
    this.closeModal();
  }

  submitTerms() {
    var valid = true; // check if submission is valid
    // get selected ontologies
    const validatedOntologies = [];
    for (const prop in this.ontologyMatches) {
      let l = this.ontologyMatches[prop].length;
      for (let index = 0; index < l; index += 1) {
        if (this.ontologyMatches[prop][index]['selected'])  {
          let ontology = {};
          let data = this.ontologyMatches[prop][index];
          if (data['ontology_label'].length == 0 || !data['term_type'] || data['term_type'].length == 0){
            valid = false;
            this.openSnackbar('Ontology labels/types should not be empty', 'Dismiss');
            break;
          }
          ontology['term'] = data['ontology_label'];
          ontology['type'] = data['term_type'] ? data['term_type'] : [];
          ontology['id'] = data['ontology_id'] ? data['ontology_id'] : '';
          ontology['key'] = ontology['term'] + '-' + ontology['id'];
          ontology['support'] = data['source'] ? data['source'] : '';
          ontology['projects'] = data['project'] ? data['project'] : [];
          ontology['species'] = data['species'] ? data['species'] : [];
          ontology['tags'] = data['tags'] ? data['tags'] : [];
          // save ontology details from OLS
          ontology['iri'] = data['iri'] ? data['iri'] : '';
          ontology['summary'] = data['summary'] ? data['summary'] : '';
          ontology['synonyms'] = data['synonyms'] ? data['synonyms'] : [];
          ontology['alternative_id'] = data['alternative_id'] ? data['alternative_id'] : [];
          ontology['database_cross_reference'] = data['database_cross_reference'] ? data['database_cross_reference'] : [];
          ontology['related_synonyms'] = data['related_synonyms'] ? data['related_synonyms'] : [];
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
        this.ontologyService.createUpdateOntologies(request).subscribe(
          data => {
            this.openSnackbar('Ontologies submitted successfully', 'View ontology table');
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