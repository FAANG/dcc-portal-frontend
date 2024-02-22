import { Component, OnInit } from '@angular/core';
import { validation_service_url } from '../shared/constants';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css']
})
export class FilesUploadComponent implements OnInit {
  public previousPage: string;
  public UploadURL: string;

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.previousPage = params['from'];
    });
  }

  ngOnInit() {
    this.titleService.setTitle('FAANG upload protocols');
    this.UploadURL = `${validation_service_url}/protocols_upload/${this.previousPage}`;
  }

  chooseProtocolType(protocolType: string) {
    this.UploadURL = `${validation_service_url}/protocols_upload/${protocolType}`;
  }

}
