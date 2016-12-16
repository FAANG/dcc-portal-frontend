import { Injectable }    from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { ApiErrorHandle } from '../../shared/api-error-handle';

@Injectable()
export class ApiErrorService {

  // private properties
  private errorSource: Subject<ApiErrorHandle>;

  // public properties
  readonly error$: Observable<ApiErrorHandle>;

  // public methods

  constructor() {
    this.errorSource = new Subject<ApiErrorHandle>();
    this.error$ = this.errorSource.asObservable();
  };

  handleError(observable: Observable<Response>): Observable<Response> {
    return Observable.create((observer : Observer<Response>) => this.try(observable, observer));
  }

  // private methods

  try(observable: Observable<Response>, observer: Observer<Response>) {
    let service = this;
    observable.subscribe(
      (res: Response) => {
        observer.next(res);
        observer.complete();
      },
      (error: any) => {
        console.log('An error occurred', error); // for debugging

        let errMsg = ""
        if (typeof error._body === 'string') {
          interface ApiErrorResp {
            message: string
          }
          var apiErrorResp:ApiErrorResp = JSON.parse(error._body);
          if (apiErrorResp.message) {
            errMsg = ` - ${apiErrorResp.message}`;
          }
        }
        if (!errMsg && error.message) {
            errMsg = ` - ${error.message}`;
        }
        let errStatus = error.status ? `${error.status}` : "Could not connect";
        errMsg = `API error: ${errStatus}${errMsg}`;

        let retryFn = function() {
          service.try(observable, observer);
        };

        service.errorSource.next(new ApiErrorHandle(errMsg, observer, retryFn));

      }
    );
  }

}
