import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Condominio } from './../_model/condominio';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {

  condominioCambio = new Subject<Condominio[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/condominios`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Condominio[]>(this.url);
  }

  listarPorId(idCondominio: number) {
    return this.http.get<Condominio>(`${this.url}/${idCondominio}`);
  }

  registrar(condominio: Condominio) {
    return this.http.post(this.url, condominio);
  }

  modificar(condominio: Condominio) {
    return this.http.put(this.url, condominio);
  }

  eliminar(idCondominio: number) {
    return this.http.delete(`${this.url}/${idCondominio}`);
  }
}