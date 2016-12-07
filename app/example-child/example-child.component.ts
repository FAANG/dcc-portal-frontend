import { Component } from '@angular/core';

import { DoSomethingService } from '../core/services/do-something.service';

@Component({
    templateUrl: './example-child.component.html',
})
export class ExampleChildComponent{ 
  constructor(
    public doSomethingService: DoSomethingService
  ){}
};
