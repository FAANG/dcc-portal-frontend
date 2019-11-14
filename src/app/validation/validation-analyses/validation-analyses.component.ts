import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Title} from '@angular/platform-browser';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ApiDataService} from '../../services/api-data.service';
import {issue_type, record_type} from '../../shared/constants';

const UploadURL = 'http://localhost:8000/conversion/experiments';

@Component({
  selector: 'app-validation-analyses',
  templateUrl: './validation-analyses.component.html',
  styleUrls: ['./validation-analyses.component.css']
})
export class ValidationAnalysesComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: UploadURL, itemAlias: 'file'});
  status: string;
  socket;
  validation_results;
  record_types = [];
  active_key = 'organism';
  active_issue;
  active_table;
  active_column: string;
  active_issues;
  records_that_pass = [];
  records_with_issues = [];
  records_to_show;
  show_table = false;
  validation_started = false;
  task_id: string;
  errors = [];

  constructor(
    private titleService: Title,
    public ngxSmartModalService: NgxSmartModalService,
    private apiDataService: ApiDataService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG validation|Analyses');
    this.setSocket();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.task_id = response;
    };
    this.status = 'Undefined';
  }

  setValidationResults() {
    if (this.validation_results) {
      for (const key of Object.keys(this.validation_results)) {
        this.record_types.push(key);
      }
      this.active_table = this.validation_results[this.active_key];
      this.setTables();
    }
  }

  setTables() {
    for (const record of this.active_table) {
      let has_issues = false;
      for (const type of record_type) {
        for (const issue of issue_type) {
          if (record[type][issue].length !== 0) {
            has_issues = true;
          }
        }
      }
      has_issues === true ? this.records_with_issues.push(record) : this.records_that_pass.push(record);
    }
  }

  setSocket() {
    this.socket = new WebSocket('ws://127.0.0.1:8000/ws/submission/test_task/');
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.status = data['response']['status'];
      if (data['response']['validation_results']) {
        this.validation_results = data['response']['validation_results'];
        this.setValidationResults();
      }
      if (data['response']['errors']) {
        this.errors.push(data['response']['errors']);
      }
    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }

  remove_underscores(record) {
    return record.replace(/[_]/g, ' ');
  }

  getIssues(issues_list, issue_type) {
    issues_list = issues_list.length;
    if (issues_list === 0) {
      return 'pass';
    } else {
      if (issues_list === 1) {
        return issues_list + ' ' + issue_type;
      } else {
        return issues_list + ' ' + issue_type + 's';
      }
    }
  }

  getCellClass(issues_list, issue_type) {
    issues_list = issues_list.length;
    if (issues_list === 0) {
      return '';
    } else {
      if (issue_type === 'warning') {
        return 'table-warning';
      } else {
        return 'table-danger';
      }
    }
  }

  getCellStyle(issues_list) {
    if (issues_list.length !== 0) {
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
    this.show_table = false;
    this.setTables();
  }

  onValidationResultsButtonClick(issues_type) {
    this.show_table = true;
    this.active_issue = issues_type;
    issues_type === 'passed' ? this.records_to_show = this.records_that_pass : this.records_to_show = this.records_with_issues;
  }

  openModal(column_type, issues_list) {
    if (issues_list.length !== 0) {
      this.active_column = column_type;
      this.active_issues = issues_list;
      this.ngxSmartModalService.getModal('myModal').open();
    }
  }

  statusClass() {
    if (this.status === 'Undefined') {
      return 'badge badge-pill badge-info';
    } else if (this.status === 'Waiting') {
      return 'badge badge-pill badge-warning';
    } else if (this.status === 'Success') {
      return 'badge badge-pill badge-success';
    } else if (this.status === 'Error') {
      return 'badge badge-pill badge-danger';
    }
  }

  startValidation() {
    this.validation_started = true;
    this.apiDataService.startValidation(this.task_id, 'experiments').subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
