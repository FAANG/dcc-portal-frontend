import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-non-existing',
  templateUrl: './non-existing.component.html',
  styleUrls: ['./non-existing.component.css'],
  standalone: true,
  imports: [HeaderComponent]
})
export class NonExistingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
