import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {getProtocolLink} from '../../shared/common_functions';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-protocol-analysis-details',
  templateUrl: './protocol-analysis-details.component.html',
  styleUrls: ['./protocol-analysis-details.component.css']
})
export class ProtocolAnalysisDetailsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  fileId: string;
  file: any;
  error: any;
  link: string;
  p = 1;
  display_fields = ['accession', 'analysisType', 'organism', 'datasetAccession']
  column_names = ['Accession', 'Analysis Type', 'Organism', 'Dataset']

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.fileId = params['id'];
      this.titleService.setTitle(`${this.fileId} | FAANG protocol`);
    });
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataService.getAnalysisProtocol(this.fileId).subscribe(data => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.file = data['hits']['hits'][0]['_source'];
          if (this.file) {
            if (this.file.analyses) {
              this.dataSource.data = this.file['analyses'];
            }
            this.spinner.hide();
            this.link = getProtocolLink(this.file.url);
          }
        }
      },
      error => {
        this.spinner.hide();
        this.error = error;
      });
  }

  checkIsArray(variable: any) {
    return Array.isArray(variable);
  }

}
