import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 20;
  @Input() btnClass: string = 'btn-primary';

  @Output() value: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass = 'btn ' + this.btnClass;
  }

  changeValue(value: number) {
    this.progreso = this.progreso + value;
    this.value.emit(this.progreso);

    if (this.progreso >= 100) {
      this.value.emit(100);
      this.progreso = 100;
    }

    if (this.progreso <= 0) {
      this.value.emit(0);
      this.progreso = 0;
    }
  }

  limitValue() {
    if (this.progreso > 100) {
      this.progreso = 100;
    }
    if (this.progreso < 0 || this.progreso == null) {
      this.progreso = 0;
    }
  }

  onChange(value: number) {
    this.value.emit(value);
  }

}
