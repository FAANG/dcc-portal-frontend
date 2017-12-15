import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

@Injectable()
export class ApiTimeoutService {

  readonly numSlowResponses$: Observable<number>;
  private numSlowResponsesSource: BehaviorSubject<number>;

  constructor() {
    this.numSlowResponsesSource = new BehaviorSubject<number>(0);
    this.numSlowResponses$ = this.numSlowResponsesSource.asObservable();
  }

  handleTimeout<T>(o: Observable<T>): Observable<T> {
    return Observable.create((observer : Observer<T>) => this.try<T>(o, observer));
  }

  handleExportTimeout<T>(timeout:number, o: Observable<T>): Observable<T> {
    return Observable.create((observer : Observer<T>) => this.tryExport<T>(timeout, o, observer));
  }

  private try<T>(observable: Observable<T>, observer: Observer<T>) {
    let timer : {subscription: Subscription} = {subscription: null};
    timer.subscription = Observable.timer(1000).subscribe( t => this.onTimeout(timer, observer));
    observable.subscribe((next: T) => this.onNext(next, timer, observer));
  };

  private tryExport<T>(timeout:number, observable: Observable<T>, observer: Observer<T>) {
    let timer : {subscription: Subscription} = {subscription: null};
    timer.subscription = Observable.timer(timeout).subscribe( t => this.onTimeout(timer, observer));
    observable.subscribe((next: T) => this.onNext(next, timer, observer));
  };

  private onTimeout<T>(timer: {subscription: Subscription}, observer: Observer<T>) {
    timer.subscription.unsubscribe();
    timer.subscription = null;
    this.numSlowResponsesSource.next(1 + this.numSlowResponsesSource.getValue());
    observer.next(null);
  }

  private onNext<T>(next: T, timer: {subscription: Subscription}, observer: Observer<T>) {
    if (timer.subscription) {
      timer.subscription.unsubscribe();
    }
    else {
      this.numSlowResponsesSource.next(-1 + this.numSlowResponsesSource.getValue());
    }
    observer.next(next);
  }

}
