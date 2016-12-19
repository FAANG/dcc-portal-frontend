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

  private try(observable: Observable<Response>, observer: Observer<Response>) {
    observable.subscribe(
      (res: Response) => {
        observer.next(res);
        observer.complete();
      },
      (error: any) => this.onErrorFn(observable, observer, error)
      );
  }

  private onErrorFn(observable: Observable<Response>, observer: Observer<Response>, error: any) {
    console.log('An error occurred', error); // for debugging

    let errMsg = ""
    if (error.statusText) {
        errMsg = ` - ${error.statusText}`;
    }
    let errStatus = error.status ? `${error.status}` : "Could not connect";
    errMsg = `API error: ${errStatus}${errMsg}`;

    let retryFn = () => this.try(observable, observer);

    this.errorSource.next(new ApiErrorHandle(errMsg, observer, retryFn));

  }

}
