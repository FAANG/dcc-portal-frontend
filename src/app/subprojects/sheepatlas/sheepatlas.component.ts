import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
    selector: 'app-sheepatlas',
    templateUrl: './sheepatlas.component.html',
    styleUrls: ['./sheepatlas.component.css'],
    standalone: true,
    imports: [HeaderComponent]
})
export class SheepatlasComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Sheepatlas');
  }

}
