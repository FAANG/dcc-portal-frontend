import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
    selector: 'app-usda-bovine',
    templateUrl: './usda-bovine.component.html',
    styleUrls: ['./usda-bovine.component.css'],
    standalone: true,
    imports: [HeaderComponent]
})
export class UsdaBovineComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('USDA-Bovine');
  }

}
