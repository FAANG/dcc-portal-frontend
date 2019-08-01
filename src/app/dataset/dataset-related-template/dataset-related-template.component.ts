import {Component, Input, OnInit} from '@angular/core';
import * as multiDownload from 'multi-download';

@Component({
  selector: 'app-dataset-related-template',
  templateUrl: './dataset-related-template.component.html',
  styleUrls: ['./dataset-related-template.component.css']
})
export class DatasetRelatedTemplateComponent implements OnInit {
  @Input() data: any[];
  @Input() entity: string;
  urls = [];

  p = 1;

  constructor() { }

  ngOnInit() {
    if (this.entity === 'Files') {
      for (const file of this.data) {
        this.urls.push('ftp://' + file['url']);
      }
    }
  }

  showButton() {
    return this.entity === 'Files';
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
    console.log(this.urls.length);
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
