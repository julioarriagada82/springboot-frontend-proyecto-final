import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { HorarioTurno } from './../_model/horarioTurno';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HorarioTurnoService {

  horarioTurnoCambio = new Subject<HorarioTurno[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/horariosTurnos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<HorarioTurno[]>(this.url);
  }

  listarPorId(idHorarioTurno: number) {
    return this.http.get<HorarioTurno>(`${this.url}/${idHorarioTurno}`);
  }

  registrar(horarioTurno: HorarioTurno) {
    return this.http.post(this.url, horarioTurno);
  }

  modificar(horarioTurno: HorarioTurno) {
    return this.http.put(this.url, horarioTurno);
  }

  eliminar(idHorarioTurno: number) {
    return this.http.delete(`${this.url}/${idHorarioTurno}`);
  }
}