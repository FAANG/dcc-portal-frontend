import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiFileService} from '../services/api-file.service';

@Component({
  selector: 'app-ruleset-sample',
  templateUrl: './ruleset-sample.component.html',
  styleUrls: ['./ruleset-sample.component.css']
})
export class RulesetSampleComponent implements OnInit {
  error: string;
  data: any;

  constructor(private titleService: Title, private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG Rule set|samples');
    this.apiFileService.getRulesetSample().subscribe(
      data => {
        this.data = data;
        console.log(data);
      },
      error => {
        this.error = error;
      }
    );
  }

}
