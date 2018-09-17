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

  constructor(private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.apiFileService.getFilesByRun(this.runId).subscribe((data) => {
      this.fileList = data;
    });
  }

}
