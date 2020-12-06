import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Directiva } from './../_model/directiva';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectivaService {

  directivaCambio = new Subject<Directiva[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/directivas`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Directiva[]>(this.url);
  }

  listarPorId(idDirectiva: number) {
    return this.http.get<Directiva>(`${this.url}/${idDirectiva}`);
  }

  registrar(directiva: Directiva) {
    return this.http.post(this.url, directiva);
  }

  modificar(directiva: Directiva) {
    return this.http.put(this.url, directiva);
  }

  eliminar(idDirectiva: number) {
    return this.http.delete(`${this.url}/${idDirectiva}`);
  }
}
