import { Component, OnInit } from '@angular/core';
import { validation_service_url } from '../shared/constants';
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
  trackhub = {};
  stage;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG upload track hubs');
    this.stage = 'form';
  }

  startUploads(genome: string, directory: string) {
    this.stage = 'upload';
    this.tracksUploadUrl = `${validation_service_url}/trackhubs/${genome}/${directory}`;
    this.textFileUploadUrl = `${validation_service_url}/trackhubs/${genome}`;
  }

}
