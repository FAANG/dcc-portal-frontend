import {Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import {Title} from '@angular/platform-browser';
import { ApiDataService } from '../../services/api-data.service';
import { MatPaginator } from '@angular/material/paginator';
import {
  sample_biosample_update_template,
  sample_metadata_template_with_examples, sample_metadata_template_without_examples,
  validation_service_url,
  validation_service_url_download,
  validation_ws_url
} from '../../shared/constants';
import {makeid, replaceUnderscoreWithSpaceAndCapitalize} from '../../shared/common_functions';
import {UserForm} from '../webin_aap_user';
import {SubmissionDomain} from '../submission_domain';
import {UserService} from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow,
  MatRowDef, MatRow } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { ExtendedModule } from '@angular/flex-layout/extended';
import {NgClass, NgStyle, DatePipe, isPlatformBrowser} from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';
import { MatButton, MatIconButton } from '@angular/material/button';
import { HeaderComponent } from '../../shared/header/header.component';
import { NgxSmartModalService, NgxSmartModalModule } from 'ngx-smart-modal';

const UploadURL = validation_service_url + '/conversion/samples';

@Component({
  selector: 'app-validation-samples',
  templateUrl: './validation-samples.component.html',
  styleUrls: ['./validation-samples.component.css'],
  standalone: true,
  imports: [HeaderComponent, MatButton, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription,
    MatTabGroup, MatTab, FlexModule, RouterLink, FileUploadModule, MatRadioGroup, FormsModule, MatRadioButton, MatTooltip, NgClass,
    ExtendedModule, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgStyle, MatHeaderRowDef, MatHeaderRow,
    MatRowDef, MatRow, MatPaginator, MatIconButton, MatIcon, DatePipe, NgxSmartModalModule],
})
export class ValidationSamplesComponent implements OnInit, OnDestroy {
  @ViewChild('tabs', { static: true }) tabGroup!: MatTabGroup;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  subResults!: MatTableDataSource<any>;
  p = 1;
  model = new UserForm('', '', 'test');
  webin_link = 'https://www.ebi.ac.uk/ena/submit/webin/login';
  aap_link = 'https://explore.aai.ebi.ac.uk/registerUser';
  domain = new SubmissionDomain('', '');
  fileid = makeid(20);
  public uploader: FileUploader = new FileUploader({url: UploadURL, itemAlias: this.fileid});
  conversion_status = '';
  validation_status = '';
  submission_status = '';
  annotation_status = '';
  submission_message = '';
  gcp_subscription_status = '';
  domains = [];
  socket: any;
  validation_results: any;
  record_types: any[] = [];
  active_key = '';
  active_issue: any;
  active_table: any;
  active_column = '';
  active_issues: any;
  records_that_pass: any[] = [];
  records_with_issues: any[] = [];
  records_to_show: any;
  show_table = false;
  validation_started = false;
  conversion_task_id = '';
  validation_task_id = '';
  submission_task_id = '';
  metadata_template_with_examples = '';
  metadata_template_without_examples = '';
  biosample_update_template = '';
  errors: any[] = [];
  column_names: any[] = [];
  table_data: any[] = [];
  table_errors: any[] = [];
  table_warnings: any[] = [];
  disableAuthForm = false;
  disableDomainForm = true;
  disableChooseDomainForm = true;
  submissionStarted = false;
  disableSubmitButton = false;
  submissionResults: any[] = [];
  downloadData = false;
  bovreg_submission = false;
  private_submission = false;
  col_index: any[] = [];
  action: 'update'|'submission' = 'submission';
  tooltipUpdate = '';
  tooltipSubmission = '';
  currentDate!: Date;
  isBrowser = false;

  @ViewChild('myButton') myButton!: ElementRef<HTMLElement>;

