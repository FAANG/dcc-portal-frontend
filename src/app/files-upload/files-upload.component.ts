import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {validation_service_url} from '../shared/constants';
import {makeid} from '../shared/common_functions';

const UploadURL = validation_service_url + '/conversion/samples';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css']
})
export class FilesUploadComponent implements OnInit {
  fileid = makeid(20);
  public uploader: FileUploader = new FileUploader({url: UploadURL, itemAlias: this.fileid});
  public link: string;

  constructor() { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response);
      setTimeout(() => {
        this.link = 'https://data.faang.org/api/fire_api/samples/ROSLIN_SOP_GENESWITCH_E15_EMBRYO_SAMPLING_20200915.pdf';
      }, 3000);
    };
  }

}
