import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FileUploader} from 'ng2-file-upload';
import {NgxSmartModalService} from 'ngx-smart-modal';

const UploadURL = 'http://localhost:8000/conversion/samples';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: UploadURL, itemAlias: 'file'});
  status: string;
  socket;
  validation_results;
  record_types = [];
  active_key = 'organism';
  active_table;
  active_column: string;
  active_issues;

  constructor(
    private titleService: Title,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG validation');
    // this.setSocket();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded:', item, status, response);
    };
    this.status = 'Undefined';
    setTimeout( () => { this.status = 'Waiting'; }, 3000 );
    setTimeout( () => { this.status = 'Success'; }, 3000 );
    setTimeout( () => { this.status = 'Error'; }, 3000 );
    this.validation_results = {"organism": [{"name": "ECA_UKY_H1", "core": {"errors": [], "warnings": []}, "type": {"errors": [null, "Relationships part: referenced entity 'SAMEA104728849' does not match condition 'should be organism'", "Relationships part: no entity 'SAMEAFAKE' found"], "warnings": []}, "custom": {"errors": [], "warnings": ["Provided value 'test' doesn't precisely match 'kepulauan obi or obi obi creek or cell specimen' for term 'OBI:0001468'", "Provided value 'test' doesn't precisely match 'kepulauan obi or obi obi creek or cell specimen' for term 'OBI:0001468'", "Provided value 'test' doesn't precisely match 'kepulauan obi or obi obi creek or cell specimen' for term 'OBI:0001468'"]}}, {"name": "ECA_UKY_H2", "core": {"errors": [], "warnings": []}, "type": {"errors": [null], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_H3", "core": {"errors": [], "warnings": []}, "type": {"errors": [null], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_H4", "core": {"errors": [], "warnings": []}, "type": {"errors": [null], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_H5", "core": {"errors": [], "warnings": []}, "type": {"errors": [null], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_H6", "core": {"errors": [], "warnings": []}, "type": {"errors": [null], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_H7", "core": {"errors": [], "warnings": []}, "type": {"errors": [null], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_H8", "core": {"errors": [], "warnings": []}, "type": {"errors": [null], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_H9", "core": {"errors": [], "warnings": []}, "type": {"errors": [null], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_H10", "core": {"errors": [], "warnings": []}, "type": {"errors": [null], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_H11", "core": {"errors": [], "warnings": []}, "type": {"errors": [null], "warnings": []}, "custom": {"errors": [], "warnings": []}}], "specimen_from_organism": [{"name": "ECA_UKY_S1", "core": {"errors": [], "warnings": []}, "type": {"errors": [".fasted_status.value should be equal to one of the allowed values: [fed,fasted,unknown]", "Field 'value' of 'fasted_status' contains missing value that is not appropriate for this field"], "warnings": ["Couldn't find label in OLS with these ontology names: ['pato', 'efo']"]}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S2", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": ["Provided value 'not collected' doesn't precisely match 'normal' for term 'PATO:0000461'", "Field 'text' of 'health_status_at_collection' contains missing value that is not appropriate for this field"]}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S3", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S4", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S5", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S6", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S7", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S8", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S9", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": ["Provided value 'cerebrum' doesn't precisely match 'telencephalon' for term 'UBERON:0001893'"]}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S10", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S11", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S12", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S13", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S14", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S15", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S16", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S17", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S18", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S19", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S20", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S21", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S22", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S23", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S24", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S25", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S26", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S27", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S28", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S29", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S30", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S31", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S32", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": ["Date units: YYYY should be consistent with date value: 2005-06-30"]}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S33", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": ["Date units: YYYY should be consistent with date value: 2005-06-24"]}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S34", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": ["Date units: YYYY should be consistent with date value: 2005-07-02"]}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S35", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": ["Date units: YYYY should be consistent with date value: 2005-07-02"]}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S36", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": ["Date units: YYYY should be consistent with date value: 2005-07-02"]}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S37", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": ["Date units: YYYY should be consistent with date value: 2005-07-02"]}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S38", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S39", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S40", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S41", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S42", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S43", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}, {"name": "ECA_UKY_S44", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": []}, "custom": {"errors": [], "warnings": []}}], "pool_of_specimens": [{"name": "ECA_UKY_P_S21_S22", "core": {"errors": [], "warnings": []}, "type": {"errors": ["Relationships part: referenced entity 'ECA_UKY_H1' does not match condition 'should be specimen_from_organism'", "Relationships part: referenced entity 'ECA_UKY_H2' does not match condition 'should be specimen_from_organism'"], "warnings": []}, "custom": {"errors": [], "warnings": []}}], "cell_specimen": [{"name": "C1", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": ["Provided value 'peripheral blood mononuclear cells' doesn't precisely match 'peripheral blood mononuclear cell' for term 'CL:2000001'"]}, "custom": {"errors": [], "warnings": []}}, {"name": "C2", "core": {"errors": [], "warnings": []}, "type": {"errors": [], "warnings": ["Provided value 'lymphocytes' doesn't precisely match 'lymphocyte' for term 'CL:0000542'"]}, "custom": {"errors": [], "warnings": []}}], "cell_culture": [], "cell_line": []};
    this.setValidationResults();
  }

  setValidationResults() {
    for (const key of Object.keys(this.validation_results)) {
      this.record_types.push(key);
    }
    this.active_table = this.validation_results[this.active_key];
  }

  setSocket() {
    this.socket = new WebSocket('ws://' + window.location.host + '/submission_notifications/');
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event) => {
      console.log('data from socket: ' + event.data);
    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }

  remove_underscores(record) {
    return record.replace(/[_]/g, ' ');
  }

  convertArrayToStr(issues_list) {
    return issues_list.join(', ');
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

  onRecordButtonClick(button_record: string) {
    this.active_key = button_record;
    this.active_table = this.validation_results[this.active_key]
  }

  openModal(column_type, issues_list) {
    this.active_column = column_type;
    this.active_issues = issues_list;
    this.ngxSmartModalService.getModal('myModal').open();
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

}
