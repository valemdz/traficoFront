import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
import { delay } from 'rxjs/operators';

export function getSingleValueObservable() {
  return of('single value');
}

export function getDelayedValueObservable() {
  return of('delayed value').pipe(delay(2000));
}

export function getMultiValueObservable() {
  return new Observable<number>(observer => {
    let count = 0;
    const interval = setInterval(() => {
      observer.next(count++);
      console.log('interval fired');
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  });
}