  constructor(
    private titleService: Title,
    private apiDataService: ApiDataService,
    public _userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    public ngxSmartModalService: NgxSmartModalService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.currentDate = new Date;
    // check pubsub lite queue on GCP
    this.getPubSubMessage();

    this.tabGroup.selectedIndex = 0;
    this.dataSource = new MatTableDataSource<any[]>([]);
    this.subResults = new MatTableDataSource<any[]>([]);
    this.submission_message = 'Please login';
    this.titleService.setTitle('FAANG validation|Samples');
    this.setSocket();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBeforeUploadItem = (file) => {
      this.conversion_status = 'Waiting';
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.conversion_task_id = response;
      if (this.conversion_status === 'Success') {
        this.startValidation();
      }
    };
    this.metadata_template_with_examples = sample_metadata_template_with_examples;
    this.metadata_template_without_examples = sample_metadata_template_without_examples;
    this.biosample_update_template = sample_biosample_update_template;
    if (this._userService.token) {
      this.private_submission = true;
      this.submission_message = 'Choose submission server';
    }
    this.tooltipUpdate = '• This action will update the sample details with the provided metadata. \n' +
      '• Please ensure that each entry in the submitted spreadsheet contains the correct Biosample ID. \n' +
      '• The relationship columns (e.g \'Derived From\' column) should also contain the Biosample ID of the related sample. \n' +
      '• Note that in the UPDATE spreadsheet, the column \'Sample Name\' has been replaced with \'Biosample ID\'. See provided example for updates.';

    this.tooltipSubmission = 'This action will make a new sample submission to Biosample.';

  }

  setValidationResults() {
    if (this.validation_results) {
      for (const key of Object.keys(this.validation_results)) {
        this.record_types.push(key);
      }
      this.active_key = this.record_types[0];
      this.active_table = this.validation_results[this.active_key];
      this.setTables();
      this.onValidationResultsButtonClick('passed');
    }
  }

  setTables() {
    const table = this.active_table[0];
    this.column_names.push('Sample Name');
    if ('samples_core' in table) {
      this.parseColumnNames(table['samples_core']);
    }
    this.parseColumnNames(table);
    if ('teleostei_embryo' in table) {
      this.parseColumnNames(table['teleostei_embryo']);
    }
    if ('teleostei_post-hatching' in table) {
      this.parseColumnNames(table['teleostei_post-hatching']);
    }
    if ('custom' in table) {
      this.parseColumnNames(table['custom']);
    }
    for (const record of this.active_table) {
      let tmp: any[] = [];
      let tmp_errors: any[] = [];
      let tmp_warnings: any[] = [];
      const custom_col_name = this.action === 'update' ? 'biosample_id' : 'sample_name';
      tmp.push(record['custom'][custom_col_name]['value']);
      tmp_errors.push('valid');
      tmp_warnings.push('valid');
      if ('samples_core' in record) {
        const core_parsing_results = this.parseColumnData(record['samples_core']);
        tmp = tmp.concat(core_parsing_results['data']);
        tmp_errors = tmp_errors.concat(core_parsing_results['errors']);
        tmp_warnings = tmp_warnings.concat(core_parsing_results['warnings']);
      }
      const type_parsing_results = this.parseColumnData(record);
      tmp = tmp.concat(type_parsing_results['data']);
      tmp_errors = tmp_errors.concat(type_parsing_results['errors']);
      tmp_warnings = tmp_warnings.concat(type_parsing_results['warnings']);
      if ('teleostei_embryo' in record) {
        const module_parsing_results = this.parseColumnData(record['teleostei_embryo']);
        tmp = tmp.concat(module_parsing_results['data']);
        tmp_errors = tmp_errors.concat(module_parsing_results['errors']);
        tmp_warnings = tmp_warnings.concat(module_parsing_results['warnings']);
      }
      if ('teleostei_post-hatching' in record) {
        const module_parsing_results = this.parseColumnData(record['teleostei_post-hatching']);
        tmp = tmp.concat(module_parsing_results['data']);
        tmp_errors = tmp_errors.concat(module_parsing_results['errors']);
        tmp_warnings = tmp_warnings.concat(module_parsing_results['warnings']);
      }
      if ('custom' in record) {
        const custom_parsing_results = this.parseColumnData(record['custom']);
        tmp = tmp.concat(custom_parsing_results['data']);
        tmp_errors = tmp_errors.concat(custom_parsing_results['errors']);
        tmp_warnings = tmp_warnings.concat(custom_parsing_results['warnings']);
      }
      const error_indices = tmp_errors.map((e, i) => e === 'valid' ? i : '').filter(String);
      const warning_indices = tmp_warnings.map((e, i) => e === 'valid' ? i : '').filter(String);
      if (error_indices.length !== tmp.length || warning_indices.length !== tmp.length) {
        this.records_with_issues.push(tmp);
        this.table_errors.push(tmp_errors);
        this.table_warnings.push(tmp_warnings);
      } else {
        this.records_that_pass.push(tmp);
      }
    }
  }

