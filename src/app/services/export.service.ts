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
    useBom: false,
    removeNewLines: true,
  };

  optionsTabular = {
    fieldSeparator: '\t',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    useBom: false,
    removeNewLines: true,
  };

  data = new Subject();

  constructor() { }

}
