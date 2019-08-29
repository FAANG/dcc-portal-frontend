import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiFileService} from '../services/api-file.service';

@Component({
  selector: 'app-ruleset-analysis',
  templateUrl: './ruleset-analysis.component.html',
  styleUrls: ['./ruleset-analysis.component.css']
})
export class RulesetAnalysisComponent implements OnInit {
  error: string;
  data: any;

  constructor(private titleService: Title, private apiFileService: ApiFileService) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG Rule set|analyses');
    this.apiFileService.getRulesetAnalysis().subscribe(
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
