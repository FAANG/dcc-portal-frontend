import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {sample_metadata_template_with_examples, sample_metadata_template_without_examples} from '../../shared/constants';
import {
  allowMultiple,
  convertToSnakeCase,
  generateEbiOntologyLink,
  getMandatoryRulesOnly,
  getOntologyTermFromIRI,
  getValidItems,
  replaceUnderscoreWithSpace
} from '../../shared/common_functions';

@Component({
  selector: 'app-ruleset-sample',
  templateUrl: './ruleset-sample.component.html',
  styleUrls: ['../rulesets.css']
})
export class RulesetSampleComponent implements OnInit, AfterViewChecked {
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
    animal: '../../../assets/animal.xlsx',
    specimen: '../../../assets/specimen.xlsx',
    pool_of_specimens: '../../../assets/pool_of_specimens.xlsx',
    purified_cells: '../../../assets/purified_cells.xlsx',
    cell_culture: '../../../assets/cell_culture.xlsx',
    cell_line: '../../../assets/cell_line.xlsx',
  };

  constructor(private titleService: Title, private apiDataService: ApiDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.convertToSnakeCase = convertToSnakeCase;
    this.replaceUnderscoreWithSpace = replaceUnderscoreWithSpace;
    this.allowMultiple = allowMultiple;
    this.getValidItems = getValidItems;
    this.getOntologyTerm = getOntologyTermFromIRI;
    this.getMandatoryData = getMandatoryRulesOnly;
    this.generateEbiOntologyLink = generateEbiOntologyLink;
    this.metadata_template_with_examples = sample_metadata_template_with_examples;
    this.metadata_template_without_examples = sample_metadata_template_without_examples;
    this.titleService.setTitle('FAANG Rule set|samples');
    this.apiDataService.getRulesetSample().subscribe(
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

  getCondition(condition: any) {
    if (condition['attribute_value_match']['Material'].length === 1) {
      return ' Material is "' + condition['attribute_value_match']['Material'][0] + '"';
    } else {
      let str_to_return = ' Material is one of ';
      for (const el of condition['attribute_value_match']['Material']) {
        str_to_return += '"' + el + '" ';
      }
      return str_to_return;
    }
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
