import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public constructor(private titleService: Title ) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG data portal');
  }
};
