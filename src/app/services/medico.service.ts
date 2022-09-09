import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  loadMedicos() {
    const url = `${base_url}/medicos`;
    return this.http.get(url, this.headers)
      .pipe(
        map(
          (res: { ok: boolean, medicos: Medico[] }) => res.medicos
        )
      );
  }

  createMedico(medico: { name: string, hospital: string }) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);
  }

  updateMedico(name: string, hospital: string, id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.put(url, { name, hospital }, this.headers);
  }

  deleteMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }

  getMedicoById(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map(
          (res: { ok: boolean, medico: Medico }) => res.medico
        )
      );
  }

}
