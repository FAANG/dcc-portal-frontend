import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {
  activeComponent = 'samples';
  current = 'glyphicon glyphicon-home';
  next = 'glyphicon glyphicon-circle-arrow-right';
  previous = 'glyphicon glyphicon-circle-arrow-left';
  samplesActive = true;
  experimentsActive = false;
  samplesClass = this.current;
  experimentsClass = this.next;

  constructor(private route: ActivatedRoute) { }

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
