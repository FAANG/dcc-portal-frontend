import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-subprojects',
  templateUrl: './subprojects.component.html',
  styleUrls: ['./subprojects.component.css']
})
export class SubprojectsComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('FAANG projects');
  }

}
