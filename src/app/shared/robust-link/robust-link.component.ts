import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-robust-link',
  templateUrl: './robust-link.component.html',
  styleUrls: ['./robust-link.component.css']
})
export class RobustLinkComponent implements OnInit {
  @Input() text: string;
  @Input() link: string;
  @Input() prefix: string;

  constructor() { }

  ngOnInit() {
    if (this.text && this.text.length === 62) {
      this.text = this.text + '...';
    }
  }

}
