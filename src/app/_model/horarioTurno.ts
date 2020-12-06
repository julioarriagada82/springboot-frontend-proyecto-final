import { PeriodoHorario } from './periodoHorario';

export class HorarioTurno{
    idHorarioTurno: number;
    nombre: string;
    cerrado: boolean;
    horaInicio: string;
    horaTermino: string;
    periodoHorario: PeriodoHorario;
}