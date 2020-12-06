import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { PeriodoHorario } from './../_model/periodoHorario';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodoHorarioService {

  periodoHorarioCambio = new Subject<PeriodoHorario[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/periodoshorarios`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<PeriodoHorario[]>(this.url);
  }

  listarPorId(idPeriodoHorario: number) {
    return this.http.get<PeriodoHorario>(`${this.url}/${idPeriodoHorario}`);
  }

  registrar(periodoHorario: PeriodoHorario) {
    return this.http.post(this.url, periodoHorario);
  }

  modificar(periodoHorario: PeriodoHorario) {
    return this.http.put(this.url, periodoHorario);
  }

  eliminar(idPeriodoHorario: number) {
    return this.http.delete(`${this.url}/${idPeriodoHorario}`);
  }
}