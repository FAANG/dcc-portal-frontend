import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  optionsCsv = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    // showTitle: true,
    // title: 'asfasf',
    useBom: false,
    removeNewLines: true,
    // keys: ['approved','age','name' ]
  };

  optionsTabular = {
    fieldSeparator: '\t',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    // showTitle: true,
    // title: 'asfasf',
    useBom: false,
    removeNewLines: true,
    // keys: ['approved','age','name' ]
  };

  data = new Subject();

  constructor() { }

}
