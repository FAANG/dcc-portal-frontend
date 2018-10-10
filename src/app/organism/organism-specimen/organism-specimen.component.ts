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
  private query = {
    'query': {
      'filtered': {
        'filter': {
          'term': {'organism.biosampleId' : this.biosampleId}
        }
      }
    },
    'sort': [
      {'name': 'asc'}
    ],
    'size': 1000000,
  };

  p = 1;

  constructor(private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.apiFileService.getOrganismsSpecimens(this.query).subscribe((data) => {
      this.specimenList = data;
    });
  }

}
