import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { validation_service_url } from '../shared/constants';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { validation_ws_url,
  trackhubs_template_with_examples,
  trackhubs_template_without_examples
} from '../shared/constants';
import { BulkFilesUploaderComponent } from '../bulk-files-uploader/bulk-files-uploader.component';
import { MatDialog, MatDialogContent} from '@angular/material/dialog';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatInput} from '@angular/material/input';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {ExtendedModule} from '@angular/flex-layout/extended';
import {NgClass, NgStyle} from '@angular/common';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow
} from '@angular/material/table';
import {MatTabGroup, MatTab} from '@angular/material/tabs';
import {FormsModule} from '@angular/forms';
import {MatRadioGroup, MatRadioButton} from '@angular/material/radio';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout/flex';
import {HeaderComponent} from '../shared/header/header.component';

@Component({
  selector: 'app-trackhubs-submission',
  templateUrl: './trackhubs-submission.component.html',
  styleUrls: ['./trackhubs-submission.component.css'],
  standalone: true,
  imports: [HeaderComponent, FlexModule, MatButton, BulkFilesUploaderComponent, MatRadioGroup, FormsModule, MatRadioButton, MatTabGroup,
    MatTab, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgClass, ExtendedModule, NgStyle, MatHeaderRowDef,
    MatHeaderRow, MatRowDef, MatRow, MatIcon, MatTooltip, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, MatIconButton,
    MatSuffix]
})
export class TrackhubsSubmissionComponent implements OnInit {
  @ViewChild(BulkFilesUploaderComponent, {static: true}) fileUploaderComponent!: BulkFilesUploaderComponent;
  @ViewChild('errorModalTemplate', {static: true}) public errorModalTemplate!: TemplateRef<any>;
  @ViewChild('loginModalTemplate', {static: true}) public loginModalTemplate!: TemplateRef<any>;
  uploadUrl = '';
  registration_success_msg = '';
  registration_failed_msg = '';
  socket: any;
  trackhubs_template_with_examples = trackhubs_template_with_examples;
  trackhubs_template_without_examples = trackhubs_template_without_examples;
  validation_results: { [index: string]: any } = {};
  registrationData: any;
  dialogRef: any;
  token: any;
  hide = true;
  username = '';
  password = '';
  error = '';
  user = {'modify': 'false'};
  tabs = ['Hub Data' , 'Genome Data', 'Tracks Data'];
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

  getCellClass(tab: string | number, index: string | number, col: any) {
    if (this.validation_results.hasOwnProperty('errors')
      && this.validation_results['errors'][tab][index].hasOwnProperty(col)) {
      return 'table-danger';
    }
    return '';
  }

  getCellStyle(tab: string | number, index: string | number, col: any) {
    if (this.validation_results.hasOwnProperty('errors')
      && this.validation_results['errors'][tab][index].hasOwnProperty(col)) {
      return 'pointer';
    }
    return 'auto';
  }

  tabHasError(tab: string) {
    if (this.validation_results.hasOwnProperty('errors')) {
      for (let i = 0; i < this.validation_results['errors'][tab].length; i += 1) {
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
    } else if (this.validation_results.hasOwnProperty('HubCheck Results') &&
      this.validation_results['HubCheck Results']['errors'].length) {
        return true;
    }
    return false;
  }

  showError(tab: string, index: string | number, col: string) {
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
    const payload = {
      'username': this.username,
      'password': btoa(this.password)
    };
    return this.http.post(url, payload).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleRegError),
    ).subscribe({
      next: (data) => {
        this.token = data['token'];
        this.user['user'] = this.username;
        this.user['pwd'] = btoa(this.password);
        this.dialogRef.close();
      },
      error: (error) => {
        this.error = error;
      }
    });
  }

  private handleRegError(error: HttpErrorResponse) {
    return throwError(() => error.error.reason);
  }

  logout() {
    this.token = '';
    this.username = '';
    this.password = '';
    this.error = '';
  }

  submitTrackHub() {
    const url = validation_ws_url + this.validation_results['fileid'] + '_submission/';
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event: any) => {
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
