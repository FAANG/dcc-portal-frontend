import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-ruleset-analysis',
  templateUrl: './ruleset-analysis.component.html',
  styleUrls: ['./ruleset-analysis.component.css']
})
export class RulesetAnalysisComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG Rule set|analyses');
  }

}
