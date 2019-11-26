import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-gene-switch',
  templateUrl: './gene-switch.component.html',
  styleUrls: ['./gene-switch.component.css']
})
export class GeneSwitchComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('GENE-SWitCH');
  }

}
