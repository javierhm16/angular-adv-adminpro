import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progreso1: number = 15;
  progreso2: number = 30;

  get getPercentage1() {
    return this.progreso1 + '%'
  }

  get getPercentage2() {
    return this.progreso2 + '%'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
