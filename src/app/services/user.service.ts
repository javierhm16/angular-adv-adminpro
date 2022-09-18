import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  get token(): string {
    return localStorage.getItem('token') || '';
  };

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  get role(): string {
    return this.user.role;
  }

  constructor(private http: HttpClient, private router: Router) { }

  saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap(
          (res: any) => {
            this.saveLocalStorage(res.token, res.menu);
          }
        )

      );;
  }

  updateUser(data: { name: string, email: string, role: string }) {
    data = {
      ...data,
      role: this.user.role || ''
    };

    return this.http.put(
      `${base_url}/users/${this.uid}`,
      data,
      this.headers
    )
  }

  login(formData: any) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap(
          (res: any) => {
            this.saveLocalStorage(res.token, res.menu);
          }
        )

      );
  }

  loginGoogle(token: any) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap(
          (res: any) => {
            this.saveLocalStorage(res.token, res.menu);
          }
        )

      );
  }

  validateToken() {
    return this.http.get(
      `${base_url}/login/renew`,
      {
        headers: { 'x-token': this.token }
      }
    ).pipe(
      map(
        (res: any) => {
          this.user = new User(res.name, res.email, '', res.img, res.google, res.role, res.uid);
          this.saveLocalStorage(res.token, res.menu);
          return true;
        }
      ),
      catchError(
        err => of(false)
      )
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  loadUsers(from: number = 0) {
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<{ total: number, user: User[] }>(url, this.headers)
      .pipe(
        map(
          res => {
            const users = res.user.map(
              user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
            );
            return {
              total: res.total,
              users
            };
          }
        )
      )
  }

  deleteUser(user: User) {
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  updateUser2(user: User) {
    return this.http.put(
      `${base_url}/users/${user.uid}`,
      user,
      this.headers
    )
  }

}
