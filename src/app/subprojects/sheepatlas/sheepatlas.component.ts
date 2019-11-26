import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sheepatlas',
  templateUrl: './sheepatlas.component.html',
  styleUrls: ['./sheepatlas.component.css']
})
export class SheepatlasComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Sheepatlas');
  }

}
