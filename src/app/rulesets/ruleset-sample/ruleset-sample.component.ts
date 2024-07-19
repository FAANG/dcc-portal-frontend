import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import { Location, LocationStrategy, PathLocationStrategy, NgClass, KeyValuePipe } from '@angular/common';
import {sample_metadata_template_with_examples, sample_metadata_template_without_examples, missing_values,
  special_sheets} from '../../shared/constants';
import {
  allowMultiple,
  convertToSnakeCase,
  generateEbiOntologyLink,
  getMandatoryRulesOnly,
  getOntologyTermFromIRI,
  getValidItems,
  replaceUnderscoreWithSpace
} from '../../shared/common_functions';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow,
  MatRowDef, MatRow } from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatButton } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-ruleset-sample',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  templateUrl: './ruleset-sample.component.html',
  styleUrls: ['../rulesets.css'],
  standalone: true,
  imports: [HeaderComponent, MatTabGroup, MatTab, FlexModule, MatButton, NgClass, ExtendedModule, MatTable, MatColumnDef,
    MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatCard, KeyValuePipe]
})
export class RulesetSampleComponent implements OnInit {
  @ViewChild('tabs', { static: true }) tabGroup!: MatTabGroup;
  dataSource!: MatTableDataSource<any>;
  column_names = ['Name', 'Description', 'Type', 'Required?', 'Allow multiple?', 'Valid values', 'Valid units', 'Valid terms',
    'Condition'];
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
  metadata_template_with_examples = '';
  metadata_template_without_examples = '';
  record_specific_templates = {
    Organism: '../../../assets/animal.xlsx',
    Specimen: '../../../assets/specimen.xlsx',
    'Pool of specimens': '../../../assets/pool_of_specimens.xlsx',
    'Purified cells': '../../../assets/purified_cells.xlsx',
    'Cell culture': '../../../assets/cell_culture.xlsx',
    'Cell line': '../../../assets/cell_line.xlsx',
    'Single cell specimen': '../../../assets/single_cell_specimen.xlsx',
    'Specimen Teleostei embryo': '../../../assets/specimen_teleostei_embryo.xlsx',
    'Specimen Teleostei post-hatching': '../../../assets/specimen_teleostei_post-hatching.xlsx'
  };
  rule_groups: any[] = [];
  rules: any[] = [];
  active_rule = '';
  length = 0;
  name = '';
  description = '';
  details = '';
  location: Location;

  constructor(private titleService: Title,
              private apiDataService: ApiDataService,
              private route: ActivatedRoute,
              private router: Router,
              location: Location) {
    this.location = location;
  }

  ngOnInit() {
    this.tabGroup.selectedIndex = 0;
    this.dataSource = new MatTableDataSource<any[]>([]);
    this.rule_groups = ['Standard', 'Organism', 'Organoid', 'Specimen standard rules', 'Specimen Teleostei embryo',
      'Specimen Teleostei post-hatching', 'Single cell specimen', 'Pool of specimens', 'Purified cells', 'Cell culture', 'Cell line'];
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

    this.route.fragment
      .subscribe(
        (fragment: string | null) => {
          if (fragment) {
            this.clickOnRule(fragment);
          } else {
            this.clickOnRule('standard');
          }
        }
      );

  }

  getCondition(rule: string) {
    if (this.active_rule === 'Organism' && rule === 'child_of') {
      return 'Must meet condition: Material is organism';
    } else if (this.active_rule === 'Organism' && rule === 'self') {
      return 'organism';
    } else if (this.active_rule === 'Specimen standard rules' && rule === 'self') {
      return 'specimen from organism';
    } else if (this.active_rule === 'Specimen standard rules' && rule === 'derived_from') {
      return 'Must meet condition: Material is organism';
    } else if (this.active_rule === 'Pool of specimens' && rule === 'self') {
      return 'pool of specimens';
    } else if (this.active_rule === 'Pool of specimens' && rule === 'derived_from') {
      return 'Must meet condition: Material is specimen from organism, teleostei embryo, teleostei post-hatching or cell specimen';
    } else if (this.active_rule === 'Purified cells' && rule === 'self') {
      return 'cell specimen';
    } else if (this.active_rule === 'Purified cells' && rule === 'derived_from') {
      return 'Must meet condition: Material is specimen from organism';
    } else if (this.active_rule === 'Cell culture' && rule === 'self') {
      return 'cell culture';
    } else if (this.active_rule === 'Cell culture' && rule === 'derived_from') {
      return 'Must meet condition: Material is one of specimen from organism or cell specimen';
    } else if (this.active_rule === 'Cell line' && rule === 'self') {
      return 'cell line';
    } else if (this.active_rule === 'Specimen Teleostei embryo' && rule === 'self') {
      return [
        'Material is "specimen from organism"',
        'Organism is child of Teleostei (NCBITaxon:32443)',
        'Developmental stage is child of UBERON:0000068'
      ];
    } else if (this.active_rule === 'Organoid' && rule === 'self') {
      return 'organoid';
    } else if (this.active_rule === 'Specimen Teleostei post-hatching' && rule === 'self') {
      return [
        'Material is "specimen from organism"',
        'Organism is child of Teleostei (NCBITaxon:32443)'
      ];
    } else if (this.active_rule === 'Single cell specimen' && rule === 'self') {
      return 'single cell specimen';
    } else if (this.active_rule === 'Single cell specimen' && rule === 'derived_from') {
      return 'Must meet condition: Material is specimen from organism';
    }
    return '';
  }

