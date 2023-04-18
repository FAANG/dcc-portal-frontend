import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {OntologyService} from '../services/ontology.service';
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
  selector: 'app-ontology-improver',
  templateUrl: './ontology-improver.component.html',
  styleUrls: ['./ontology-improver.component.css']
})
export class OntologyImproverComponent implements OnInit {
  @ViewChild('loginModalTemplate', { static: true }) public loginModalTemplate: TemplateRef<any>;
  @ViewChild('editModalTemplate', { static: true }) public editModalTemplate: TemplateRef<any>;
  @ViewChild('modalTemplate', { static: true }) public modalTemplate: TemplateRef<any>;
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  @ViewChild('ontologyTermTemplate', { static: true }) ontologyTermTemplate: TemplateRef<any>;
  @ViewChild('ontologyTypeTemplate', { static: true }) ontologyTypeTemplate: TemplateRef<any>;
  @ViewChild('ontologyProjectTemplate', { static: true }) ontologyProjectTemplate: TemplateRef<any>;
  @ViewChild('ontologyTagsTemplate', { static: true }) ontologyTagsTemplate: TemplateRef<any>;
  @ViewChild('ontologyVotesTemplate', { static: true }) ontologyVotesTemplate: TemplateRef<any>;
  @ViewChild('ontologyStatusTemplate', { static: true }) ontologyStatusTemplate: TemplateRef<any>;
  @ViewChild('typeCountTemplate', { static: true }) typeCountTemplate: TemplateRef<any>;
  @ViewChild('statusCountTemplate', { static: true }) statusCountTemplate: TemplateRef<any>;
  @ViewChild('tableComp', { static: true }) tableServerComponent: TableServerSideComponent;
  public loadTableDataFunction: Function;
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
  newTag = {'ontology_type': null, 'tags': null, 'term_type': null};
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
  column_widths: string[] = ["15%", "15%", "15%", "15%", "15%", "25%"];
  statsColumns: string[] = ['Project', 'Species', 'Ontology Type Counts', 'Status Counts']
  statsFields: string[] = ['project', 'species', 'ontology_type_count', 'status_count']
  templates: Object;
  filter_field: {};
  regForm: FormGroup;
  species: Array<string>;
  usageStats: Observable<any[]>;
  data = {};

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
    this.hide = true;
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
      'ontology_status': this.ontologyStatusTemplate,
      'ontology_type_count': this.typeCountTemplate,
      'status_count': this.statusCountTemplate,
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
      if (record.ontology_type.split(', ').includes('species')) {
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
    this.ontologyIdOptions = data['ontology_id'].split(', '); // initially has only currrent id
    this.ontologyService.fetchZoomaMatches([data['ontology_term']]).subscribe(
      res => {
        let ontologyMatches = res[data['ontology_term']].map(match => match['ontology_id']);
        this.ontologyIdOptions = this.ontologyIdOptions.concat(ontologyMatches);
        this.ontologyIdOptions = Array.from(new Set(this.ontologyIdOptions));
        this.ontologyIdOptions = this.ontologyIdOptions.filter(n => n);
      }
    );
    // get current ontology data
    this.selectedOntologyData = JSON.parse(JSON.stringify(data));
    this.selectedOntologyData.project = this.selectedOntologyData.project.split(', ');
    this.selectedOntologyData.ontology_id = this.selectedOntologyData.ontology_id.split(', ');
    this.selectedOntologyData.species = this.selectedOntologyData.species.split(', ');
    this.dialogRef = this.dialog.open(this.editModalTemplate, {
      width: '50%',
      data: this.selectedOntologyData
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.selectedOntologyData = null;
      this.ontologyIdOptions = null;
      this.newTag = {'ontology_type': null, 'tags': null, 'term_type': null};
    });
  }

  addNewTag(tag, prop) {
    if (tag.length) {
      let tagsList = this.selectedOntologyData[prop].split(', ');
      tagsList = tagsList.filter(n => n);
      tagsList.push(tag);
      this.selectedOntologyData[prop] = tagsList.join(', ');
      this.newTag[prop] = null;
    }
  }

  removeTag(tagIndex, prop) {
    let tagsList = this.selectedOntologyData[prop].split(', ');
    tagsList.splice(tagIndex, 1);
    this.selectedOntologyData[prop] = tagsList.join(', ');
  }

  addTagToolTab(data, tag, prop) {
    if (tag.length) {
      if (data[prop]) {
        let tagsList = data[prop].split(', ');
        tagsList = tagsList.filter(n => n);
        tagsList.push(tag);
        data[prop] = tagsList.join(', ');
      } else {
        data[prop] = tag;
      }
      this.newTag[prop] = null;
    }
  }

  removeTagToolsTab(data, tagIndex, prop) {
    let tagsList = data[prop].split(', ');
    tagsList.splice(tagIndex, 1);
    data[prop] = tagsList.join(', ');
  }

  submitEditedOntology(editedData) {
    let data = JSON.parse(JSON.stringify(editedData));
    data['ontology_status'] = 'Awaiting Assessment';
    data['project'] = data['project'].join(', ');
    data['ontology_id'] = data['ontology_id'].join(', ');
    data['species'] = data['species'].join(', ');
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
      data = JSON.parse(JSON.stringify(this.ontologyMatches[key][index]));
      this.selectedTerm.index = index;
      // set ontology id options
      this.ontologyIdOptions = data.ontology_id.split(', ');
    }
    data.ontology_id = data['ontology_id'] ? data['ontology_id'].split(', '): [];
    data.project = data['project'] ? data['project'].split(', '): [];
    data.species = data['species'] ? data['species'].split(', '): [];
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
    var data = JSON.parse(JSON.stringify(this.ontologyMatches[key][index]));
    this.selectedTerm.key = key;
    this.selectedTerm.index = index;
    // set ontology id options and open modal for edit
    if (data.ontology_id) {
      this.ontologyIdOptions = data.ontology_id.split(', ');
    }
    data.ontology_id = data['ontology_id'] ? data['ontology_id'].split(', '): [];
    data.project = data['project'] ? data['project'].split(', '): [];
    data.species = data['species'] ? data['species'].split(', '): [];
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
        data.ontology_id = data['ontology_id'] ? data['ontology_id'].split(', '): [];
        data.project = data['project'] ? data['project'].split(', '): [];
        data.species = data['species'] ? data['species'].split(', '): [];
        data['ontology_status'] = 'Verified';
        data['selected'] = true;
      }
    }
    // save validation on the ontology and refresh accordion
    // copying to another object and re-assigning is necessary to refresh the accordion on save
    let updatedOntologyMatches = JSON.parse(JSON.stringify(this.ontologyMatches));
    let updatedData = JSON.parse(JSON.stringify(data));
    updatedData.ontology_id = updatedData['ontology_id'].join(', ');
    updatedData.project = updatedData['project'].join(', ');
    updatedData.species = updatedData['species'].join(', ');
    updatedOntologyMatches[this.selectedTerm.key][this.selectedTerm.index] = updatedData;
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
