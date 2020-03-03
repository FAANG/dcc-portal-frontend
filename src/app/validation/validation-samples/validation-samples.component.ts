import {Component, OnDestroy, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Title} from '@angular/platform-browser';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ApiDataService} from '../../services/api-data.service';
import {
  issue_type,
  record_type,
  sample_metadata_template_with_examples, sample_metadata_template_without_examples,
  validation_service_url,
  validation_service_url_download,
  validation_ws_url
} from '../../shared/constants';
import {makeid, replaceUnderscoreWithSpaceAndCapitalize} from '../../shared/common_functions';

const UploadURL = validation_service_url + '/conversion/samples';

@Component({
  selector: 'app-validation-samples',
  templateUrl: './validation-samples.component.html',
  styleUrls: ['./validation-samples.component.css']
})
export class ValidationSamplesComponent implements OnInit, OnDestroy {
  fileid = makeid(20);
  public uploader: FileUploader = new FileUploader({url: UploadURL, itemAlias: this.fileid});
  conversion_status: string;
  validation_status: string;
  submission_status: string;
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
  download_data_task_id: string;
  metadata_template_with_examples: string;
  metadata_template_without_examples: string;
  errors = [];
  column_names = [];
  table_data = [];
  table_errors = [];

  constructor(
    private titleService: Title,
    public ngxSmartModalService: NgxSmartModalService,
    private apiDataService: ApiDataService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG validation|Samples');
    this.setSocket();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.conversion_task_id = response;
      console.log(this.conversion_task_id);
    };
    this.conversion_status = 'Undefined';
    this.metadata_template_with_examples = sample_metadata_template_with_examples;
    this.metadata_template_without_examples = sample_metadata_template_without_examples;
  }

  setValidationResults() {
    if (this.validation_results) {
      for (const key of Object.keys(this.validation_results)) {
        if (key !== 'table') {
          this.record_types.push(key);
        }
      }
      this.active_key = this.record_types[0];
      this.active_table = this.validation_results[this.active_key];
      this.setTables();
    }
  }

  setTables() {
    const table = this.active_table[0];
    this.column_names.push('Sample Name');
    if ('samples_core' in table) {
      this.parseColumnNames(table['samples_core']);
    }
    this.parseColumnNames(table);
    if ('custom' in table) {
      this.parseColumnNames(table['custom']);
    }
    for (const record of this.active_table) {
      let tmp = [];
      let tmp_errors = [];
      tmp.push(record['custom']['sample_name']['value']);
      tmp_errors.push('valid');
      if ('samples_core' in record) {
        tmp = tmp.concat(this.parseColumnData(record['samples_core'])['data']);
        tmp_errors = tmp_errors.concat(this.parseColumnData(record['samples_core'])['errors']);
      }
      tmp = tmp.concat(this.parseColumnData(record)['data']);
      tmp_errors = tmp_errors.concat(this.parseColumnData(record)['errors']);
      if ('custom' in record) {
        tmp = tmp.concat(this.parseColumnData(record['custom'])['data']);
        tmp_errors = tmp_errors.concat(this.parseColumnData(record['custom'])['errors']);
      }
      const error_indices = tmp_errors.map((e, i) => e === 'valid' ? i : '').filter(String);
      if (error_indices.length !== tmp.length) {
        this.records_with_issues.push(tmp);
        this.table_errors.push(tmp_errors);
      } else {
        this.records_that_pass.push(tmp);
      }
    }
  }

  setSocket() {
    const url = validation_ws_url + this.fileid + '/';
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data['response']['conversion_status']) {
        this.conversion_status = data['response']['conversion_status'];
      }
      if (data['response']['validation_status']) {
        this.validation_status = data['response']['validation_status'];
      }
      if (data['response']['submission_status']) {
        this.submission_status = data['response']['submission_status'];
      }
      if (data['response']['errors']) {
        this.errors.push(data['response']['errors']);
      }
      if (data['response']['table_data']) {
        this.validation_results = data['response']['table_data'];
        this.setValidationResults();
      }
    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }

  parseColumnNames(data: any) {
    for (const name of Object.keys(data)) {
      // TODO: parse all data in array
      if (Array.isArray(data[name])) {
        data[name] = data[name][0];
      }
      if (name !== 'samples_core' && name !== 'custom' && name !== 'sample_name') {
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

  parseColumnData(data: any) {
    const data_to_return = [];
    const errors_to_return = [];
    for (const name of Object.keys(data)) {
      // TODO: parse all data in array
      if (Array.isArray(data[name])) {
        data[name] = data[name][0];
      }
      if (name !== 'samples_core' && name !== 'custom' && name !== 'sample_name') {
        if (data[name].hasOwnProperty('text')) {
          data_to_return.push(data[name]['text']);
          errors_to_return.push(this.dataHasErrors(data[name]));
        } else if (data[name].hasOwnProperty('value')) {
          data_to_return.push(data[name]['value']);
          errors_to_return.push(this.dataHasErrors(data[name]));
        }
        if (data[name].hasOwnProperty('term')) {
          data_to_return.push(data[name]['term']);
          errors_to_return.push(this.dataHasErrors(data[name]));
        } else if (data[name].hasOwnProperty('units')) {
          data_to_return.push(data[name]['units']);
          errors_to_return.push(this.dataHasErrors(data[name]));
        }
      }
    }
    return {
      data: data_to_return,
      errors: errors_to_return
    };
  }

  dataHasErrors(data: any) {
    if (data.hasOwnProperty('errors')) {
      return data['errors'];
    } else {
      return 'valid';
    }
  }

  remove_underscores(record) {
    return record.replace(/[_]/g, ' ');
  }

  getIssues(issues_list, issue_type_name) {
    issues_list = issues_list.length;
    if (issues_list === 0) {
      return 'pass';
    } else {
      if (issues_list === 1) {
        return issues_list + ' ' + issue_type_name;
      } else {
        return issues_list + ' ' + issue_type_name + 's';
      }
    }
  }

  getCellClass(i: number, j: number) {
    if (this.active_issue === 'issues' && this.table_errors[i][j] !== 'valid') {
      return 'table-danger';
    }
  }

  getCellStyle(i: number, j: number) {
    if (this.active_issue === 'issues' && this.table_errors[i][j] !== 'valid') {
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

  onRecordButtonClick(button_record: string) {
    this.active_key = button_record;
    this.active_table = this.validation_results[this.active_key];
    this.records_with_issues = [];
    this.records_that_pass = [];
    this.column_names = [];
    this.table_data = [];
    this.table_errors = [];
    this.show_table = false;
    this.setTables();
  }

  onValidationResultsButtonClick(issues_type) {
    this.show_table = true;
    this.active_issue = issues_type;
    issues_type === 'passed' ? this.records_to_show = this.records_that_pass : this.records_to_show = this.records_with_issues;
  }

  openModal(i: number, j: number) {
    this.active_column = this.column_names[j];
    this.active_issues = this.table_errors[i][j];
    if (this.active_issue === 'issues') {
      this.ngxSmartModalService.getModal('myModal').open();
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
    this.apiDataService.startValidation(this.conversion_task_id, this.fileid, 'samples').subscribe(response => {
        console.log(response['id']);
      },
      error => {
        console.log(error);
      }
    );
  }

  startConversion() {
    this.apiDataService.startConversion(this.conversion_task_id, this.fileid, 'samples').subscribe(response => {
      console.log(response['id']);
      this.download_data_task_id = response['id'];
    },
      error => {
      console.log(error);
      }
      );
  }

  isSubmissionDisabled(status) {
    return status === 'Fix issues' || this.submission_status === 'Preparing data';
  }

  constructDownloadLink() {
    return validation_service_url_download + '/submission/get_data/' + this.download_data_task_id;
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

}
