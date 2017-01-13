import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { File } from '../../shared/file';
import { ApiTimeoutService } from './api-timeout.service';
import { ApiErrorService } from './api-error.service';

@Injectable()
export class ApiFileService {

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(name: string): Observable<File>{
    return this.apiTimeoutService.handleTimeout<File>(
      this.apiErrorService.handleError(
        this.http
         .get(`/api/file/${name}`)
       ).map((r: Response) => r.json()._source as File)
    );
  }
}
