import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { ListaNegra } from './../_model/listaNegra';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaNegraService {

  listaNegraCambio = new Subject<ListaNegra[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/listasnegras`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<ListaNegra[]>(this.url);
  }

  listarPorId(idListaNegra: number) {
    return this.http.get<ListaNegra>(`${this.url}/${idListaNegra}`);
  }

  registrar(listaNegra: ListaNegra) {
    return this.http.post(this.url, listaNegra);
  }

  modificar(listaNegra: ListaNegra) {
    return this.http.put(this.url, listaNegra);
  }

  eliminar(idListaNegra: number) {
    return this.http.delete(`${this.url}/${idListaNegra}`);
  }
}