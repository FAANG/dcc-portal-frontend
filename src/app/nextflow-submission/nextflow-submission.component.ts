import {Component, OnInit} from '@angular/core';
import {validation_service_url} from '../shared/constants';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-nextflow-submission',
  templateUrl: './nextflow-submission.component.html',
  styleUrls: ['./nextflow-submission.component.css']
})
export class NextflowSubmissionComponent implements OnInit {
  fileid;
  nfConfigUploadUrl;
  nfspreadsheetUploadUrl;
  error;
  loading = false;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG Nextflow Upload');
    this.nfConfigUploadUrl = `${validation_service_url}/nextflow_upload/upload/nextflow_config`;
    this.nfspreadsheetUploadUrl = `${validation_service_url}/nextflow_upload/upload/nextflow_spreadsheet`;
  }
}