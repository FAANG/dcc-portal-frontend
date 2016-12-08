import { Component } from '@angular/core';

import { DoSomethingService } from '../core/services/do-something.service';

@Component({
    templateUrl: './specimen-detail.component.html',
})
export class SpecimenDetailComponent{ 
  constructor(
    public doSomethingService: DoSomethingService
  ){}
};
