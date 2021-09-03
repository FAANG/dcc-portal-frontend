import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { validation_service_url, validation_ws_url } from '../shared/constants';
import { makeid } from '../shared/common_functions';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-trackhubs-submission',
  templateUrl: './trackhubs-submission.component.html',
  styleUrls: ['./trackhubs-submission.component.css']
})
export class TrackhubsSubmissionComponent implements OnInit {
  fileid;
  tracksUploadUrl;
  textFileUploadUrl;
  tracksUploader: FileUploader;
  textFileUploader: FileUploader;
  socket;
  tracks_submission_message: string;
  files_submission_message: string;
  errors;
  trackhub = {};
  stage;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG upload track hubs');
    this.stage = 'form';
  }

  setSocket(fileid, type) {
    const url = validation_ws_url + fileid + '/';
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)['response'];
      if (data['submission_message']) {
        if (type == 'tracks') {
          this.tracks_submission_message = data['submission_message'];
        } else {
          this.files_submission_message = data['submission_message'];
        }
      }
      if (data['errors']) {
        this.errors = data['errors'];
      }
    };
  }

  getAlertClass(submission_message) {
    if (submission_message) {
      if (submission_message === 'Starting to validate file' ||
        submission_message === 'Uploading file') {
        return 'alert alert-info';
      } else if (submission_message === 'Upload failed, please contact faang-dcc@ebi.ac.uk'
                || submission_message === 'Validation failed') {
        return 'alert alert-danger';
      } else {
        return 'alert alert-success';
      }
    }
  }

  startTracksUploads(genome: string, directory: string) {
    this.stage = 'upload-tracks';
    this.tracksUploadUrl = `${validation_service_url}/trackhubs/${genome}/${directory}`;
    this.fileid = makeid(20);
    this.setSocket(this.fileid, 'tracks');
    this.tracksUploader = new FileUploader({url: this.tracksUploadUrl, itemAlias: this.fileid});
    this.tracksUploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.tracksUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response);
    };
  }

  startTextFilesUploads(genome: string) {
    this.stage = 'upload-text-files';
    this.textFileUploadUrl = `${validation_service_url}/trackhubs/${genome}`;
    this.fileid = makeid(20);
    this.setSocket(this.fileid, 'text-files');
    this.textFileUploader = new FileUploader({url: this.textFileUploadUrl, itemAlias: this.fileid});
    this.textFileUploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.textFileUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response);
    };
  }

}
