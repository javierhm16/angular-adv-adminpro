import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', path: '' },
        { title: 'Progressbar', path: 'progress' },
        { title: 'Charts', path: 'grafica1' },
      ]
    }
  ]

  constructor() { }
}
