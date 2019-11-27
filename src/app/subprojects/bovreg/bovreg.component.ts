import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-bovreg',
  templateUrl: './bovreg.component.html',
  styleUrls: ['./bovreg.component.css']
})
export class BovregComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('BovReg');
  }

}
