import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import setting from './subproject-detail/subproject-detail.component.setting.json';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass, KeyValuePipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-subprojects',
  templateUrl: './subproject.component.html',
  styleUrls: ['./subproject.component.css'],
  standalone: true,
  imports: [HeaderComponent, FlexModule, RouterLink, MatCard, NgClass, ExtendedModule, KeyValuePipe]
})
export class SubprojectComponent implements OnInit {
  eurofaang_proj: any;
  faang_proj: any;

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('FAANG projects');
    const eurofaang_keyproj: any[] = [];
    const faang_keyproj: any[] = [];

    for (const [key, val] of Object.entries(setting)) {
      const value: any = val;
      if (key !== 'EuroFAANG' && value['parent_project'] !== 'EuroFAANG') {
        if (key === 'FAANG') {
          this.faang_proj = value;
          this.faang_proj['id'] = key;
        }
        if (value['parent_project'] && value['parent_project'] === 'FAANG') {
          value['id'] = key;
          faang_keyproj.push(value);
        }
      } else {
        // eurofaang project
        if (key === 'EuroFAANG') {
          this.eurofaang_proj = value;
          this.eurofaang_proj['id'] = key;
        }
        if (value['parent_project'] && value['parent_project'] === 'EuroFAANG') {
          value['id'] = key;
          eurofaang_keyproj.push(value);
        }
      }
    }
    this.faang_proj['key_projects'] = faang_keyproj.sort((a: any, b: any) => a.id.localeCompare(b.id));
    this.eurofaang_proj['key_projects'] = eurofaang_keyproj.sort((a: any, b: any) => a.id.localeCompare(b.id));
  }

}
