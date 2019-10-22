import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FileUploader} from 'ng2-file-upload';

const UploadURL = 'http://localhost:8000/conversion/samples';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: UploadURL, itemAlias: 'file'});

  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG validation');
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded:', item, status, response);
    };
  }

}
