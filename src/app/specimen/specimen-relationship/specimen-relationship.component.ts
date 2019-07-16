import {Component, Input, OnInit} from '@angular/core';
import {ApiFileService} from '../../services/api-file.service';

@Component({
  selector: 'app-specimen-relationship',
  templateUrl: './specimen-relationship.component.html',
  styleUrls: ['./specimen-relationship.component.css']
})
export class SpecimenRelationshipComponent implements OnInit {
  @Input() biosampleId: string;
  specimenList: any;
  p = 1; // page number for html template

  constructor(private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.apiFileService.getSpecimenRelationships(this.biosampleId).subscribe((data) => {
      this.specimenList = data;
    });
  }

}
