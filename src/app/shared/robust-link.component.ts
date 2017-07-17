import { Component, Input } from '@angular/core';

@Component({
    selector: 'robust-link',
    templateUrl: './robust-link.component.html',
})
export class RobustLinkComponent{ 
//	public properties
  @Input() text: string;
  @Input() link: string;
  @Input() prefix: string;
  constructor() {
  }
};