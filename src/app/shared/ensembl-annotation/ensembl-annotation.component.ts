import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiDataService} from '../../services/api-data.service';
import {UserService} from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow,
  MatRowDef, MatRow } from '@angular/material/table';

@Component({
  selector: 'app-ensembl-annotation',
  templateUrl: './ensembl-annotation.component.html',
  styleUrls: ['./ensembl-annotation.component.css'],
  standalone: true,
  imports: [MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatSortHeader, MatHeaderRowDef,
    MatHeaderRow, MatRowDef, MatRow, MatPaginator]
})
export class EnsemblAnnotationComponent implements OnInit {
  @Input() projectArr: string[] = [];
  @Input() parentComponent = '';


  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  totalHits = 0;
  displayedColumns: string[] = ['species', 'accession', 'assembly_submitter', 'annotation', 'proteins',
    'transcripts', 'softmasked_genome', 'repeat_library', 'other_data', 'browser_view'];
  tableDefinitions = [
    {
      columnDefinition: 'species',
      columnTitle: 'Species',
      cellVar: 'species'
    },
    {
      columnDefinition: 'accession',
      columnTitle: 'Accession',
      cellVar: 'accession'
    },
    {
      columnDefinition: 'assembly_submitter',
      columnTitle: 'Assembly submitted by',
      cellVar: 'assembly_submitter'
    },
    {
      columnDefinition: 'annotation',
      columnTitle: 'Annotation',
      cellVar: 'annotation',
      span: {
        href: 'fileUrl',
        linkText: 'annotation'
      }
    },
    {
      columnDefinition: 'proteins',
      columnTitle: 'Proteins',
      cellVar: 'proteins',
      span: {
        href: 'fileUrl',
        linkText: 'fileType'
      }
    },
    {
      columnDefinition: 'transcripts',
      columnTitle: 'Transcripts',
      cellVar: 'transcripts',
      span: {
        href: 'fileUrl',
        linkText: 'fileType'
      }
    },
    {
      columnDefinition: 'softmasked_genome',
      columnTitle: 'Softmasked genome',
      cellVar: 'softmasked_genome',
      span: {
        href: 'fileUrl',
        linkText: 'fileType'
      }
    },
    {
      columnDefinition: 'repeat_library',
      columnTitle: 'Repeat library',
      cellVar: 'repeat_library',
      span: {
        href: 'fileUrl',
        linkText: 'library'
      }
    },
    {
      columnDefinition: 'other_data',
      columnTitle: 'Other data',
      cellVar: 'other_data',
      span: {
        href: 'fileUrl',
        linkText: 'otherData'
      }
    },
    {
      columnDefinition: 'browser_view',
      columnTitle: 'View in browser',
      cellVar: 'browser_view',
      span: {
        href: 'fileUrl',
        linkText: 'browserView'
      }
    }
  ];

  constructor(
    private dataService: ApiDataService) {
  }

  ngOnInit() {
    if (this.parentComponent === 'eurofaangMainPage') {
      this.displayedColumns.push('project');

      const projObj = {
        columnDefinition: 'project',
        columnTitle: 'Project',
        cellVar: 'project',
      };
      this.tableDefinitions.push(projObj);

    }

    this.dataSource = new MatTableDataSource<any[]>([]);

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

  ngOnChanges() {
    setTimeout(() => {
      this.fetchData();
    }, Math.floor(Math.random() * 200));
  }

  fetchData() {
    this.dataService.getEnsemblAnnotationData(this.projectArr, this.getSort(), this.paginator.pageIndex * 10).subscribe(
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
