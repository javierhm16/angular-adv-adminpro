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

  constructor(private http: HttpClient, private router: Router) { }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap(
          (res: any) => {
            localStorage.setItem('token', res.token);
          }
        )

      );;
  }

  updateUser(data: { name: string, email: string, role: string }) {
    data = {
      ...data,
      role: this.user.rol || ''
    }

    return this.http.put(
      `${base_url}/users/${this.uid}`,
      data,
      {
        headers: {
          'x-token': this.token
        }
      }
    )
  }

  login(formData: any) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap(
          (res: any) => {
            localStorage.setItem('token', res.token);
          }
        )

      );
  }

  loginGoogle(token: any) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap(
          (res: any) => {
            localStorage.setItem('token', res.token);
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
          localStorage.setItem('token', res.token);
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
    this.router.navigateByUrl('/login');
  }

}
