import { Component } from '@angular/core';

import { DoSomethingService } from '../core/services/do-something.service';

@Component({
    templateUrl: './specimen-files.component.html',
})
export class SpecimenFilesComponent{ 
  constructor(
    public doSomethingService: DoSomethingService
  ){}
};
