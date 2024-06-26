import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Title} from '@angular/platform-browser';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ApiDataService} from '../../services/api-data.service';
import { MatPaginator } from '@angular/material/paginator';
import {
  analysis_metadata_template_with_examples, analysis_metadata_template_without_examples,
  validation_service_url,
  validation_service_url_download,
  validation_ws_url
} from '../../shared/constants';
import {makeid, replaceUnderscoreWithSpaceAndCapitalize} from '../../shared/common_functions';
import {UserForm} from '../webin_aap_user';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {MatTabGroup} from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';

const UploadURL = validation_service_url + '/conversion/analyses';

@Component({
  selector: 'app-validation-analyses',
  templateUrl: './validation-analyses.component.html',
  styleUrls: ['./validation-analyses.component.css']
})
export class ValidationAnalysesComponent implements OnInit, OnDestroy {
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  model = new UserForm('', '', 'prod');
  fileid = makeid(20);
  public uploader: FileUploader = new FileUploader({url: UploadURL, itemAlias: this.fileid});
  conversion_status: string;
  validation_status: string;
  submission_status: string;
  annotation_status: string;
  submission_message: string;
  gcp_subscription_status: string;
  socket;
  validation_results;
  record_types = [];
  active_key: string;
  active_issue;
  active_table;
  active_column: string;
  active_issues;
  records_that_pass = [];
  records_with_issues = [];
  records_to_show;
  show_table = false;
  validation_started = false;
  conversion_task_id: string;
  validation_task_id: string;
  download_data_task_id: string;
  metadata_template_with_examples: string;
  metadata_template_without_examples: string;
  errors = [];
  column_names = [];
  table_data = [];
  table_errors = [];
  table_warnings = [];
  submissionStarted = false;
  disableAuthForm = false;
  submissionResults = [];
  submission_task_id: string;
  bovreg_submission = false;
  private_submission = false;
  col_index = [];
  action: 'update'|'submission' = 'submission';
  tooltipUpdate: string;
  tooltipSubmission: string;
  currentDate: Date;

  @ViewChild('myButton') myButton: ElementRef<HTMLElement>;

  constructor(
    private titleService: Title,
    public ngxSmartModalService: NgxSmartModalService,
    private apiDataService: ApiDataService,
    public _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentDate = new Date;
    // check pubsub lite queue on GCP
    this.getPubSubMessage();

    this.tabGroup.selectedIndex = 2;
    this.dataSource = new MatTableDataSource([]);
    this.submission_message = 'Please login';
    this.titleService.setTitle('FAANG validation|Analyses');
    this.setSocket();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBeforeUploadItem = (file) => {
      this.conversion_status = 'Waiting';
    }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.conversion_task_id = response;
      if (this.conversion_status === 'Success') {
        this.startValidation();
      }
    };
    this.metadata_template_with_examples = analysis_metadata_template_with_examples;
    this.metadata_template_without_examples = analysis_metadata_template_without_examples;
    if (this._userService.token) {
      this.private_submission = true;
    }
    this.tooltipUpdate = '• This action will update the analysis details with the provided metadata. \n' +
      '• Please ensure that the submitted spreadsheet contains the original alias used during initial submission. \n' +
      '• Analysis entries cannot be updated to point to different data files';

    this.tooltipSubmission = '• This action will make a new analysis submission to ENA. \n' +
      '• The alias used for the submitted object should be unique for the object\'s type within the submission account.';
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
    this.column_names.push('Alias');
    this.parseColumnNames(table);
    if ('custom' in table) {
      this.parseColumnNames(table['custom']);
    }
    for (const record of this.active_table) {
      let tmp = [];
      let tmp_errors = [];
      let tmp_warnings = [];
      tmp.push(record['alias']['value']);
      tmp_errors.push('valid');
      tmp_warnings.push('valid');
      const type_parsing_results = this.parseColumnData(record);
      tmp = tmp.concat(type_parsing_results['data']);
      tmp_errors = tmp_errors.concat(type_parsing_results['errors']);
      tmp_warnings = tmp_warnings.concat(type_parsing_results['warnings']);
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
    this.apiDataService.get_pubsub_messages().subscribe(data => {
      this.gcp_subscription_status = data[0]['enaStatus']
    }, error => {
      console.log(error);
    });
  }

