import { Component } from '@angular/core';

import { DoSomethingService } from '../core/services/do-something.service';

@Component({
    selector: 'specimen-table',
    templateUrl: './specimen-table.component.html',
})
export class SpecimenTableComponent{ 
  constructor(
    public doSomethingService: DoSomethingService
  ){}
};
