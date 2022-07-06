import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent,
  HttpEventType, HttpResponse  } from '@angular/common/http';
import { makeid } from '../shared/common_functions';
import { validation_ws_url } from '../shared/constants';

@Component({
  selector: 'app-bulk-files-uploader',
  templateUrl: './bulk-files-uploader.component.html',
  styleUrls: ['./bulk-files-uploader.component.css']
})
export class BulkFilesUploaderComponent implements OnInit {
  @Input() uploadUrl: string; // upload endpoint url
  @Input() mode: string; // upload mode: single or bulk
  @Input() user: string; // user data
  @Output() messageUpdate = new EventEmitter<any>();
  selectedFiles?: FileList;
  fileNamesList: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  socket;
  submission_message = {};
  errors = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    if (this.mode == 'single') {
      this.fileNamesList = [];
    }
    if (this.selectedFiles) {
      this.uploadService(this.selectedFiles).subscribe();
    }
  }

  setSocket(fileid, filename) {
    const url = validation_ws_url + fileid + '/';
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event) => {
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
        this.messageUpdate.emit(data['validation_results']);
      }
    };
  }

  uploadService(files: FileList): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    for(let i=0; i<files.length; i+=1) {
      let fileid = makeid(20);
      this.setSocket(fileid, files[i].name);
      formData.append(fileid, files[i]);
      this.fileNamesList.push(files[i].name);
    }
    if (this.user) {
      formData.append('user', this.user['user']);
      formData.append('pwd', this.user['pwd']);
    }
    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getAlertClass(submission_message) {
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
  }

}
