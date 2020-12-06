import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Casa } from './../_model/casa';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CasaService {

  casaCambio = new Subject<Casa[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/casas`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Casa[]>(this.url);
  }

  listarPorId(idCasa: number) {
    return this.http.get<Casa>(`${this.url}/${idCasa}`);
  }

  registrar(casa: Casa) {
    return this.http.post(this.url, casa);
  }

  modificar(casa: Casa) {
    return this.http.put(this.url, casa);
  }

  eliminar(idCasa: number) {
    return this.http.delete(`${this.url}/${idCasa}`);
  }
}