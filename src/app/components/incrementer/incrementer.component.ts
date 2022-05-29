import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent implements OnInit {

  ngOnInit(): void {
    this.btnClass = 'btn ' + this.btnClass;
  }

  @Input() progress: number = 20;

  @Input() btnClass: string = 'btn-primary';

  @Output() outValue: EventEmitter<number> = new EventEmitter;

  changeValue(value: number) {
    this.progress += value;
    this.outValue.emit(this.progress);

    if (this.progress > 100) {
      this.outValue.emit(100);
      this.progress = 100;
    } else if (this.progress < 0) {
      this.outValue.emit(0);
      this.progress = 0;
    }
  }

  onChange(value: number) {
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }

    this.outValue.emit(this.progress);
  }

}
