import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSub: Subscription;

  constructor() {
    // this.returnObs().pipe(
    //   retry()
    // ).subscribe(
    //   value => console.log(value),
    //   err => console.log(err),
    //   () => console.log('Termino')
    // )

    this.intervalSub = this.returnInterval().subscribe(
      (value) => console.log(value)
    );
  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

  ngOnInit(): void {
  }

  returnInterval(): Observable<number> {
    const interval$ = interval(100)
      .pipe(
        map(value => value + 1),
        filter(value => (value % 2 === 0) ? true : false),
        // take(10),
      )
    return interval$;
  }

  returnObs() {
    let i = 0;

    const obs$ = new Observable<number>(observer => {

      const interval = setInterval(() => {
        i++;
        observer.next(i)

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('Error')
        }
      }, 1000)
    });

    return obs$;
  }

}
