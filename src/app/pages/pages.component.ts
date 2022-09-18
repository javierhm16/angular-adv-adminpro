import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunction(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private settingSvc: SettingsService, private sidebarSvc: SidebarService) { }

  ngOnInit(): void {
    customInitFunction();
    this.sidebarSvc.loadMenu();
  }

}