  setSocket() {
    const url = validation_ws_url + this.fileid + '/';
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)['response'];
      if (data['conversion_status']) {
        this.conversion_status = data['conversion_status'];
      }
      if (data['submission_results']) {
        this.submissionResults = data['submission_results'];
        if (this.submissionResults.length !== 0) {
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

  parseColumnNames(data: any) {
    for (const name of Object.keys(data)) {
      if (Array.isArray(data[name])) {
        for (const record of data[name]) {
          const tmp = {};
          tmp[name] = record;
          this.parseColumnNames(tmp);
        }
      } else {
        if (name !== 'alias' && name !== 'custom') {
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
    let data_to_return = [];
    let errors_to_return = [];
    let warnings_to_return = [];
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
        if (name !== 'alias' && name !== 'custom') {
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

  remove_underscores(record) {
    return record.replace(/[_]/g, ' ');
  }

  getIssues(issues_list, issue_type_value) {
    issues_list = issues_list.length;
    if (issues_list === 0) {
      return 'pass';
    } else {
      if (issues_list === 1) {
        return issues_list + ' ' + issue_type_value;
      } else {
        return issues_list + ' ' + issue_type_value + 's';
      }
    }
  }

  getCellClass(i: number, j: number) {
    if (this.active_issue === 'issues' && this.table_errors[i][j] !== 'valid') {
      return 'table-danger';
    } else if (this.active_issue === 'issues' && this.table_warnings[i][j] !== 'valid') {
      return 'table-warning';
    }
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

  isButtonActive(button_record: string) {
    if (button_record === this.active_key) {
      return 'active';
    } else {
      return 'inactive';
    }
  }

  isRecordsButtonActive(type: string) {
    if (type === this.active_issue) {
      return 'active';
    } else {
      return 'inactive';
    }
  }

  onRecordButtonClick(tab) {
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

  onValidationResultsButtonClick(issues_type) {
    this.show_table = true;
    this.active_issue = issues_type;
    issues_type === 'passed' ? this.records_to_show = this.records_that_pass : this.records_to_show = this.records_with_issues;
    let data = [];
    this.records_to_show.forEach(record => {
      let rowObj = {};
      for (let index in this.column_names) {
        rowObj[index] = record[index];
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

  statusClass(status) {
    if (status === 'Undefined' || status === 'Finished') {
      return 'badge badge-pill badge-info';
    } else if (status === 'Waiting' || status === 'Preparing data') {
      return 'badge badge-pill badge-warning';
    } else if (status === 'Success' || status === 'Ready for submission' || status === 'Data is ready') {
      return 'badge badge-pill badge-success';
    } else if (status === 'Error' || status === 'Fix issues') {
      return 'badge badge-pill badge-danger';
    }
  }

  startValidation() {
    this.validation_started = true;
    this.apiDataService.startValidation(this.action, this.conversion_task_id, this.fileid, 'analyses').subscribe(response => {
        this.validation_task_id = response['id'];
      },
      error => {
        console.log(error);
      }
    );
  }

  startConversion() {
    this.apiDataService.startConversion(this.conversion_task_id, this.fileid, 'analyses').subscribe(response => {
        console.log(response['id']);
        this.download_data_task_id = response['id'];
      },
      error => {
        console.log(error);
      }
    );
  }

  getTemplateFile() {
    this.apiDataService.getTemplate(this.validation_task_id, this.fileid, 'analyses', this.action).subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  isSubmissionDisabled(status) {
    return status === 'Fix issues' || this.submission_status === 'Preparing data'
      || this.gcp_subscription_status == 'failure';
  }

  constructDownloadLink() {
    return validation_service_url_download + '/submission/get_data/' + this.download_data_task_id;
  }

  constructDownloadTemplateLink() {
    return validation_service_url_download + '/submission/download_template/' + this.fileid;
  }

  onStartSubmissionClick(privateSubmission) {
    this.submissionStarted = !this.submissionStarted;
    if (privateSubmission) {
      this.onSubmit();
    }
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

  onSubmit() {
    this.disableAuthForm = true;
    this.apiDataService.submitRecords(this.action, this.model.username, this.model.password, this.model.mode, this.fileid,
      this.conversion_task_id, 'analyses', this.private_submission, '').subscribe(
      (response) => {
        this.submission_task_id = response['id'];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadSubmissionResults() {
    return validation_service_url_download + '/submission/download_submission_results/analyses/' + this.submission_task_id;
  }

  triggerFalseClick() {
    const el: HTMLElement = this.myButton.nativeElement;
    el.click();
  }

  tabClick(tab) {
    if (tab.index == 0) {
      this.router.navigate(['validation/samples']);
    }
    else if (tab.index == 1) {
      this.router.navigate(['validation/experiments']);
    }
    else if (tab.index == 2) {
      this.router.navigate(['validation/analyses']);
    }
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

}
