import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    const token = localStorage.getItem('token') || '';

    return this.http.get(
      `${base_url}/login/renew`,
      {
        headers: { 'x-token': token }
      }
    ).pipe(
      tap(
        (res: any) => {
          localStorage.setItem('token', res.token);
        }
      ),
      map(res => true),
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
