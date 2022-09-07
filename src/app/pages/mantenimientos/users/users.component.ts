import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  totalUsers: number = 0;
  users: any = [];
  tempUsers: User[] = [];
  from: number = 0;
  loading: boolean = true;

  imgSubs!: Subscription;

  constructor(private usersSvc: UserService, private searchSvc: SearchService, private modalImgSvc: ModalImgService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImgSvc.newImg
      .pipe(
        delay(1000)
      )
      .subscribe(img => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;

    this.usersSvc.loadUsers(this.from).subscribe(
      ({ total, users }) => {
        this.totalUsers = total;
        this.users = users;
        this.tempUsers = users;
        this.loading = false;
      }
    );
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0
    } else if (this.from > this.totalUsers) {
      this.from = this.totalUsers;
    };

    this.loadUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      this.users = this.tempUsers;
      return;
    }

    this.searchSvc.search('users', term).subscribe(
      res => {
        this.users = res;
      }
    )
  }

  deleteUser(user: User) {
    if (user.uid === this.usersSvc.uid) {
      return Swal.fire('Error', 'You cant delete this user', 'error');
    }

    Swal.fire({
      title: 'Delete user?',
      text: `Are you going to delete ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((res) => {
      if (res.value) {
        this.usersSvc.deleteUser(user).subscribe(
          res => {
            this.loadUsers();
            Swal.fire(
              'Deleted!',
              'The user has been deleted',
              'success'
            );
          }
        )
      };
    })
    return;
  }

  changeRole(user: User) {
    this.usersSvc.updateUser2(user).subscribe();
  }

  openModal(user: User) {
    this.modalImgSvc.openModal('users', user.uid || '', user.img);
  }

}
