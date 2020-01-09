import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-subprojects-landing',
  templateUrl: './subprojects-landing.component.html',
  styleUrls: ['./subprojects-landing.component.css']
})
export class SubprojectsLandingComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('FAANG projects');
  }

}
