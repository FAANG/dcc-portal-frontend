import {Component, Input, OnInit} from '@angular/core';
import {ApiFileService} from '../../services/api-file.service';

@Component({
  selector: 'app-specimen-files',
  templateUrl: './specimen-files.component.html',
  styleUrls: ['./specimen-files.component.css']
})
export class SpecimenFilesComponent implements OnInit {
  @Input() biosampleId: string;
  fileList: any;
  p = 1;

  constructor(private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.apiFileService.getSpecimenFiles(this.biosampleId).subscribe((data) => this.fileList = data);
  }

}
