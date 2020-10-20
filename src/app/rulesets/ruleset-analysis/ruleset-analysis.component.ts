import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {
  allowMultipleOld,
  convertToSnakeCase,
  generateEbiOntologyLinkOld,
  getMandatoryRulesOnlyOld,
  getOntologyTermFromIRI,
  getValidItems,
  replaceUnderscoreWithSpace
} from '../../shared/common_functions';
import {analysis_metadata_template_with_examples, analysis_metadata_template_without_examples} from '../../shared/constants';

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
  mandatory_only = false;
  fragment: string;
  convertToSnakeCase: any;
  allowMultiple: any;
  getValidItems: any;
  getOntologyTerm: any;
  getMandatoryData: any;
  generateEbiOntologyLink: any;
  replaceUnderscoreWithSpace: any;
  metadata_template_with_examples: string;
  metadata_template_without_examples: string;
  record_specific_templates = {
    faang: '../../../assets/faang.xlsx',
    ena: '../../../assets/ena.xlsx',
    eva: '../../../assets/eva.xlsx'
  };

  constructor(private titleService: Title, private apiDataService: ApiDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.convertToSnakeCase = convertToSnakeCase;
    this.replaceUnderscoreWithSpace = replaceUnderscoreWithSpace;
    this.allowMultiple = allowMultipleOld;
    this.getValidItems = getValidItems;
    this.getOntologyTerm = getOntologyTermFromIRI;
    this.getMandatoryData = getMandatoryRulesOnlyOld;
    this.generateEbiOntologyLink = generateEbiOntologyLinkOld;
    this.metadata_template_with_examples = analysis_metadata_template_with_examples;
    this.metadata_template_without_examples = analysis_metadata_template_without_examples;
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
    return this.convertToSnakeCase(category) === this.fragment;
  }

  mandatoryOnlyToggle() {
    if (this.mandatory_only === false) {
      this.data = this.mandatory_data;
      this.mandatory_only = true;
    } else {
      this.data = this.all_data;
      this.mandatory_only = false;
    }
  }

}