  getPubSubMessage() {
    this.apiDataService.get_pubsub_messages().subscribe({
      next: data => {
        this.gcp_subscription_status = data[0]['biosampleStatus'];
      },
      error: error => {
        console.log(error);
      }
    });
  }

  setSocket() {
    if (this.isBrowser) {
      const url = validation_ws_url + this.fileid + '/';
      this.socket = new WebSocket(url);
      this.socket.onopen = () => {
        console.log('WebSockets connection created.');
      };
      this.socket.onmessage = (event: { data: string; }) => {
        const data = JSON.parse(event.data)['response'];
        console.log(data);
        if (data['conversion_status']) {
          this.conversion_status = data['conversion_status'];
        }
        if (data['domains']) {
          if (data['domains'].length !== 0) {
            this.domains = data['domains'];
            this.disableChooseDomainForm = false;
            this.domain.name = this.domains[this.domains.length - 1];
          } else {
            this.disableDomainForm = false;
          }
        }
        if (data['submission_results']) {
          this.submissionResults = Object.entries(data['submission_results']);
          if (this.submissionResults.length !== 0) {
            const data: any[] = [];
            this.submissionResults.forEach(record => {
              const rowObj = {};
              const cols = ['Sample Name', 'BioSample ID'];
              for (const index in cols) {
                if (cols[index]) {
                  rowObj[cols[index]] = record[index];
                }
              }
              data.push(rowObj);
            });
            this.subResults.data = data;
            this.triggerFalseClick();
          }
        }
        if (data['submission_message']) {
          this.submission_message = data['submission_message'];
        }
        if (data['validation_status']) {
          this.validation_status = data['validation_status'];
        }
        if (data['submission_status']) {
          this.submission_status = data['submission_status'];
        }
        if (data['errors']) {
          this.errors.push(data['errors']);
        }
        if (data['annotation_status']) {
          this.annotation_status = data['annotation_status'];
        }
        if (data['table_data']) {
          this.validation_results = data['table_data'];
          this.setValidationResults();
        }
        if (data['bovreg_submission']) {
          this.bovreg_submission = true;
        }
      };

      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.onopen(null);
      }
    }
  }

  parseColumnNames(data: any) {
    for (const name of Object.keys(data)) {
      if (Array.isArray(data[name])) {
        for (const record of data[name]) {
          const tmp = {};
          tmp[name] = record;
          this.parseColumnNames(tmp);
        }
      } else {
        const custom_col_name = this.action === 'update' ? 'biosample_id' : 'sample_name';
        if (name !== 'samples_core' && name !== 'custom' && name !== custom_col_name && name !== 'teleostei_embryo' &&
          name !== 'teleostei_post-hatching') {
          this.column_names.push(replaceUnderscoreWithSpaceAndCapitalize(name));
          if (data[name].hasOwnProperty('term')) {
            this.column_names.push('Term Source ID');
          }
          if (data[name].hasOwnProperty('units')) {
            this.column_names.push('Unit');
          }
        }
      }
    }
  }

  parseColumnData(data: any) {
    let data_to_return: any[] = [];
    let errors_to_return: any[] = [];
    let warnings_to_return: any[] = [];
    for (const name of Object.keys(data)) {
      if (Array.isArray(data[name])) {
        for (const record of data[name]) {
          const tmp = {};
          tmp[name] = record;
          const array_results = this.parseColumnData(tmp);
          data_to_return = data_to_return.concat(array_results['data']);
          errors_to_return = errors_to_return.concat(array_results['errors']);
          warnings_to_return = warnings_to_return.concat(array_results['warnings']);
        }
      } else {
        const custom_col_name = this.action === 'update' ? 'biosample_id' : 'sample_name';
        if (name !== 'samples_core' && name !== 'custom' && name !== custom_col_name && name !== 'teleostei_embryo' &&
          name !== 'teleostei_post-hatching') {
          if (data[name].hasOwnProperty('text')) {
            data_to_return.push(data[name]['text']);
            errors_to_return.push(this.dataHasErrors(data[name], 'errors'));
            warnings_to_return.push(this.dataHasErrors(data[name], 'warnings'));
          } else if (data[name].hasOwnProperty('value')) {
            data_to_return.push(data[name]['value']);
            errors_to_return.push(this.dataHasErrors(data[name], 'errors'));
            warnings_to_return.push(this.dataHasErrors(data[name], 'warnings'));
          }
          if (data[name].hasOwnProperty('term')) {
            data_to_return.push(data[name]['term']);
            errors_to_return.push(this.dataHasErrors(data[name], 'errors'));
            warnings_to_return.push(this.dataHasErrors(data[name], 'warnings'));
          } else if (data[name].hasOwnProperty('units')) {
            data_to_return.push(data[name]['units']);
            errors_to_return.push(this.dataHasErrors(data[name], 'errors'));
            warnings_to_return.push(this.dataHasErrors(data[name], 'warnings'));
          }
        }
      }
    }
    return {
      data: data_to_return,
      errors: errors_to_return,
      warnings: warnings_to_return
    };
  }

  dataHasErrors(data: any, issue_type: string) {
    if (data.hasOwnProperty(issue_type)) {
      return data[issue_type];
    } else {
      return 'valid';
    }
  }

  remove_underscores(record: string) {
    return record.replace(/[_]/g, ' ');
  }

  getCellClass(i: number, j: number) {
    if (this.active_issue === 'issues' && this.table_errors[i][j] !== 'valid') {
      return 'table-danger';
    } else if (this.active_issue === 'issues' && this.table_warnings[i][j] !== 'valid') {
      return 'table-warning';
    }
    return '';
  }

  getCellStyle(i: number, j: number) {
    if (this.active_issue === 'issues' && this.table_errors[i][j] !== 'valid') {
      return 'pointer';
    } else if (this.active_issue === 'issues' && this.table_warnings[i][j] !== 'valid') {
      return 'pointer';
    } else {
      return 'auto';
    }
  }

  onRecordButtonClick(tab: any) {
    this.active_key = tab['tab']['textLabel'].replace(/[ ]/g, '_');
    this.active_table = this.validation_results[this.active_key];
    this.records_with_issues = [];
    this.records_that_pass = [];
    this.column_names = [];
    this.table_data = [];
    this.table_errors = [];
    this.table_warnings = [];
    this.show_table = false;
    this.setTables();
    this.onValidationResultsButtonClick('passed');
  }

  onValidationResultsButtonClick(issues_type: string) {
    this.show_table = true;
    this.active_issue = issues_type;
    issues_type === 'passed' ? this.records_to_show = this.records_that_pass : this.records_to_show = this.records_with_issues;
    const data: any[] = [];
    this.records_to_show.forEach((record: { [x: string]: any; }) => {
      const rowObj: {[index: string]: any} = {};
      for (const index in this.column_names) {
        if (index) {
          rowObj[index] = record[index];
        }
      }
      data.push(rowObj);
    });
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.col_index = Array.from(this.column_names.keys()).map(col => col.toString());
  }

  openModal(i: number, j: number) {
    if (this.active_issue === 'issues') {
      this.active_column = this.column_names[j];
      const errors = this.table_errors[i][j];
      const warnings = this.table_warnings[i][j];
      if (errors !== 'valid' && warnings !== 'valid') {
        this.active_issues = errors;
        this.active_issues =  this.active_issues.concat(warnings);
        this.ngxSmartModalService.getModal('myModal').open();
      } else if (errors !== 'valid') {
        this.active_issues = errors;
        this.ngxSmartModalService.getModal('myModal').open();
      } else if (warnings !== 'valid') {
        this.active_issues = warnings;
        this.ngxSmartModalService.getModal('myModal').open();
      }
    }
  }

  statusClass(status: string) {
    if (status === 'Undefined' || status === 'Finished') {
      return 'badge badge-pill badge-info';
    } else if (status === 'Waiting' || status === 'Preparing data') {
      return 'badge badge-pill badge-warning';
    } else if (status === 'Success' || status === 'Ready for submission' || status === 'Data is ready') {
      return 'badge badge-pill badge-success';
    } else if (status === 'Error' || status === 'Fix issues') {
      return 'badge badge-pill badge-danger';
    }
    return '';
  }

  startValidation() {
    this.validation_started = true;
    this.apiDataService.startValidation(this.action, this.conversion_task_id, this.fileid, 'samples').subscribe({
      next: response => {
        this.validation_task_id = response['id'];
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onStartSubmissionClick() {
    this.submissionStarted = !this.submissionStarted;
  }

  getTemplateFile() {
    this.apiDataService.getTemplate(this.validation_task_id, this.fileid, 'samples', this.action).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  isSubmissionDisabled(status: string) {
    return status === 'Fix issues' || this.submission_status === 'Preparing data'
      || this.gcp_subscription_status === 'failure';
  }

  constructDownloadTemplateLink() {
    return validation_service_url_download + '/submission/download_template/' + this.fileid;
  }

  onSubmit() {
    this.disableAuthForm = true;
    this.apiDataService.chooseDomain(this.model.username, this.model.password, this.model.mode, this.fileid,
      this.private_submission).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onDomainSubmit() {
    this.disableDomainForm = true;
    this.apiDataService.submitDomain(this.model.username,
      this.model.password, this.model.mode, this.domain.name, this.domain.description, this.fileid,
      this.private_submission).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onChooseDomainClick(name: string) {
    this.domain.name = name;
  }

  onSubmitWebinRecordsClick() {
    this.disableAuthForm = true;
    this.disableSubmitButton = true;

    this.apiDataService.submitRecords(this.action, this.model.username,
      this.model.password, this.model.mode, this.fileid, this.conversion_task_id,
      'samples', this.private_submission, '').subscribe({
      next: response => {
        this.submission_task_id = response['id'];
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onSubmitRecordsClick() {
    this.disableAuthForm = true;
    this.disableSubmitButton = true;

    this.apiDataService.submitRecords(this.action, this.model.username,
      this.model.password, this.model.mode, this.fileid, this.conversion_task_id,
      'samples', this.private_submission, this.domain.name).subscribe({
      next: response => {
        this.submission_task_id = response['id'];
      },
      error: error => {
        console.log(error);
      }
    });
  }

  submissionMessageClass() {
    if (this.submission_message.includes('Error')) {
      return 'alert alert-danger';
    } else if (this.submission_message.includes('Success')) {
      return 'alert alert-success';
    } else if (this.submission_message.includes('Waiting')) {
      return 'alert alert-warning';
    } else {
      return 'alert alert-primary';
    }
  }

  generateBioSampleLink(id: string) {
    if (this.model.mode === 'prod') {
      return `https://www.ebi.ac.uk/biosamples/samples/${id}`;
    } else {
      return `https://wwwdev.ebi.ac.uk/biosamples/samples/${id}`;
    }
  }

  onCreateNewDomainClick() {
    this.disableChooseDomainForm = !this.disableChooseDomainForm;
    this.disableDomainForm = !this.disableDomainForm;
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  onChooseModeClick(mode: string) {
    this.model.mode = mode;
    mode === 'prod' ? this.webin_link = 'https://www.ebi.ac.uk/ena/submit/webin/login' :
      this.webin_link = 'https://www.ebi.ac.uk/ena/submit/webin/login';
    mode === 'prod' ? this.aap_link = 'https://aai.ebi.ac.uk/registerUser' :
      this.aap_link = 'https://explore.aai.ebi.ac.uk/registerUser';
  }

  downloadSubmissionResults() {
    return validation_service_url_download + '/submission/download_submission_results/samples/' + this.submission_task_id;
  }

  triggerFalseClick() {
    const el: HTMLElement = this.myButton.nativeElement;
    el.click();
  }

  goBack() {
    this.disableAuthForm = false;
    this.submission_message = 'Please login';
    this.submissionResults = [];
  }

  tabClick(tab: any) {
    if (tab.index === 0) {
      void this.router.navigate(['validation/samples']);
    } else if (tab.index === 1) {
      void this.router.navigate(['validation/experiments']);
    } else if (tab.index === 2) {
      void this.router.navigate(['validation/analyses']);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.socket) {
      this.socket.close();
    }
  }

}

