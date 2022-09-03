import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo')
    //   } else {
    //     reject('Algo salio mal')
    //   }
    // });
    // promesa.then((msg) => {
    //   console.log(msg);
    // })
    //   .catch(err => {
    //     console.log(err);
    //   })

    // console.log('Fin del init');

    this.getUsuarios()
      .then(data => {
        console.log(data)
      })

  }

  getUsuarios() {
    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(body => resolve(body.data))
    });

    return promesa;

  }

}
