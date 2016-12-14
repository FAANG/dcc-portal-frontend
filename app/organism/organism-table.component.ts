import { Component } from '@angular/core';

import { DoSomethingService } from '../core/services/do-something.service';

@Component({
    templateUrl: './organism-table.component.html',
})
export class OrganismTableComponent{ 
  constructor(
    public doSomethingService: DoSomethingService
  ){}
};
