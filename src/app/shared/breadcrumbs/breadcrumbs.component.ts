import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  title!: string;

  titleSubs$!: Subscription;

  constructor(private router: Router) {
    this.titleSubs$ = this.getRouteData().subscribe(
      res => {
        this.title = res.title;
        document.title = 'AdminPro - ' + this.title;
      }
    );
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getRouteData() {
    return this.router.events
      .pipe(
        filter(value => value instanceof ActivationEnd),
        filter((value: any) => value.snapshot.firstChild === null),
        map(value => value.snapshot.data)
      )
  }

  ngOnInit(): void {
  }

}
