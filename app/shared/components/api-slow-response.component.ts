import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiTimeoutService } from '../../core/services/api-timeout.service';

@Component({
    selector: 'api-slow-response',
    template: `<h3 *ngIf="numSlowResponses > 0" class="text-center">Page loading....</h3>`,
})
export class ApiSlowResponseComponent implements OnInit{

  // public properties
  numSlowResponses: number;

  //private properties
  subscription: Subscription = null;

  constructor(
    private apiTimeoutService: ApiTimeoutService,
  ) {};

  ngOnInit(): void {
    this.subscription = 
      this.apiTimeoutService.numSlowResponses$.subscribe((num:number) => this.numSlowResponses = num);
    return;
  };

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    return;
  };

}
