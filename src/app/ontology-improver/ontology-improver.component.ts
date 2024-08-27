import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
  Inject,
  PLATFORM_ID,
  AfterViewInit
} from '@angular/core';
import {OntologyService} from '../services/ontology.service';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import {Subscription} from 'rxjs';
import {TableServerSideComponent} from '../shared/table-server-side/table-server-side.component';
import {AggregationService} from '../services/aggregation.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {Title} from '@angular/platform-browser';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ApiDataService} from '../services/api-data.service';
import {FilterStateService} from '../services/filter-state.service';
import {validation_ws_url} from '../shared/constants';
import {isPlatformBrowser, JsonPipe, KeyValuePipe} from '@angular/common';
import { MatBadge } from '@angular/material/badge';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { TableClientSideComponent } from '../shared/table-client-side/table-client-side.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef,
  MatRow } from '@angular/material/table';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActiveFilterComponent } from '../shared/active-filter/active-filter.component';
import { FilterComponent } from '../shared/filter/filter.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-ontology-improver',
  templateUrl: './ontology-improver.component.html',
  styleUrls: ['./ontology-improver.component.css'],
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [HeaderComponent, MatTabGroup, MatTab, FlexModule, MatButton, FilterComponent, ActiveFilterComponent, MatProgressSpinner,
    TableServerSideComponent, FormsModule, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatTable,
    MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow,
    TableClientSideComponent, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, MatIconButton, MatSuffix,
    MatIcon, ReactiveFormsModule, MatSelect, MatOption, CdkTextareaAutosize, RouterLink, MatBadge, JsonPipe, KeyValuePipe]
})
export class OntologyImproverComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('loginModalTemplate', {static: true}) public loginModalTemplate!: TemplateRef<any>;
  @ViewChild('editModalTemplate', {static: true}) public editModalTemplate!: TemplateRef<any>;
  @ViewChild('selectProjectModalTemplate', {static: true}) public selectProjectModalTemplate!: TemplateRef<any>;
  @ViewChild('validateModalTemplate', {static: true}) public validateModalTemplate!: TemplateRef<any>;
  @ViewChild('activityModalTemplate', {static: true}) public activityModalTemplate!: TemplateRef<any>;
  @ViewChild('modalTemplate', {static: true}) public modalTemplate!: TemplateRef<any>;
  @ViewChild('tabs', {static: true}) tabGroup!: MatTabGroup;
  @ViewChild('ontologyTermTemplate', {static: true}) ontologyTermTemplate!: TemplateRef<any>;
  @ViewChild('ontologyTypeTemplate', {static: true}) ontologyTypeTemplate!: TemplateRef<any>;
  @ViewChild('ontologyProjectTemplate', {static: true}) ontologyProjectTemplate!: TemplateRef<any>;
  @ViewChild('ontologyTagsTemplate', {static: true}) ontologyTagsTemplate!: TemplateRef<any>;
  @ViewChild('ontologyVotesTemplate', {static: true}) ontologyVotesTemplate!: TemplateRef<any>;
  @ViewChild('typeCountTemplate', {static: true}) typeCountTemplate!: TemplateRef<any>;
  @ViewChild('activityTemplate', {static: true}) activityTemplate!: TemplateRef<any>;
  @ViewChild('tableComp', {static: true}) tableServerComponent!: TableServerSideComponent;
  public loadTableDataFunction!: Function;
  hide = true;
  username = '';
  password = '';
  token: string | null = '';
  mode = '';
  ontologyTerms = '';
  searchResults: any;
  ontologyMatches: any;
  ontologyIdOptions: any;
  selectedTerm: any;
  selectedOntologyData: any;
  newTag = {'tags': null, 'synonyms': null};
  error = '';
  success = '';
  dialogRef: any;
  showSpinner = false;
  registerUser = false;
  aggrSubscription!: Subscription;
  ontologyMatchTableHeaders = ['Ontology Type', 'Ontology Label', 'Ontology ID', 'Mapping Confidence', 'Source'];
  ontologyMatchColsToDisplay = ['term_type', 'ontology_label', 'ontology_id', 'mapping_confidence', 'source'];
  columnNames: string[] = ['Term', 'Type', 'Ontology ID', 'Project', 'Tags', 'Status'];
  displayFields: string[] = ['term', 'type', 'id', 'projects', 'tags', 'upvotes_count'];
  statsColumns: string[] = ['Project', 'Species', 'Ontology Type Counts', 'Activity'];
  statsFields: string[] = ['project', 'species', 'type_counts', 'activity'];
  templates: {[index: string]: any} = {};
  filter_field: any;
  regForm!: FormGroup;
  species: any;
  types: any;
  usageStats: any; // Observable<any[]>;
  disableOntologyCreation = false;
  ontology_update_status = '';
  socket: any;
  userComments = '';
  panelOpenState = false;
  isBrowser = false;

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
    private filterStateService: FilterStateService,
    private ontologyService: OntologyService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private aggregationService: AggregationService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.titleService.setTitle('Ontology Improver');
    if (this.isBrowser) {
      this.token = sessionStorage.getItem('token');
      this.username = sessionStorage.getItem('user') || '';

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
      this.userComments = '';
      this.createForm();
      if (this.username) {
        this.setSocket();
      }

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
        this.filterStateService.resetFilter();
        this.loadInitialPageState(params);
      });

      this.tableServerComponent.dataUpdate.subscribe((data) => {
        this.aggregationService.getAggregations(data.aggregations, 'ontology');
      });

      this.aggrSubscription = this.filterStateService.updateUrlParams(this.query, ['ontology']);

      // fetch usage statistics summary
      this.ontologyService.getUsageStatistics().subscribe((data) => {
        this.usageStats = data;
      });

      this.species = ['Capra hircus', 'Equus caballus', 'Gallus gallus', 'Ovis aries', 'Salmo salar', 'Scophthalmus maximus', 'Sus scrofa',
        'Bubalus bubalis', 'Bos indicus', 'Dicentrarchus labrax', 'Sparus aurata', 'Oncorhynchus mykiss', 'Cyprinus carpio carpio',
        'Bos taurus'];
      this.types = ['cellType', 'organismPart', 'sex', 'developmentalStage', 'cultureType', 'breed', 'healthStatusAtCollection',
        'healthStatus', 'organism', 'species', 'material', 'organismpart', 'celltype'];
    }
  }


  ngAfterViewInit() {

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

  removeFilter() {
    this.filterStateService.resetFilter();
    this.filter_field = {};
    void this.router.navigate(['ontology'], {queryParams: {}, replaceUrl: true, skipLocationChange: false});
  }

  passwordValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPwd = group.get('confirmPwd')?.value;
    return password === confirmPwd ? null : {passwordsNotEqual: true};
  }

  createForm() {
    this.regForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPwd: ['', [Validators.required, this.validateAreEqual.bind(this)]],
      organisation: ['', Validators.required]
    }, {
      updateOn: 'blur',
    });
  }

  get pwd() {
    return this.regForm ? this.regForm.get('password')?.value : null;
  }

  get confirmPwd() {
    return this.regForm ? this.regForm.get('confirmPwd')?.value : null;
  }

  private validateAreEqual() {
    return this.pwd === this.confirmPwd ? null : {
      NotEqual: true
    };
  }

  login() {
    this.ontologyService.login(this.username, this.password).subscribe({
      next: data => {
        if (data) {
          this.token = data;
          sessionStorage.setItem('token', data);
          sessionStorage.setItem('user', this.username);
          this.closeModal();
        } else {
          this.error = 'Unable to login. Invalid credentials';
        }
      },
      error: error => {
        this.error = error;
      }
    });
  }

  register() {
    // check password match
    if (this.regForm.status === 'VALID') {
      const request = JSON.parse(JSON.stringify(this.regForm.value));
      delete request['confirmPwd'];
      request['password'] = btoa(request['password']);
      this.ontologyService.register(request).subscribe({
        next: data => {
          this.error = '';
          this.registerUser = false;
          this.closeModal();
          this.username = this.regForm.value.username;
          this.password = this.regForm.value.password;
          this.login();
        },
        error: error => {
          this.error = error;
        }
      });
    }
  }

  logout() {
    this.token = '';
    this.username = '';
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('user', '');
    this.password = '';
    this.error = '';
    this.tabGroup.selectedIndex = 0;
    this.ngOnInit();
  }

  startOntologyValidation(data: any, status: any) {
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

  validateOntology(data: any, project: any, status: string) {
    if (status === 'Verified') {
      this.submitFeedback(data, project, status, '');
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
    }
  }

  submitFeedback(data: any, project: any, status: string, userComments: string) {
    this.dialogRef.close();
    this.openSnackbar('Saving feedback...', 'Dismiss');
    const requestBody = {
      'ontology': data,
      'user': this.username,
      'project': project,
      'status': status,
      'user_comments': userComments
    };
    this.ontologyService.validateTerms(requestBody, this.username).subscribe({
      next: data => {
        this.showSpinner = false;
        this.openSnackbar('Feeback submitted!', 'Dismiss');
        this.ontology_update_status = '';
        if (this.tabGroup.selectedIndex === 0) {
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
        this.ontologyService.getUsageStatistics().subscribe((data) => {
          this.usageStats = data;
        });
      },
      error: error => {
        this.showSpinner = false;
        this.error = error;
        if (error.status === 409) {
          setTimeout(() => {
            this.openSnackbar(this.ontology_update_status, 'Dismiss');
          }, 1000);
        } else {
          this.openSnackbar('Submission failed!', 'Dismiss');
        }
      }
    });
    this.userComments = '';
  }

  displayStatusActivity(data: any) {
    this.dialogRef = this.dialog.open(this.activityModalTemplate, {
      width: '50%',
      data: data
    });
  }

  editOntology(data: any) {
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

  addNewTag(tag: any, prop: string | number) {
    if (tag.length) {
      let tagsList = this.selectedOntologyData[prop];
      tagsList = tagsList.filter((n: any) => n);
      tagsList.push(tag);
      this.selectedOntologyData[prop] = tagsList;
      this.newTag[prop] = null;
    }
  }

  editTag(data: { [x: string]: any[]; }, tag: any, prop: any) {
    this.newTag[prop] = tag;
    data[prop] = data[prop].filter(function (e: any) {
      return e !== tag;
    });
  }

  removeTag(data: { [x: string]: any[]; }, tag: any, prop: string | number) {
    data[prop] = data[prop].filter(function (e: any) {
      return e !== tag;
    });
  }

  addTagToolTab(data: { [x: string]: any[]; }, tag: any, prop: string | number) {
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

  submitEditedOntology(editedData: any) {
    const data = JSON.parse(JSON.stringify(editedData));
    const request = {};
    request['user'] = this.username;
    request['ontologies'] = [data];
    this.showSpinner = true;
    this.ontologyService.createUpdateOntologies(request).subscribe({
      next: data => {
        this.openSnackbar('Ontology updated!', 'Dismiss');
        this.showSpinner = false;
        this.closeModal();
        if (this.tabGroup.selectedIndex === 0) {
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
        this.ontologyService.getUsageStatistics().subscribe((data) => {
          this.usageStats = data;
        });
      },
      error: error => {
        this.showSpinner = false;
        this.openSnackbar('Submission Failed!', 'Dismiss');
      }
    });
  }

  searchTerms() {
    const ontologyInput = this.ontologyTerms.split('\n').filter(n => n);
    if (ontologyInput.length) {
      this.ontologyService.searchTerms(ontologyInput).subscribe({
        next: data => {
          this.searchResults['found'] = data.map((ontology: { [x: string]: any; }) => ontology['term']);
          this.searchResults['filter'] = {
            'term': ontologyInput
          };
          this.searchResults['query'] = JSON.parse(JSON.stringify(this.query));
          this.searchResults['query']['filters'] = this.searchResults['filter'];
          const not_found: any[] = [];
          ontologyInput.forEach(term => {
            if (!this.searchResults['found'].includes(term)) {
              not_found.push(term);
            }
          });
          this.getOntologyMatches(not_found);
        },
        error: error => {
          this.error = error;
        }
      });
      this.mode = 'validate';
    }
  }

  getOntologyMatches(terms: any) {
    this.ontologyService.fetchZoomaMatches(terms).subscribe({
      next: data => {
        this.ontologyMatches = data;
        for (const term in this.ontologyMatches) {
          if (this.ontologyMatches[term]) {
            const ontologyMatchesArr = this.ontologyMatches[term].length;
            for (let index = 0; index < ontologyMatchesArr; index += 1) {
              this.ontologyMatches[term][index]['selected'] = false;
              this.ontologyMatches[term][index]['term_type'] = this.ontologyMatches[term][index]['term_type'].split(', ');
              // fetch ontology details from OLS
              this.ontologyService.getDetailsFromOls(this.ontologyMatches[term][index]).subscribe({
                next: (res: any) => {
                  this.disableOntologyCreation = false;
                  this.ontologyMatches[term][index] = res;
                },
                error: (err: any) => {
                  // handle OLS downtime here
                  if (err.status === 500) {
                    this.disableOntologyCreation = true;
                    this.openSnackbar('The Ontology Lookup Service (OLS) is down. ' +
                      'New ontologies cannot be created at the moment. Please try again later.',
                      'Dismiss');
                  }
                }
              });
            }
          }
        }
      },
      error: error => {
        this.error = error;
      }
    });
  }

  addNewOntology(key: string, index: number) {
    let data: any;
    this.selectedTerm.key = key;
    // check if no matches found
    if (index === -1) {
      data = {'ontology_label': key};
      this.selectedTerm.index = 0;
      this.ontologyIdOptions = [];
    } else {
      data = JSON.parse(JSON.stringify(this.ontologyMatches[key][index]));
      this.selectedTerm.index = index;
      // set ontology id options
      this.ontologyIdOptions = data.ontology_id.split(', ');
    }
    data.ontology_id = data['ontology_id'] ? data['ontology_id'].split(', ') : [];
    data.project = data['project'] ? data['project'] : [];
    data.species = data['species'] ? data['species'] : [];
    // mark current ontology as selected
    data['selected'] = true;
    const l = this.ontologyMatches[key].length;
    for (let i = 0; i < l; i += 1) {
      if (i !== index) {
        // deselect other ontologies of that particular term
        this.ontologyMatches[key][i]['selected'] = false;
        // reset ontology_status of other ontologies
        this.ontologyMatches[key][i]['ontology_status'] = '';
      }
    }
    // open modal for validation
    this.openModal(data);
  }

  editNewOntology(key: string, index: number) {
    const data = JSON.parse(JSON.stringify(this.ontologyMatches[key][index]));
    this.selectedTerm.key = key;
    this.selectedTerm.index = index;
    // set ontology id options and open modal for edit
    if (data.ontology_id) {
      this.ontologyIdOptions = data.ontology_id.split(', ');
    }
    data.ontology_id = data['ontology_id'] ? data['ontology_id'].split(', ') : [];
    data.project = data['project'] ? data['project'] : [];
    data.species = data['species'] ? data['species'] : [];
    this.openModal(data);
  }

  openLoginModal() {
    this.dialogRef = this.dialog.open(this.loginModalTemplate, {
      width: '40%'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (!this.token) {
        this.username = '';
        this.password = '';
        this.error = '';
        this.success = '';
        this.tabGroup.selectedIndex = 0;
        this.registerUser = false;
        this.createForm();
      }
    });
  }

  openModal(selectedOntology: any) {
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

  saveModalData(data: any) {
    // save validation on the ontology and refresh accordion
    // copying to another object and re-assigning is necessary to refresh the accordion on save
    const updatedOntologyMatches = JSON.parse(JSON.stringify(this.ontologyMatches));
    const updatedData = JSON.parse(JSON.stringify(data));
    updatedData.ontology_id = updatedData['ontology_id'].join(', ');
    updatedOntologyMatches[this.selectedTerm.key][this.selectedTerm.index] = updatedData;
    this.ontologyMatches = updatedOntologyMatches;
    // close modal
    this.closeModal();
  }

  submitTerms() {
    let valid = true; // check if submission is valid
    // get selected ontologies
    const validatedOntologies: any[] = [];
    for (const prop in this.ontologyMatches) {
      if (this.ontologyMatches[prop]) {
        const l = this.ontologyMatches[prop].length;
        for (let index = 0; index < l; index += 1) {
          if (this.ontologyMatches[prop][index]['selected']) {
            const ontology = {};
            const data = this.ontologyMatches[prop][index];
            if (data['ontology_label'].length === 0 || !data['term_type'] || data['term_type'].length === 0) {
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
    }
    if (valid) {
      // ontologies should be selected for each of the terms
      if (validatedOntologies.length === Object.keys(this.ontologyMatches).length) {
        // submit to validate endpoint if valid request
        const request = {};
        request['user'] = this.username;
        request['ontologies'] = validatedOntologies;
        this.ontologyService.createUpdateOntologies(request).subscribe({
          next: data => {
            this.openSnackbar('Ontologies submitted successfully', 'View ontology table');
          },
          error: error => {
            this.openSnackbar('Submission Failed!', 'Dismiss');
          }
        });
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
      if (message === 'Ontologies submitted successfully') {
        this.ngOnInit();
        this.tabGroup.selectedIndex = 0;
      }
    });
  }

  tabClick(tab: any) {
    if (tab.index === 1 && !this.token) {
      this.openLoginModal();
    }
  }

  setSocket() {
    if (this.isBrowser) {
      const url = validation_ws_url + this.username + '/';
      this.socket = new WebSocket(url);
      this.socket.onopen = () => {
        console.log('WebSockets connection created.');
      };
      this.socket.onmessage = (event: { data: string; }) => {
        const data = JSON.parse(event.data)['response'];
        if (data['ontology_update_status']) {
          this.ontology_update_status = data['ontology_update_status'];
        }
      };
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.onopen(null);
      }
    }
  }

  generateStatusMsg(action: any) {
    if (action.status === 'Awaiting Assessment') {
      return `${action.user} created the ontology`;
    } else if (action.status.toLowerCase() === 'verified') {
      let msg = `${action.user} verified that the ontology is suitable`;
      if (action.project && action.project !== undefined && action.project.length > 0) {
        msg += ` for project(s) ${action.project.join(', ')}`;
      }
      return msg;
    } else if (action.status.toLowerCase() === 'needs improvement') {
      let msg = `${action.user} suggested improvements to the ontology`;
      if (action.project && action.project !== undefined && action.project.length > 0) {
        msg += ` for project(s) ${action.project.join(', ')}`;
      }
      return msg;
    }
    return '';
  }

  loadInitialPageState(params: { [x: string]: any; }) {
    const filters = this.filterStateService.setUpAggregationFilters(params);
    this.filter_field = filters;
    this.query['filters'] = filters;
    // load pre-search and pre-sorting
    if (params['searchTerm']) {
      this.query['search'] = params['searchTerm'];
    }
    if (params['sortTerm'] && params['sortDirection']) {
      this.query['sort'] = [params['sortTerm'], params['sortDirection']];
    }
  }

  onBadgeClick(item: { [x: string]: any; }, type: string) {
    const project = item['row']['project'];
    if (type === 'all') {
      void this.router.navigate(['ontology'], {
        queryParams: { projects: project },
        replaceUrl: true,
        skipLocationChange: false
      });
    } else if (type === 'validated') {
      void this.router.navigate(['ontology'], {
        queryParams: { projects: project, status_activity: 'Verified' },
        replaceUrl: true,
        skipLocationChange: false
      });
    } else if (type === 'downvoted') {
      void this.router.navigate(['ontology'], {
        queryParams: { projects: project, status_activity: 'Needs Improvement' },
        replaceUrl: true,
        skipLocationChange: false
      });
    }
    this.tabGroup.selectedIndex = 0;
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      if (typeof this.filter_field !== 'undefined') {
        this.filterStateService.resetFilter();
      }
      this.aggrSubscription.unsubscribe();
      if (this.socket) {
        this.socket.close();
      }
    }
  }


  getArrLength(arr: any) {
    if (Array.isArray(arr)) {
      return arr.length;
    }
    return null;
  }

  getItemValueArray(item: any) {
    if ('value' in item) {
      return item['value'];
    }
    return null;
  }

  getItemKey(item: any) {
    if ('key' in item) {
      return item['key'];
    }
    return null;
  }

}
