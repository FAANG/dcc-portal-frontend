import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {firstValueFrom, Observable} from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { makeid } from '../shared/common_functions';
import { validation_ws_url } from '../shared/constants';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout/flex';

@Component({
  selector: 'app-bulk-files-uploader',
  templateUrl: './bulk-files-uploader.component.html',
  styleUrls: ['./bulk-files-uploader.component.css'],
  standalone: true,
  imports: [FlexModule, MatButton, NgClass, ExtendedModule]
})
export class BulkFilesUploaderComponent implements OnInit {
  @Input() uploadUrl = ''; // upload endpoint url
  @Input() mode = ''; // upload mode: single or bulk
  @Input() user: {[index: string]: any} = {}; // user data
  @Output() messageUpdate = new EventEmitter<any>();
  selectedFiles?: FileList;
  fileNamesList: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  socket: any;
  submission_message = {};
  errors = {};
  buttonDisabled = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.buttonDisabled = true;
    if (this.mode === 'single') {
      this.fileNamesList = [];
    }
    if (this.selectedFiles) {
      this.uploadService(this.selectedFiles).pipe().toPromise().then(
        () => {
          this.buttonDisabled = false;
        }
      );

      // firstValueFrom(this.uploadService(this.selectedFiles))
      //   .then(
      //     () => {
      //       this.buttonDisabled = false;
      //     }
      //   );
    }
  }

  setSocket(fileid: any, filename: any) {
    const url = validation_ws_url + fileid + '/';
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event: { data: string; }) => {
      this.errors[filename] = [];
      this.submission_message[filename] = null;
      const data = JSON.parse(event.data)['response'];
      if (data['submission_message']) {
        this.submission_message[filename] = data['submission_message'];
      }
      if (data['errors']) {
        this.errors[filename].push(data['errors']);
      }
      if (data['validation_results']) {
        data['validation_results']['fileid'] = fileid;
        this.messageUpdate.emit(data['validation_results']);
      }
    };
  }

  uploadService(files: FileList): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      const fileid = makeid(20);
      this.setSocket(fileid, files[i].name);
      formData.append(fileid, files[i]);
      this.fileNamesList.push(files[i].name);
    }
    if (this.user) {
      formData.append('user', this.user['user']);
      formData.append('pwd', this.user['pwd']);
      if (this.user['modify']) {
        formData.append('modify', this.user['modify']);
      }
    }
    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getAlertClass(submission_message: string | string[]) {
    if (submission_message) {
      if (submission_message.includes('Success')) {
        return 'alert alert-success';
      } else if (submission_message === 'Upload failed, please contact faang-dcc@ebi.ac.uk'
                || submission_message === 'Validation failed' || submission_message.includes('Error')) {
        return 'alert alert-danger';
      } else {
        return 'alert alert-info';
      }
    }
    return '';
  }

}
