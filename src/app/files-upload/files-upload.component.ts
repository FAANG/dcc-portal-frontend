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
  UploadURL = 'https://data.faang.org/validation_api' + '/protocols_upload/samples';
  fileid = makeid(20);
  public uploader: FileUploader = new FileUploader({url: this.UploadURL, itemAlias: this.fileid});
  public link: string;
  socket;
  submission_message: string;
  submission_results: string;
  errors;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG upload protocols');
    this.setSocket();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response);
    };
  }

  setSocket() {
    const url = 'wss://data.faang.org/validation_ws/ws/submission/' + this.fileid + '/';
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)['response'];
      if (data['submission_message']) {
        this.submission_message = data['submission_message'];
      }
      if (data['errors']) {
        this.errors = data['errors'];
      }
      if (data['submission_results']) {
        this.submission_results = data['submission_results'];
      }
    };
  }

  chooseProtocolType(protocolType: string) {
    this.UploadURL = `https://data.faang.org/validation_api/protocols_upload/${protocolType}`;
    this.uploader = new FileUploader({url: this.UploadURL, itemAlias: this.fileid});
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response);
    };
    console.log(this.UploadURL);
  }

  getAlertClass() {
    if (this.submission_message) {
      if (this.submission_message === 'Starting to validate protocol' ||
        this.submission_message === 'Uploading protocol') {
        return 'alert alert-info';
      } else if (this.submission_message === 'Protocol upload failed, please contact faang-dcc@ebi.ac.uk') {
        return 'alert alert-danger';
      } else {
        return 'alert alert-success';
      }
    }
  }

}