  getType(data: any) {
    let field: any;
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
    let field: any;
    if ('properties' in data) {
      field = data['properties'];
    } else {
      field = data['items']['properties'];
    }
    if ('value' in field && 'enum' in field['value']) {
      return field['value']['enum'].filter((term: string) => missing_values.indexOf(term) === -1).join(', ');
    } else if ('value' in field && 'const' in field['value']) {
      return field['value']['const'];
    } else if ('text' in field && 'enum' in field['text']) {
      return field['text']['enum'].filter((term: string) => missing_values.indexOf(term) === -1).join(', ');
    }
  }

  getValidUnits(data: any) {
    let field: any;
    if ('properties' in data) {
      field = data['properties'];
    } else {
      field = data['items']['properties'];
    }
    if ('units' in field && 'enum' in field['units']) {
      return field['units']['enum'].filter((term: string) => missing_values.indexOf(term) === -1).join(', ');
    } else if ('units' in field && 'const' in field['units']) {
      return field['units']['const'];
    }
  }

  getValidTerms(data: any) {
    let field: any;
    if ('properties' in data) {
      field = data['properties'];
    } else {
      field = data['items']['properties'];
    }
    if ('term' in field && 'enum' in field['term']) {
      return field['term']['enum'].filter((term: string) => missing_values.indexOf(term) === -1);
    } else if ('term' in field && 'oneOf' in field['term']) {
      for (const item of field['term']['oneOf']) {
        if ('graph_restriction' in item) {
          return item['graph_restriction']['classes'];
        }
      }
    } else if ('term' in field && 'graph_restriction' in field['term']) {
      return field['term']['graph_restriction']['classes'];
    }
  }

  getOntologyName(data: any) {
    let field: any;
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
    }
  }

  checkIsActive(category: string) {
    return category === this.active_rule;
  }

  clickOnRule(rule: string) {
    this.apiDataService.getRulesetSample(convertToSnakeCase(rule.toLowerCase())).subscribe({
      next: data => {
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
        this.dataSource.data = this.getDataSource(data['properties'], this.rules);

      },
      error: error => {
        if (error.status === 404) {
          this.error = `${rule} is not a valid rule group. Please select a rule group from the following list: ${this.rule_groups}.`;
        } else {
          this.error = error.message;
        }
      }
    });
  }

  mandatoryOnlyToggle() {
    if (!this.mandatory_only) {
      this.data = this.mandatory_data;
      this.length = Object.keys(this.data.properties).filter(term => special_sheets.indexOf(term) === -1).length;
      this.rules = Object.keys(this.data.properties);
      this.mandatory_only = true;
      this.dataSource.data = this.getDataSource(this.mandatory_data['properties'], this.rules);
    } else {
      this.data = this.all_data;
      this.length = Object.keys(this.data.properties).filter(term => special_sheets.indexOf(term) === -1).length;
      this.rules = Object.keys(this.data.properties);
      this.mandatory_only = false;
      this.dataSource.data = this.getDataSource(this.all_data['properties'], this.rules);
    }
  }

  updateUrlFragment(category: any) {
    const url = this.router.createUrlTree([], {relativeTo: this.route, fragment: category}).toString();
    this.location.go(url);
  }

  getDataSource(data: { [x: string]: any; }, rules: any[]) {
    const ds: any[] = [];
    for (const rule of rules) {
      if (rule !== 'describedBy' && rule !== 'schema_version' && rule !== 'samples_core') {
        const rowObj = data[rule];
        rowObj['rule'] = rule;
        ds.push(rowObj);
      }
    }
    return ds;
  }

  tabClick(tab: any) {
    if (tab.index === 0) {
      void this.router.navigate(['ruleset/samples'], {fragment: 'Standard'});
    } else if (tab.index === 1) {
      void this.router.navigate(['ruleset/experiments'], {fragment: 'Standard'});
    } else if (tab.index === 2) {
      void this.router.navigate(['ruleset/analyses'], {fragment: 'FAANG'});
    }
  }

}
