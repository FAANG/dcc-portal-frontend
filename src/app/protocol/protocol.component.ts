import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {
  activeComponent = 'samples';
  current = 'glyphicon glyphicon-option-vertical';
  next = 'glyphicon glyphicon-menu-right';
  previous = 'glyphicon glyphicon-menu-left';
  samplesActive = true;
  experimentsActive = false;
  samplesClass = this.current;
  experimentsClass = this.next;

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.samplesActive = !this.samplesActive;
    this.experimentsActive = !this.experimentsActive;
    if (this.experimentsClass === this.next) {
      this.experimentsClass = this.current;
      this.samplesClass = this.previous;
      this.activeComponent = 'experiments';
    } else {
      this.experimentsClass = this.next;
      this.samplesClass = this.current;
      this.activeComponent = 'samples';
    }
  }

}
