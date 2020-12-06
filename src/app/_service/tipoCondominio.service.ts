import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { TipoCondominio } from './../_model/tipoCondominio';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoCondominioService {

  tipoCondominioCambio = new Subject<TipoCondominio[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/tiposcondominios`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<TipoCondominio[]>(this.url);
  }

  listarPorId(idTipoCondominio: number) {
    return this.http.get<TipoCondominio>(`${this.url}/${idTipoCondominio}`);
  }

  registrar(tipoCondominio: TipoCondominio) {
    return this.http.post(this.url, tipoCondominio);
  }

  modificar(tipoCondominio: TipoCondominio) {
    return this.http.put(this.url, tipoCondominio);
  }

  eliminar(idTipoCondominio: number) {
    return this.http.delete(`${this.url}/${idTipoCondominio}`);
  }
}