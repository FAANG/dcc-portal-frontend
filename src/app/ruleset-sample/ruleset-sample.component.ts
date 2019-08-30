import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiFileService} from '../services/api-file.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ruleset-sample',
  templateUrl: './ruleset-sample.component.html',
  styleUrls: ['./ruleset-sample.component.css']
})
export class RulesetSampleComponent implements OnInit, AfterViewChecked {
  error: string;
  data: any;
  all_data: any;
  mandatory_data: any;
  clicked = false;
  fragment: string;

  constructor(private titleService: Title, private apiFileService: ApiFileService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG Rule set|samples');
    this.apiFileService.getRulesetSample().subscribe(
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

  removeSpaces(id: string) {
    return id.split(' ').join('_');
  }

  checkIsActive(category: string) {
    return this.removeSpaces(category) === this.fragment;
  }

  allowMultiple(rule: any) {
    if (rule && rule['allow_multiple'] === 1) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

  getValidItems(rule: any, section_name: string) {
    if (rule[section_name]) {
      return rule[section_name].map(function(el) {
        return '"' + el + '"';
      }).join(', ');
    }
  }

  getLink(link: string) {
    return link.split('/').slice(-1)[0];
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

  getMandatoryData(data: any) {
    const data_to_return = {};
    data_to_return['description'] = data['description'];
    data_to_return['name'] = data['name'];
    data_to_return['further_details_iri'] = data['further_details_iri'];
    data_to_return['rule_groups'] = [];
    for (const rule of data['rule_groups']) {
      const tmp = {};
      tmp['name'] = rule['name'];
      tmp['rules'] = [];
      for (const el of rule['rules']) {
        if (el['mandatory'] === 'mandatory') {
          tmp['rules'].push(el);
        }
      }
      data_to_return['rule_groups'].push(tmp);
    }
    return data_to_return;
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
