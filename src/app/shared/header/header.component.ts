import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

declare let google: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: User;

  constructor(private userSvc: UserService, private router: Router) {
    this.user = userSvc.user;
  }

  ngOnInit(): void {
  }

  logout() {
    this.userSvc.logout();
    google.accounts.id.revoke('javierhm16gm@gmail.com', () => {
      console.log('consent revoked');
    });
  }

  search(terms: string) {
    if (terms.length === 0) {

    } else {
      this.router.navigateByUrl(`dashboard/search/${terms}`)
    }
  }

}
