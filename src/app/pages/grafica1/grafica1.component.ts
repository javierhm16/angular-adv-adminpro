import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  labels2: string[] = ['v1', 'v2', 'v3'];
  data2 = {
    labels: this.labels2,
    datasets: [
      { data: [1, 2, 3] },
    ]
  };

}
