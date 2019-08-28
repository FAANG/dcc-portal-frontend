import {Component, Input, OnInit} from '@angular/core';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-dataset-related-template',
  templateUrl: './dataset-related-template.component.html',
  styleUrls: ['./dataset-related-template.component.css']
})
export class DatasetRelatedTemplateComponent implements OnInit {
  @Input() data: any[];
  @Input() entity: string;
  urls = [];
  checked = true;

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
    this.urls.forEach(url => FileSaver.saveAs(url));
  }

  onCheckboxClick(url: string) {
    url = 'ftp://' + url;
    const index = this.urls.indexOf(url);
    if (index !== -1) {
      this.urls.splice(index, 1);
    } else {
      this.urls.push(url);
    }
    if (this.disableButton() === true) {
      this.checked = false;
    } else {
      this.checked = true;
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

  mainCheckboxClicked() {
    if (this.checked === true) {
      this.urls = [];
    } else {
      for (const file of this.data) {
        const url = 'ftp://' + file['url'];
        const index = this.urls.indexOf(url);
        if (index === -1) {
          this.urls.push(url);
        }
      }
    }
    this.checked = !this.checked;
  }

}
