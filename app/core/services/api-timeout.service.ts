import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

@Injectable()
export class ApiTimeoutService {

  handleTimeout<T>(o: Observable<T>): Observable<T> {
    return Observable.create((observer : Observer<T>) => {
      let timer : {subscription: Subscription} = {subscription: null};
      timer.subscription = Observable.timer(1000).subscribe( t => {
        timer.subscription.unsubscribe();
        observer.next(null);
      });
      o.subscribe((next: T) => {
         timer.subscription.unsubscribe();
         observer.next(next);
      });
    });
  };

}
