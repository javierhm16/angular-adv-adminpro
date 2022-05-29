import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-donuts',
  templateUrl: './donuts.component.html',
  styles: [
  ]
})
export class DonutsComponent {

  @Input() title: string = 'No title';

  @Input('labels') doughnutChartLabels: string[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

}
