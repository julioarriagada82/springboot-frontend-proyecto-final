import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Ocupacion } from './../_model/ocupacion';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcupacionService {

  ocupacionCambio = new Subject<Ocupacion[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/ocupaciones`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Ocupacion[]>(this.url);
  }

  listarPorId(idOcupacion: number) {
    return this.http.get<Ocupacion>(`${this.url}/${idOcupacion}`);
  }

  registrar(ocupacion: Ocupacion) {
    return this.http.post(this.url, ocupacion);
  }

  modificar(ocupacion: Ocupacion) {
    return this.http.put(this.url, ocupacion);
  }

  eliminar(idOcupacion: number) {
    return this.http.delete(`${this.url}/${idOcupacion}`);
  }
}