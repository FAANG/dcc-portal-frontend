import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-ruleset-experiment',
  templateUrl: './ruleset-experiment.component.html',
  styleUrls: ['./ruleset-experiment.component.css']
})
export class RulesetExperimentComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG Rule set|experiments');
  }

}
