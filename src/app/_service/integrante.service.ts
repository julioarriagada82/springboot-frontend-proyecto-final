import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Integrante } from './../_model/integrante';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntegranteService {

  integranteCambio = new Subject<Integrante[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/integrantes`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Integrante[]>(this.url);
  }

  listarPorId(idIntegrante: number) {
    return this.http.get<Integrante>(`${this.url}/${idIntegrante}`);
  }

  registrar(integrante: Integrante) {
    return this.http.post(this.url, integrante);
  }

  modificar(integrante: Integrante) {
    return this.http.put(this.url, integrante);
  }

  eliminar(idIntegrante: number) {
    return this.http.delete(`${this.url}/${idIntegrante}`);
  }
}