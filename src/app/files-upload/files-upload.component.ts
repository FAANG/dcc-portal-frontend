import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {validation_service_url, validation_ws_url} from '../shared/constants';
import {makeid} from '../shared/common_functions';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css']
})
export class FilesUploadComponent implements OnInit {
  UploadURL;
  errors;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG upload protocols');
    this.UploadURL = `${validation_service_url}/protocols_upload/samples`;
  }

  chooseProtocolType(protocolType: string) {
    this.UploadURL = `${validation_service_url}/protocols_upload/${protocolType}`;
  }

}
