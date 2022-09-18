import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu = [];

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/' },
  //       { title: 'Progressbar', url: 'progress' },
  //       { title: 'Gráficas', url: 'grafica' },
  //       { title: 'Promesas', url: 'promesas' },
  //       { title: 'Rxjs', url: 'rxjs' },
  //     ]
  //   },

  //   {
  //     title: 'Mantenimientos',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Users', url: 'users' },
  //       { title: 'Hospitals', url: 'hospitals' },
  //       { title: 'Medicos', url: 'medicos' },
  //     ]
  //   }
  // ]

  constructor() { }

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

}
