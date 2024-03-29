import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { validation_service_url } from '../shared/constants';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { validation_ws_url, 
  trackhubs_template_with_examples, 
  trackhubs_template_without_examples 
} from '../shared/constants';
import { BulkFilesUploaderComponent }  from '../bulk-files-uploader/bulk-files-uploader.component';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-trackhubs-submission',
  templateUrl: './trackhubs-submission.component.html',
  styleUrls: ['./trackhubs-submission.component.css']
})
export class TrackhubsSubmissionComponent implements OnInit { 
  @ViewChild(BulkFilesUploaderComponent, { static: true }) fileUploaderComponent: BulkFilesUploaderComponent;
  @ViewChild('errorModalTemplate', { static: true }) public errorModalTemplate: TemplateRef<any>;
  @ViewChild('loginModalTemplate', { static: true }) public loginModalTemplate: TemplateRef<any>;
  uploadUrl;
  registration_success_msg;
  registration_failed_msg;
  socket;
  trackhubs_template_with_examples = trackhubs_template_with_examples;
  trackhubs_template_without_examples = trackhubs_template_without_examples;
  validation_results;
  registrationData;
  dialogRef;
  token;
  hide = true;
  username: string;
  password: string;
  error: string;
  user = {'modify': 'false'};
  tabs = ['Hub Data' ,'Genome Data', 'Tracks Data']
  columns = {
    'Hub Data': ['Name', 'Short Label', 'Long Label', 'Email', 'Description File Path'],
    'Genome Data': ['Assembly Accession', 'Organism', 'Description'],
    'Tracks Data': ['Track Name', 'File Path', 'File Type', 'Short Label', 'Long Label', 'Related Specimen ID', 'Subdirectory']
  };

  constructor(private titleService: Title,
              private http: HttpClient,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG upload track hubs');
    this.uploadUrl = `${validation_service_url}/trackhub/validation/`;

    this.fileUploaderComponent.messageUpdate.subscribe((results) => {
      this.validation_results = results;
      if (!this.hasError()) {
        this.registrationData = results;
      }
    });
  }

  getCellClass(tab, index, col) {
    if (this.validation_results.hasOwnProperty('errors') 
      && this.validation_results['errors'][tab][index].hasOwnProperty(col)) {
      return 'table-danger';
    }
    return '';
  }

  getCellStyle(tab, index, col) {
    if (this.validation_results.hasOwnProperty('errors') 
      && this.validation_results['errors'][tab][index].hasOwnProperty(col)) {
      return 'pointer';
    }
    return 'auto';
  }

  tabHasError(tab) {
    if (this.validation_results.hasOwnProperty('errors')) {
      for (let i=0; i<this.validation_results['errors'][tab].length; i+=1) {
        if (Object.keys(this.validation_results['errors'][tab][i]).length > 0) {
          return true;
        }
      }
    }
    return false;
  }

  hasError() {
    if (this.tabHasError('Hub Data') || this.tabHasError('Genome Data') 
      || this.tabHasError('Tracks Data')) {
      return true;
    }
    else if (this.validation_results.hasOwnProperty('HubCheck Results') && 
      this.validation_results['HubCheck Results']['errors'].length) {
        return true;
    }
    return false;
  }

  showError(tab, index, col) {
    if (this.validation_results.hasOwnProperty('errors') 
      && this.validation_results['errors'][tab][index].hasOwnProperty(col)) {  
      this.dialogRef = this.dialog.open(this.errorModalTemplate, {
        width: '30%',
        data: {
          'header': tab + ': ' + col,
          'error': this.validation_results['errors'][tab][index][col]
        }
      });
    }
  }

  openLoginModal() {
    this.dialogRef = this.dialog.open(this.loginModalTemplate, {
      width: '40%',
      data: {}
    });
  }

  login() {
    const url = validation_service_url + '/trackhub/login/';
    let payload = {
      'username': this.username,
      'password': btoa(this.password)
    }
    return this.http.post(url, payload).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleRegError),
    ).subscribe(
      (data) => {
        this.token = data['token'];
        this.user['user'] = this.username;
        this.user['pwd'] = btoa(this.password);
        this.dialogRef.close();
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private handleRegError(error: HttpErrorResponse) {
    return throwError(error.error.reason);
  }

  logout() {
    this.token = null;
    this.username = null;
    this.password = null;
    this.error = null;
  }

  submitTrackHub() {
    const url = validation_ws_url + this.validation_results['fileid'] + '_submission/';
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)['response'];
      if (data['submission_message']) {
        this.registration_success_msg = data['submission_message'];
      }
      if (data['errors']) {
        this.registration_success_msg = '';
        this.registration_failed_msg = data['errors'];
      }
    };
    const submitUrl = `${validation_service_url}/trackhub/submission/`;
    return this.http.post(submitUrl, this.registrationData).subscribe();
  }

}
