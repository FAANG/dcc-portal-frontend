import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { File } from '../../shared/file';

@Injectable()
export class ApiFileService {
  // private properties
  constructor(private http: Http) {}
  // public methods
  // private methods
  get(name: string): Observable<File>{
    return this.http
               .get(`http://ves-hx-e4:9200/faang/file/${name}`)
               .map((r: Response) => r.json().data as File);
  }
}
