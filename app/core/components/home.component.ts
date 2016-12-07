import { Component } from '@angular/core';

import { DoSomethingService } from '../services/do-something.service';

@Component({
    templateUrl: './home.component.html',
})
export class HomeComponent{
  constructor(
    public doSomethingService: DoSomethingService
  ){}
};
