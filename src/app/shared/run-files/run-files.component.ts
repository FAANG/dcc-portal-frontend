import {Component, Input, OnInit} from '@angular/core';
import {ApiFileService} from '../../services/api-file.service';
import * as multiDownload from 'multi-download';

@Component({
  selector: 'app-run-files',
  templateUrl: './run-files.component.html',
  styleUrls: ['./run-files.component.css']
})
export class RunFilesComponent implements OnInit {
  @Input() runId: string;
  fileList: any;
  urls = [];
  constructor(private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.apiFileService.getFilesByRun(this.runId).subscribe((data) => {
      this.fileList = data;
      for (const url of this.fileList['hits']['hits']) {
        this.urls.push('ftp://' + url['_source']['url']);
      }
    });
  }

  downloadAllFiles() {
    multiDownload(this.urls);
  }

  onCheckboxClick(url: string) {
    url = 'ftp://' + url;
    const index = this.urls.indexOf(url);
    if (index !== -1) {
      this.urls.splice(index, 1);
    } else {
      this.urls.push(url);
    }
  }

  disableButton() {
    return this.urls.length === 0;
  }

  getUrlsLength() {
    return this.urls.length;
  }

  CheckboxChecked(url: string) {
    url = 'ftp://' + url;
    return this.urls.indexOf(url) !== -1;
  }

}
