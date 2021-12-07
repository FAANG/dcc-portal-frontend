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
    let idx = 0;
    let isStart = true;
    const tmp = [];

    for (const [key, value] of Object.entries(setting)) {
      const obj = value;
      console.log(obj);

      obj['id'] = key;
      if (key !== 'EuroFAANG') {

        obj['isStart'] = isStart;
        tmp[idx] = obj;
        idx++;
        isStart = !isStart;
      } else {
        // deal with eurofaang separately
        this.eurofaang_proj = obj;
        console.log(obj);
      }


    }

    const pair_num = Math.ceil(idx / 2);
    for (let i = 0; i < pair_num; i++) {
      const obj = {'left': tmp[i * 2], 'right': tmp[2 * i + 1]};
      this.projects[i] = obj;
    }
    // console.log(this.projects);
  }

}
