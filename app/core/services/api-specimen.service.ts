import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Specimen } from '../../shared/specimen';
import { SpecimenList } from '../../shared/specimen-list';
import { ApiTimeoutService } from './api-timeout.service';
import { ApiErrorService } from './api-error.service';

@Injectable()
export class ApiSpecimenService {

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(biosampleId: string): Observable<Specimen>{
    return this.apiTimeoutService.handleTimeout<Specimen>(
      this.apiErrorService.handleError(
        this.http.get(`http://ves-hx-e4:9200/faang/specimen/${biosampleId}`)
       ).map((r: Response) => r.json()._source as Specimen)
    );
  }
  getAll(specimenOffset: number): Observable<SpecimenList>{
    return this.apiTimeoutService.handleTimeout<SpecimenList>(
      this.apiErrorService.handleError(
        this.http.get(`http://ves-hx-e4:9200/faang/specimen/_search?q=*:*&sort=biosampleId:desc&from=${specimenOffset}`)
      ).map((r: Response) => r.json().hits as SpecimenList)
    );
  }
}
