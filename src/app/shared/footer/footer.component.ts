import { Component, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
  imports: [FlexModule]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
