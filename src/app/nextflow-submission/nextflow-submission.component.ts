import {Component, OnInit} from '@angular/core';
import {validation_service_url} from '../shared/constants';
import {Title} from '@angular/platform-browser';
import { BulkFilesUploaderComponent } from '../bulk-files-uploader/bulk-files-uploader.component';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-nextflow-submission',
  templateUrl: './nextflow-submission.component.html',
  styleUrls: ['./nextflow-submission.component.css'],
  standalone: true,
  imports: [HeaderComponent, FlexModule, BulkFilesUploaderComponent]
})
export class NextflowSubmissionComponent implements OnInit {
  fileid: any;
  nfConfigUploadUrl = '';
  nfspreadsheetUploadUrl = '';
  error: any;
  loading = false;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG Nextflow Upload');
    this.nfConfigUploadUrl = `${validation_service_url}/nextflow_upload/upload/nextflow_config`;
    this.nfspreadsheetUploadUrl = `${validation_service_url}/nextflow_upload/upload/nextflow_spreadsheet`;
  }
}

