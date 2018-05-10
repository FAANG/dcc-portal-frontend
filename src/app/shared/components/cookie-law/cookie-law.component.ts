/**
 * angular2-cookie-law
 *
 * Copyright 2016-2017, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */
import {
  Component,
  OnInit,
  ViewChild,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  CookieLawService,
} from './cookie-law.service';
import { CookieLawElementComponent } from './cookie-law-element.component';
import {
  CookieLawTarget,
  CookieLawPosition,
} from './definitions';

@Component({
  selector: 'app-cookie-law',
  template: `
    <cookie-law-el *ngIf="!seen"
                   [awsomeCloseIcon]="awsomeCloseIcon"
                   [learnMore]="learnMore"
                   [target]="target"
                   [position]="position"
                   (isSeen)="hasBeenDismissed()"><ng-content></ng-content></cookie-law-el>
  `,
})
export class CookieLawComponent implements OnInit {
  @HostBinding('attr.seen')
  public seen: boolean = true;

  @ViewChild(CookieLawElementComponent)
  public cookieLawComponent: CookieLawElementComponent;

  @Input()
  public name: string;

  @Input()
  public learnMore: string;

  @Input()
  public target: CookieLawTarget;

  @Input()
  public position: CookieLawPosition;

  @Input()
  public expiration: number;

  @Input()
  public awsomeCloseIcon: string;

  @Input()
  public version: number;

  @Output()
  public isSeen = new EventEmitter<boolean>();

  public get cookieLawSeen(): boolean {
    return this._service.seen(this.name, this.version);
  }

  constructor(private _service: CookieLawService) {
    this.name = 'cookieLawSeen'; // set a default cookie name if not provided
  }

  public ngOnInit() {
    this.seen = this._service.seen(this.name, this.version);
  }

  public hasBeenDismissed(): void {
    const cookieName = this.name + '_version_' + this.version;
    this._service.storeCookie(cookieName, this.expiration);
    this.seen = true;
    this.isSeen.emit(true);
  }

  public dismiss(): void {
    this.cookieLawComponent.dismiss();
  }
}
