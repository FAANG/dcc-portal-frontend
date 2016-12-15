import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Specimen } from '../../shared/specimen';

@Injectable()
export class ApiSpecimenService {
  // private properties
  constructor(private http: Http) {}
  // public methods
  // private methods
  get(biosampleId: string): Observable<Specimen>{
    return this.http
               .get(`http://ves-hx-e4:9200/faang/specimen/${biosampleId}`)
               .map((r: Response) => r.json().data as Specimen);
  }
}
