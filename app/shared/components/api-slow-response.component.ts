import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiTimeoutService } from '../../core/services/api-timeout.service';

@Component({
    selector: 'api-slow-response',
    templateUrl: './api-slow-response.component.html',
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
