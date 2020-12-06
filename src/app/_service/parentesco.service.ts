import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Parentesco } from './../_model/parentesco';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParentescoService {

  parentescoCambio = new Subject<Parentesco[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/parentescos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Parentesco[]>(this.url);
  }

  listarPorId(idParentesco: number) {
    return this.http.get<Parentesco>(`${this.url}/${idParentesco}`);
  }

  registrar(parentesco: Parentesco) {
    return this.http.post(this.url, parentesco);
  }

  modificar(parentesco: Parentesco) {
    return this.http.put(this.url, parentesco);
  }

  eliminar(idParentesco: number) {
    return this.http.delete(`${this.url}/${idParentesco}`);
  }
}