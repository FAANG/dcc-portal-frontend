import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
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
  link: string;
  p = 1;

  constructor(private route: ActivatedRoute,
              private router: Router,
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
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.file = data['hits']['hits'][0]['_source'];
          if (this.file) {
            this.spinner.hide();
            this.getProtocolLink();
          }
        }
      },
      error => {
        this.spinner.hide();
        this.error = error;
      });
  }

  getProtocolLink() {
    if (this.file.url.split('//')[0] === 'ftp:') {
      this.link = 'http://' + this.file.url.split('//')[1];
    } else {
      this.link = this.file.url;
    }
  }

}
