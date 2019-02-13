import { Component, OnInit } from '@angular/core';
import {FIELDEXCLUDENAMES, FIELDNAMES} from '../../shared/fieldnames';
import {ActivatedRoute, Params} from '@angular/router';
import {ApiFileService} from '../../services/api-file.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {protocolNames} from '../../shared/protocolnames';

@Component({
  selector: 'app-protocol-experiment-details',
  templateUrl: './protocol-experiment-details.component.html',
  styleUrls: ['./protocol-experiment-details.component.css']
})
export class ProtocolExperimentDetailsComponent implements OnInit {
  protocolId: string;
  protocol: any;
  error: any;
  experiment: any = {};
  fieldNames = FIELDNAMES;
  fieldExcludeNames = FIELDEXCLUDENAMES;
  experimentId: string;
  objectKeys = Object.keys;

  p = 1;

  constructor(private route: ActivatedRoute,
              private apiFileService: ApiFileService,
              private spinner: NgxSpinnerService,
              private titleService: Title,
              public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.protocolId = params['id'];
      this.titleService.setTitle(`${this.protocolId.split('-')[0]} | FAANG protocol`);
    });
    this.apiFileService.getExperimentProtocol(this.protocolId).subscribe(data => {
        this.protocol = data['hits']['hits'][0]['_source'];
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

  onClick(id: string) {
    this.experiment = {};
    this.experimentId = id;
    this.apiFileService.getFilesExperiment(id).subscribe(
      (data: any) => {
        this.expandObject(data['hits']['hits'][0]['_source']);
      },
      error => {
        this.error = error;
      }
    );
  }

  expandObject(myObject: any) {
    for (const key in myObject) {
      if (key in this.fieldNames) {
        if (typeof myObject[key] === 'object') {
          for (const secondaryKey in myObject[key]) {
            if (myObject[key][secondaryKey] !== '') {
              this.experiment[key] = myObject[key];
            }
          }
        } else {
          if (myObject[key] !== '') {
            this.experiment[key] = myObject[key];
          }
        }
      } else {
        if (key in this.fieldExcludeNames) {
          continue;
        } else {
          this.expandObject(myObject[key]);
        }
      }
    }
  }

  checkIsObject(value: any) {
    if (typeof value === 'object') {
      return true;
    } else {
      return false;
    }
  }

}
