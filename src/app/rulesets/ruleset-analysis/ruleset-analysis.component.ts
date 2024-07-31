import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy, NgClass, KeyValuePipe } from '@angular/common';
import {ApiDataService} from '../../services/api-data.service';
import {
  allowMultiple,
  convertToSnakeCase,
  generateEbiOntologyLink,
  getMandatoryRulesOnly,
  getOntologyTermFromIRI,
  getValidItems,
  replaceUnderscoreWithSpace
} from '../../shared/common_functions';
import {
  analysis_metadata_template_with_examples,
  analysis_metadata_template_without_examples, missing_values,
  special_sheets
} from '../../shared/constants';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow,
  MatRowDef, MatRow } from '@angular/material/table';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatButton } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
    selector: 'app-ruleset-analysis',
    templateUrl: './ruleset-analysis.component.html',
    styleUrls: ['../rulesets.css'],
    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
    standalone: true,
    imports: [HeaderComponent, MatTabGroup, MatTab, FlexModule, MatButton, NgClass, ExtendedModule, MatTable, MatColumnDef,
      MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, KeyValuePipe]
})
export class RulesetAnalysisComponent implements OnInit {
  @ViewChild('tabs', { static: true }) tabGroup!: MatTabGroup;
  dataSource!: MatTableDataSource<any>;
  column_names = ['Name', 'Description', 'Type', 'Required?', 'Allow multiple?', 'Valid values', 'Valid units', 'Valid terms', 'Condition'];
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
    FAANG: '../../../assets/faang.xlsx',
    ENA: '../../../assets/ena.xlsx',
    EVA: '../../../assets/eva.xlsx'
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
    this.tabGroup.selectedIndex = 2;
    this.dataSource = new MatTableDataSource<any[]>([]);
    this.rule_groups = ['FAANG', 'ENA', 'EVA'];
    this.active_rule = 'FAANG';
    this.convertToSnakeCase = convertToSnakeCase;
    this.replaceUnderscoreWithSpace = replaceUnderscoreWithSpace;
    this.allowMultiple = allowMultiple;
    this.getValidItems = getValidItems;
    this.getOntologyTerm = getOntologyTermFromIRI;
    this.getMandatoryData = getMandatoryRulesOnly;
    this.generateEbiOntologyLink = generateEbiOntologyLink;
    this.metadata_template_with_examples = analysis_metadata_template_with_examples;
    this.metadata_template_without_examples = analysis_metadata_template_without_examples;
    this.titleService.setTitle('FAANG Rule set|analyses');

    this.route.fragment
      .subscribe(
        (fragment: string | null) => {
          if (fragment) {
            this.clickOnRule(fragment);
          } else {
            this.clickOnRule('faang');
          }
        }
      );


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

  checkIsActive(category: string) {
    return category === this.active_rule;
  }

  clickOnRule(rule: string) {
    this.apiDataService.getRulesetAnalysis(convertToSnakeCase(rule.toLowerCase())).subscribe({
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


  updateUrlFragment(category: any) {
    const url = this.router.createUrlTree([], {relativeTo: this.route, fragment: category}).toString();
    this.location.go(url);
  }

  getDataSource(data: { [x: string]: any; }, rules: any[]) {
    const ds: any[] = [];
    for (const rule of rules) {
      if (rule !== 'describedBy' && rule !== 'schema_version'
        && rule !== 'samples_core' && rule !== 'eva') {
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
