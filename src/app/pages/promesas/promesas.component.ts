import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promise = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('HM')
    //   } else {
    //     reject('Algo salio mal');
    //   }
    // });

    // promise
    //   .then((msg) => {
    //     console.log(msg)
    //   })
    //   .catch(error => {
    //     console.log('Error', error)
    //   })

    this.getUsers().then(users => {
      console.log(users);
    })

  }

  getUsers() {
    const promise = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(res => res.json()
          .then(body => {
            resolve(body.data);
          }))
    })

    return promise;
  }

}
