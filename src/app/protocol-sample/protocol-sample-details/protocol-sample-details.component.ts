import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ApiFileService} from '../../services/api-file.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-protocol-sample-details',
  templateUrl: './protocol-sample-details.component.html',
  styleUrls: ['./protocol-sample-details.component.css']
})
export class ProtocolSampleDetailsComponent implements OnInit {
  fileId: string;
  file: any;
  error: any;

  p = 1;

  constructor(private route: ActivatedRoute,
              private apiFileService: ApiFileService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.fileId = params['id'];
      this.titleService.setTitle(`${this.fileId} | FAANG protocol`);
    });
    this.apiFileService.getSampleProtocol(this.fileId).subscribe(data => {
        this.file = data[0];
        if (this.file) {
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
        this.error = error;
      });
  }

  getProtocolLink() {
    if (this.file.url.split('//')[0] === 'ftp:') {
      return 'http://' + this.file.url.split('//')[1];
    } else {
      return this.file.url;
    }
  }

}
