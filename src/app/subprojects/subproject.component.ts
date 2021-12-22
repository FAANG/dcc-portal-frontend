import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import setting from './subproject-detail/subproject-detail.component.setting.json';

@Component({
  selector: 'app-subprojects',
  templateUrl: './subproject.component.html',
  styleUrls: ['./subproject.component.css']
})
export class SubprojectComponent implements OnInit {
  projects = [];
  eurofaang_proj: any;

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('FAANG projects');
    const eurofaang_keyproj = [];

    for (const [key, value] of Object.entries(setting)) {
      if (key !== 'EuroFAANG' && value.parent_project !== 'EuroFAANG') {
        const obj = value;
        obj['id'] = key;
        this.projects.push(obj);
      } else {
        // eurofaang project
        if (key === 'EuroFAANG') {
          this.eurofaang_proj = value;
          this.eurofaang_proj['id'] = key;
        }
        if (value.parent_project && value.parent_project === 'EuroFAANG') {
          value['id'] = key;
          eurofaang_keyproj.push(value);
        }
      }
    }
    this.eurofaang_proj['key_projects'] = eurofaang_keyproj;
  }

}
