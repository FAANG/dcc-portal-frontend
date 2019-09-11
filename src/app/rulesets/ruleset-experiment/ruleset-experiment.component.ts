import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {convertToSnakeCase, allowMultiple, getValidItems, getOntologyTerm, getMandatoryData, generateEbiOntologyLink,
  experiment_metadata_template, experiment_metadata_template_with_examples} from '../../shared/constants';

@Component({
  selector: 'app-ruleset-experiment',
  templateUrl: './ruleset-experiment.component.html',
  styleUrls: ['../rulesets.css']
})
export class RulesetExperimentComponent implements OnInit, AfterViewChecked {
  error: string;
  data: any;
  all_data: any;
  mandatory_only: any;
  clicked = false;
  fragment: string;
  convertToSnakeCase: any;
  allowMultiple: any;
  getValidItems: any;
  getOntologyTerm: any;
  getMandatoryData: any;
  generateEbiOntologyLink: any;
  metadata_template: string;
  metadata_template_with_examples: string;

  constructor(private titleService: Title, private apiDataService: ApiDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.convertToSnakeCase = convertToSnakeCase;
    this.allowMultiple = allowMultiple;
    this.getValidItems = getValidItems;
    this.getOntologyTerm = getOntologyTerm;
    this.getMandatoryData = getMandatoryData;
    this.generateEbiOntologyLink = generateEbiOntologyLink;
    this.metadata_template = experiment_metadata_template;
    this.metadata_template_with_examples = experiment_metadata_template_with_examples;
    this.titleService.setTitle('FAANG Rule set|experiments');
    this.apiDataService.getRulesetExperiment().subscribe(
      data => {
        this.data = data;
        this.all_data = data;
        this.mandatory_only = this.getMandatoryData(data);
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
    if (this.clicked === false) {
      this.data = this.mandatory_only;
      this.clicked = true;
    } else {
      this.data = this.all_data;
      this.clicked = false;
    }
  }

}
