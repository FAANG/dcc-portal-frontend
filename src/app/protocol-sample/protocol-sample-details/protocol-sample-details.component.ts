import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {getProtocolLink} from '../../shared/common_functions';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-protocol-sample-details',
  templateUrl: './protocol-sample-details.component.html',
  styleUrls: ['./protocol-sample-details.component.css']
})
export class ProtocolSampleDetailsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  fileId: string;
  file: any;
  error: any;
  link: string;
  p = 1;
  display_fields = ['id', 'organismPartCellType', 'organism', 'breed', 'derivedFrom']
  column_names = ['Specimen', 'Organism part/Cell type', 'Organism', 'Breed', 'Derived from']

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
    this.dataService.getSampleProtocol(this.fileId).subscribe(data => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.file = data['hits']['hits'][0]['_source'];
          if (this.file) {
            if (this.file.specimens) {
              this.dataSource.data = this.file['specimens'];
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
