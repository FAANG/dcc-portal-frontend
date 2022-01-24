import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ApiDataService} from '../../services/api-data.service';
import {
  experiment_metadata_template_with_examples,
  experiment_metadata_template_without_examples, missing_values,
  special_sheets
} from '../../shared/constants';
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
  styleUrls: ['../rulesets.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})
export class RulesetExperimentComponent implements OnInit {
  error: any;
  data: any;
  all_data: any;
  mandatory_data: any;
  mandatory_only = false;
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
  rule_groups = [];
  rules = [];
  active_rule: string;
  length: number;
  name: string;
  description: string;
  details: string;
  location: Location;

  constructor(private titleService: Title,
              private apiDataService: ApiDataService,
              private route: ActivatedRoute,
              private router: Router,
              location: Location) {
    this.location = location;
  }

  ngOnInit() {
    this.rule_groups = [
      'Standard',
      'ATAC-seq',
      'BS-seq',
      'ChIP-seq standard rules',
      'ChIP-seq DNA-binding proteins',
      'ChIP-seq input DNA',
      'DNase-seq',
      'Hi-C',
      'RNA-seq',
      'WGS',
      'CAGE-seq',
      'scRNA-seq'];
    this.active_rule = 'Standard';
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

    this.route.fragment
      .subscribe(
        (fragment: string) => {
          if (fragment) {
            this.clickOnRule(fragment);
          } else {
            this.clickOnRule('standard');
          }
        }
      );
  }

  getCondition(rule: string) {
    if (this.active_rule === 'ATAC-seq' && rule === 'self') {
      return 'ATAC-seq';
    } else if (this.active_rule === 'BS-seq' && rule === 'self') {
      return 'methylation profiling by high throughput sequencing';
    } else if (this.active_rule === 'ChIP-seq standard rules' && rule === 'self') {
      return 'ChIP-seq';
    } else if (this.active_rule === 'ChIP-seq DNA-binding proteins' && rule === 'self') {
      return 'ChIP-seq';
    } else if (this.active_rule === 'ChIP-seq input DNA' && rule === 'self') {
      return 'ChIP-seq';
    } else if (this.active_rule === 'DNase-seq' && rule === 'self') {
      return 'DNase-Hypersensitivity seq';
    } else if (this.active_rule === 'Hi-C' && rule === 'self') {
      return 'Hi-C';
    } else if (this.active_rule === 'WGS' && rule === 'self') {
      return 'whole genome sequencing assay';
    } else if (this.active_rule === 'CAGE-seq' && rule === 'self') {
      return 'CAGE-seq';
    } else if (this.active_rule === 'scRNA-seq' && rule === 'self') {
      return 'scRNA-seq';
    }
  }

  getType(data: any) {
    let field;
    if ('properties' in data) {
      field = data['properties'];
    } else {
      field = data['items']['properties'];
    }
    if ('value' in field && 'type' in field['value']) {
      if ('format' in field['value']) {
        return field['value']['format'];
      }
      return field['value']['type'];
    } else if ('value' in field && 'const' in field['value']) {
      return 'constant';
    } else if ('text' in field && 'term' in field) {
      return 'ontology id';
    } else if ('value' in field && 'oneOf' in field['value']) {
      for (const record of field['value']['oneOf']) {
        if ('format' in record) {
          return record['format'];
        }
        if ('type' in record) {
          return record['type'];
        }
      }
    }
  }

  getMandatoryField(data: any) {
    if ('properties' in data) {
      return data['properties']['mandatory']['const'];
    } else {
      return data['items']['properties']['mandatory']['const'];
    }
  }

  getValidValues(data: any) {
    let field;
    if ('properties' in data) {
      field = data['properties'];
    } else {
      field = data['items']['properties'];
    }
    if ('value' in field && 'enum' in field['value']) {
      return field['value']['enum'].filter(term => missing_values.indexOf(term) === -1).join(', ');
    } else if ('value' in field && 'const' in field['value']) {
      return field['value']['const'];
    } else if ('text' in field && 'enum' in field['text']) {
      return field['text']['enum'].filter(term => missing_values.indexOf(term) === -1).join(', ');
    }
  }

  getValidUnits(data: any) {
    let field;
    if ('properties' in data) {
      field = data['properties'];
    } else {
      field = data['items']['properties'];
    }
    if ('units' in field && 'enum' in field['units']) {
      return field['units']['enum'].filter(term => missing_values.indexOf(term) === -1).join(', ');
    } else if ('units' in field && 'const' in field['units']) {
      return field['units']['const'];
    }
  }

  getValidTerms(data: any) {
    let field;
    if ('properties' in data) {
      field = data['properties'];
    } else {
      field = data['items']['properties'];
    }
    if ('term' in field && 'enum' in field['term']) {
      return field['term']['enum'].filter(term => missing_values.indexOf(term) === -1);
    } else if ('term' in field && 'oneOf' in field['term']) {
      const results = [];
      for (const item of field['term']['oneOf']) {
        if ('graph_restriction' in item) {
          results.push.apply(results, item['graph_restriction']['classes']);
        } else if ('const' in item && item['const'] !== 'restricted access') {
          return [item['const']];
        } else if ('enum' in item) {
          results.push.apply(results, item['enum'].filter(function(item) { return item !== 'restricted access'; }));
        }
      }
      return results;
    } else if ('term' in field && 'graph_restriction' in field['term']) {
      return field['term']['graph_restriction']['classes'];
    }
  }

  getOntologyName(data: any) {
    let field;
    if ('properties' in data) {
      field = data['properties'];
    } else {
      field = data['items']['properties'];
    }
    if ('ontology_name' in field) {
      if ('const' in field['ontology_name']) {
        return [field['ontology_name']['const']];
      } else if ('enum' in field['ontology_name']) {
        return field['ontology_name']['enum'];
      }
    } else {
      return [];
    }
  }

  checkIsActive(category: string) {
    return category === this.active_rule;
  }

  clickOnRule(rule: string) {
    this.apiDataService.getRulesetExperiment(convertToSnakeCase(rule.toLowerCase())).subscribe(data => {
      this.data = data;
      this.all_data = data;
      this.name = data.title;
      this.description = data.description;
      this.details = data.properties.describedBy.const;
      this.mandatory_data = this.getMandatoryData(data);
      this.length = Object.keys(this.data.properties).filter(term => special_sheets.indexOf(term) === -1).length;
      this.rules = Object.keys(data.properties);
      this.active_rule = rule;
      this.error = '';
    }, error => {
      if (error.status === 404) {
        this.error = `${rule} is not a valid rule group. Please select a rule group from the following list: ${this.rule_groups}.`;
      } else {
        this.error = error.message;
      }
    });
  }

  mandatoryOnlyToggle() {
    if (this.mandatory_only === false) {
      this.data = this.mandatory_data;
      this.length = Object.keys(this.data.properties).filter(term => special_sheets.indexOf(term) === -1).length;
      this.rules = Object.keys(this.data.properties);
      this.mandatory_only = true;
    } else {
      this.data = this.all_data;
      this.length = Object.keys(this.data.properties).filter(term => special_sheets.indexOf(term) === -1).length;
      this.rules = Object.keys(this.data.properties);
      this.mandatory_only = false;
    }
  }

  updateUrlFragment(category) {
    const url = this.router.createUrlTree([], {relativeTo: this.route, fragment: category}).toString();
    this.location.go(url);
  }

}
