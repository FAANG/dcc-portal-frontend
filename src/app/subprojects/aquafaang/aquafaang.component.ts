import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-aquafaang',
  templateUrl: './aquafaang.component.html',
  styleUrls: ['./aquafaang.component.css']
})
export class AquafaangComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('AQUA-FAANG');
  }

}
