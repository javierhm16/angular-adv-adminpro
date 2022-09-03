import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user!: User;

  menuItems: any[];

  constructor(private sidebarSvc: SidebarService, private userSvc: UserService) {
    this.menuItems = sidebarSvc.menu;

    this.user = userSvc.user;
  }

  ngOnInit(): void {
  }

}
