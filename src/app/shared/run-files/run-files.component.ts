import {Component, Input, OnInit} from '@angular/core';
import {ApiFileService} from '../../services/api-file.service';

@Component({
  selector: 'app-run-files',
  templateUrl: './run-files.component.html',
  styleUrls: ['./run-files.component.css']
})
export class RunFilesComponent implements OnInit {
  @Input() runId: string;
  fileList: any;
  private query = {
    'query': {
      'filtered': {
        'filter': {
          'term': {'run.accession' : this.runId}
        }
      }
    },
    'sort': [
      {'name': 'asc'}
    ]
  };

  constructor(private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.apiFileService.getFilesByRun(this.query).subscribe((data) => {
      this.fileList = data;
    });
  }

}
