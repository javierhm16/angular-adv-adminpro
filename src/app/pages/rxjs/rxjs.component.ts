import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubs!: Subscription;

  constructor() {

    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   res => console.log('Subs: ', res),
    //   (err) => console.warn('Error: ', err),
    //   () => console.info('Terminado')
    // );

    this.intervalSubs = this.returnInterval().subscribe(
      (res) => console.log(res)
    )

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  returnInterval(): Observable<number> {
    return interval(100).pipe(
      // take(10),
      map(value => {
        return value + 1;
      }),
      filter(value => (value % 2 === 0) ? true : false),
    );
  }

  returnObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('bad');
        }
      }, 1000)
    });

    return obs$;
  }

}
