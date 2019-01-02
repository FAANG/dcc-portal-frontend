import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ApiFileService} from '../../../services/api-file.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {protocolNames} from '../../../shared/protocolnames';

@Component({
  selector: 'app-protocol-experiments-detail',
  templateUrl: './protocol-experiments-detail.component.html',
  styleUrls: ['./protocol-experiments-detail.component.css']
})
export class ProtocolExperimentsDetailComponent implements OnInit {
  protocolId: string;
  protocol: any;
  error: any;

  p = 1;

  constructor(private route: ActivatedRoute,
              private apiFileService: ApiFileService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.protocolId = params['id'];
      this.titleService.setTitle(`${this.protocolId.split('-')[0]} | FAANG protocol`);
      console.log(this.protocolId);
    });
    this.apiFileService.getExperimentProtocol(this.protocolId).subscribe(data => {
      this.protocol = data[0];
      if (this.protocol) {
        this.spinner.hide();
      }
    },
      error => {
      this.spinner.hide();
      this.error = error;
      });
  }

  getHumanName(data) {
    return protocolNames[data];
  }

}
