import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {experiment_metadata_template_with_examples, experiment_metadata_template_without_examples} from '../../shared/constants';
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
  selector: 'app-ruleset-experiment',
  templateUrl: './ruleset-experiment.component.html',
  styleUrls: ['../rulesets.css']
})
export class RulesetExperimentComponent implements OnInit, AfterViewChecked {
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
    'ATAC-seq': '../../../assets/atac-seq.xlsx',
    'BS-seq': '../../../assets/bs-seq.xlsx',
    'ChIP-seq_DNA-binding_proteins': '../../../assets/dna-binding_proteins.xlsx',
    'ChIP-seq_input_DNA': '../../../assets/input_dna.xlsx',
    'DNase-seq': '../../../assets/dnase-seq.xlsx',
    'Hi-C': '../../../assets/hi-c.xlsx',
    'RNA-seq': '../../../assets/rna-seq.xlsx',
    'WGS': '../../../assets/wgs.xlsx',
    'CAGE-seq': '../../../assets/cage-seq.xlsx'
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
    this.metadata_template_with_examples = experiment_metadata_template_with_examples;
    this.metadata_template_without_examples = experiment_metadata_template_without_examples;
    this.titleService.setTitle('FAANG Rule set|experiments');
    this.apiDataService.getRulesetExperiment().subscribe(
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
