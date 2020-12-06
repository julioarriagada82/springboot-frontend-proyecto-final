import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Portero } from './../_model/portero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PorteroService {

  porteroCambio = new Subject<Portero[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/porteros`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Portero[]>(this.url);
  }

  listarPorId(idPortero: number) {
    return this.http.get<Portero>(`${this.url}/${idPortero}`);
  }

  registrar(portero: Portero) {
    return this.http.post(this.url, portero);
  }

  modificar(portero: Portero) {
    return this.http.put(this.url, portero);
  }

  eliminar(idPortero: number) {
    return this.http.delete(`${this.url}/${idPortero}`);
  }
}