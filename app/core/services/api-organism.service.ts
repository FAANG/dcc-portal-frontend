import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Organism } from '../../shared/organism';

@Injectable()
export class ApiOrganismService {
  // private properties
  constructor(private http: Http) {}
  // public methods
  // private methods
  get(biosampleId: string): Observable<Organism>{
    return this.http
               .get(`http://ves-hx-e4:9200/faang/organism/${biosampleId}`)
               .map((r: Response) => r.json()._source as Organism);
  }
}
