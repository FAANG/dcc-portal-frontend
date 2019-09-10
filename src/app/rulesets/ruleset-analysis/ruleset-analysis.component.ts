import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {removeSpaces, allowMultiple, getValidItems, getLink, getCondition, getMandatoryData} from '../../shared/constants';

@Component({
  selector: 'app-ruleset-analysis',
  templateUrl: './ruleset-analysis.component.html',
  styleUrls: ['../rulesets.css']
})
export class RulesetAnalysisComponent implements OnInit, AfterViewChecked {
  error: string;
  data: any;
  all_data: any;
  mandatory_data: any;
  clicked = false;
  fragment: string;
  removeSpaces: any;
  allowMultiple: any;
  getValidItems: any;
  getLink: any;
  getCondition: any;
  getMandatoryData: any;

  constructor(private titleService: Title, private apiDataService: ApiDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.removeSpaces = removeSpaces;
    this.allowMultiple = allowMultiple;
    this.getValidItems = getValidItems;
    this.getLink = getLink;
    this.getCondition = getCondition;
    this.getMandatoryData = getMandatoryData;
    this.titleService.setTitle('FAANG Rule set|analyses');
    this.apiDataService.getRulesetAnalysis().subscribe(
      data => {
        this.data = data;
        this.all_data = data;
        this.mandatory_data = this.getMandatoryData(data);
      },
      error => {
        this.error = error;
      }
    );
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
  }

  ngAfterViewChecked(): void {
    try {
      if (this.fragment) {
        document.querySelector('#' + this.fragment).scrollIntoView();
      }
    } catch (e) {}
  }

  checkIsActive(category: string) {
    return this.removeSpaces(category) === this.fragment;
  }

  onCheckBoxClick() {
    if (this.clicked === false) {
      this.data = this.mandatory_data;
      this.clicked = true;
    } else {
      this.data = this.all_data;
      this.clicked = false;
    }
  }

}
