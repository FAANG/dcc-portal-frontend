import { Component, OnInit, Input } from '@angular/core';
import {ApiFileService} from '../../services/api-file.service';

@Component({
  selector: 'app-organism-specimen',
  templateUrl: './organism-specimen.component.html',
  styleUrls: ['./organism-specimen.component.css']
})
export class OrganismSpecimenComponent implements OnInit {
  @Input() biosampleId: string;
  specimenList: any;

  p = 1;

  constructor(private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.apiFileService.getOrganismsSpecimens(this.biosampleId).subscribe((data) => {
      this.specimenList = data;
    });
  }

}
