import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {

  data= {
    labels: ['Games', 'Films', 'Others'],
    datasets: [
      { data: [1, 2, 3] }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
