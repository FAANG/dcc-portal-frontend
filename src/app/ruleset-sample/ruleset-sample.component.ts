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
  fragment: string;

  constructor(private titleService: Title, private apiFileService: ApiFileService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG Rule set|samples');
    this.apiFileService.getRulesetSample().subscribe(
      data => {
        this.data = data;
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

}
