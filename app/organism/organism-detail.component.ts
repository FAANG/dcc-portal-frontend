import { Component } from '@angular/core';

import { DoSomethingService } from '../core/services/do-something.service';

@Component({
    templateUrl: './organism-detail.component.html',
})
export class OrganismDetailComponent{ 
  constructor(
    public doSomethingService: DoSomethingService
  ){}
};
