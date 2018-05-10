import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.css']
})
export class GdprComponent implements OnInit {
  @Input() version: number;
  @ViewChild('cookieLaw')
  private cookieLawEl: any;
  private accepted = false;

  public agree(): void {
//    console.log(this.cookieLawEl);
    if (this.accepted) {
      this.cookieLawEl.dismiss();
    } else { // should not be reachable as the button is disabled when the checkbox is not checked
      console.log('not agree, just click button');
    }
  }

  public changeAccepted(event: any) {
    this.accepted = !this.accepted;
  }

  public isAccepted(): boolean {
    return this.accepted
  }

  constructor() { }

  ngOnInit() {
  }

}
