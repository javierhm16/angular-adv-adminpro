import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  get token(): string {
    return localStorage.getItem('token') || '';
  };

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  constructor(private http: HttpClient) { }

  private transformusers(results: any[]): User[] {
    return results.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.rol, user.uid)
    )
  }

  search(type: 'users' | 'medicos' | 'hospitals', term: string = '') {
    const url = `${base_url}/search/collection/${type}/${term}`;
    return this.http.get(url, this.headers)
      .pipe(
        map(
          (res: any) => {
            switch (type) {
              case 'users':
                return this.transformusers(res.results);
                break;

              default:
                return []
            }
          }
        )
      )
      ;
  }

}
