import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiFileService} from '../services/api-file.service';

@Component({
  selector: 'app-ruleset-experiment',
  templateUrl: './ruleset-experiment.component.html',
  styleUrls: ['./ruleset-experiment.component.css']
})
export class RulesetExperimentComponent implements OnInit {
  error: string;
  data: any;

  constructor(private titleService: Title, private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG Rule set|experiments');
    this.apiFileService.getRulesetExperiment().subscribe(
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
