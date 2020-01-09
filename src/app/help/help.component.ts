import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    window.location.href = 'https://dcc-documentation.readthedocs.io/en/latest/faq/';
    this.titleService.setTitle('FAANG Help');
  }

}
