import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatCard } from '@angular/material/card';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [HeaderComponent, MatCard, MatDivider, RouterLink]
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG data portal');
  }

}
