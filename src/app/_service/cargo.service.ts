import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Cargo } from './../_model/cargo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  cargoCambio = new Subject<Cargo[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/cargos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cargo[]>(this.url);
  }

  listarPorId(idCargo: number) {
    return this.http.get<Cargo>(`${this.url}/${idCargo}`);
  }

  registrar(cargo: Cargo) {
    return this.http.post(this.url, cargo);
  }

  modificar(cargo: Cargo) {
    return this.http.put(this.url, cargo);
  }

  eliminar(idCargo: number) {
    return this.http.delete(`${this.url}/${idCargo}`);
  }
}