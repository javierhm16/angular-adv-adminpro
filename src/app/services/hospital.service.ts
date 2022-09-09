import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  loadHospitals() {
    const url = `${base_url}/hospitals`;
    return this.http.get(url, this.headers)
      .pipe(
        map(
          (res: any) => res.hospitals
        )
      );
  }

  createHospital(name: string) {
    const url = `${base_url}/hospitals`;
    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(name: string, _id: string) {
    const url = `${base_url}/hospitals/${_id}`;
    return this.http.put(url, { name }, this.headers);
  }

  deleteHospital(_id: string) {
    const url = `${base_url}/hospitals/${_id}`;
    return this.http.delete(url, this.headers);
  }

}
