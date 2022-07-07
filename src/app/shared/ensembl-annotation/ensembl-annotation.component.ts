import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ApiDataService} from '../../services/api-data.service';
import {UserService} from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ensembl-annotation',
  templateUrl: './ensembl-annotation.component.html',
  styleUrls: ['./ensembl-annotation.component.css']
})
export class EnsemblAnnotationComponent implements OnInit {
  @Input() project_name: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  totalHits = 0;
  displayedColumns: string[] = ['species', 'accession', 'assembly_submitter', 'annotation', 'proteins',
    'transcripts', 'softmasked_genome', 'repeat_library', 'other_data', 'browser_view'];

  constructor(
    private dataService: ApiDataService,
    private _userService: UserService,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);

    // fetch data from ES
    this.fetchData();

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.fetchData();
    });

    this.paginator.page.subscribe(() => {
      this.fetchData();
    });
  }

  fetchData() {
    this.dataService.getEnsemblAnnotationData(this.project_name, this.getSort(), this.paginator.pageIndex * 10).subscribe(
      (res: any) => {
        this.dataSource.data = res['data'];
        this.totalHits = res['totalHits'];
      }
    );
  }

  getSort() {
    if (this.sort.active && this.sort.direction) {
      return this.sort.active + '.keyword:' + this.sort.direction;
    } else {
      return 'species.keyword:asc';
    }
  }

}
