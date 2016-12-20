import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Organism } from '../../shared/organism';
import { OrganismList } from '../../shared/organism-list';
import { ApiTimeoutService } from './api-timeout.service';
import { ApiErrorService } from './api-error.service';

@Injectable()
export class ApiOrganismService {

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(biosampleId: string): Observable<Organism>{
    return this.apiTimeoutService.handleTimeout<Organism>(
      this.apiErrorService.handleError(
        this.http.get(`http://ves-hx-e4:9200/faang/organism/${biosampleId}`)
      ).map((r: Response) => r.json()._source as Organism)
    );
  }

  getAll(query: any): Observable<OrganismList>{
    return this.apiTimeoutService.handleTimeout<OrganismList>(
      this.apiErrorService.handleError(
        this.http.post(`http://ves-hx-e4:9200/faang/organism/_search`, query)
      ).map((r: Response) => r.json().hits as OrganismList)      
    );
  }
}
