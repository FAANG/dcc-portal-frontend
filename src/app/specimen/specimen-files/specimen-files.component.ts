import {Component, Input, OnInit} from '@angular/core';
import {ApiFileService} from '../../services/api-file.service';
import * as multiDownload from 'multi-download';

@Component({
  selector: 'app-specimen-files',
  templateUrl: './specimen-files.component.html',
  styleUrls: ['./specimen-files.component.css']
})
export class SpecimenFilesComponent implements OnInit {
  @Input() biosampleId: string;
  fileList: any;
  urls = [];
  p = 1;

  constructor(private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.apiFileService.getSpecimenFiles(this.biosampleId).subscribe((data) => {
      this.fileList = data;
      for (let url of this.fileList['hits']['hits']) {
        url = 'ftp://' + url['_source']['url'];
        this.urls.push(url);
      }
    });
  }

  downloadAllFiles() {
    multiDownload(this.urls);
  }

  disableButton() {
    return this.urls.length === 0;
  }

  getUrlsLength() {
    return this.urls.length;
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

  CheckboxChecked(url: string) {
    url = 'ftp://' + url;
    return this.urls.indexOf(url) !== -1;
  }

}
