import { Component } from '@angular/core';

import { DoSomethingService } from '../core/services/do-something.service';

@Component({
    selector: 'organism-specimens',
    templateUrl: './organism-specimens.component.html',
})
export class OrganismSpecimensComponent{ 
  constructor(
    public doSomethingService: DoSomethingService
  ){}
};
