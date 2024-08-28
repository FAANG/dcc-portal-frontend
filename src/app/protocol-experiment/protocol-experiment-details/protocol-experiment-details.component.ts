import { Component, OnInit, ViewChild } from '@angular/core';
import {FIELD_NAMES} from '../../shared/fieldnames';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import { NgxSmartModalService, NgxSmartModalModule } from 'ngx-smart-modal';
import {protocolNames} from '../../shared/protocolnames';
import {getProtocolLink, expandObject} from '../../shared/common_functions';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow,
  MatRowDef, MatRow } from '@angular/material/table';
import { SlicePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-protocol-experiment-details',
  templateUrl: './protocol-experiment-details.component.html',
  styleUrls: ['./protocol-experiment-details.component.css'],
  standalone: true,
  imports: [HeaderComponent, FlexModule, RobustLinkComponent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell,
    MatSortHeader, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, NgxSmartModalModule, MatButton,
    SlicePipe]
})
export class ProtocolExperimentDetailsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  expandObject: any;
  protocolId = '';
  protocol: any;
  error: any;
  experiment: any = {};
  fieldNames = FIELD_NAMES;
  experimentId = '';
  objectKeys = Object.keys;
  link = '';
  display_fields = ['accession', 'sampleStorage', 'sampleStorageProcessing'];
  column_names = ['Accession number', 'Sample storage', 'Sample storage processing'];

  p = 1;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title,
              public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.expandObject = expandObject;
    void this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.protocolId = params['id'];
      if (this.protocolId) {
        this.titleService.setTitle(`${this.protocolId.split('-')[0]} | FAANG protocol`);
      }
    });
    this.dataSource = new MatTableDataSource<any[]>([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataService.getExperimentProtocol(this.protocolId).subscribe({
      next: data => {
        if (data['hits']['hits'].length === 0) {
          void this.spinner.hide();
          void this.router.navigate(['404']);
        } else {
          this.protocol = data['hits']['hits'][0]['_source'];
          if (this.protocol) {
            void this.spinner.hide();
            this.link = getProtocolLink(this.protocol.url);
            if (this.protocol['experiments']) {
              this.dataSource.data = this.protocol['experiments'];
            }
          }
        }
      },
      error: error => {
        void this.spinner.hide();
        this.error = error;
      }
    });
  }

  getHumanName(data: string) {
    return protocolNames[data] ? protocolNames[data] : data;
  }

  onClick(id: string) {
    this.experiment = {};
    this.experimentId = id;
    this.dataService.getExperimentByAccession(id).subscribe({
      next: (data: any) => {
        this.experiment = this.expandObject(data['hits']['hits'][0]['_source'], this.experiment);
      },
      error: error => {
        this.error = error;
      }
    });
  }

  checkIsObject(value: any) {
    return typeof value === 'object';
  }

}
