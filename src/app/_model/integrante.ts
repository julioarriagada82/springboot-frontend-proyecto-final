import { Casa } from './casa';
import { Parentesco } from './parentesco';
import { Ocupacion } from './ocupacion';

export class Integrante {
    idIntegrante: number;
    casa: Casa;
    ocupacion: Ocupacion;
    parentesco: Parentesco;
    rut: string;
    nombre: string;
    paterno: string;
    materno: string;
    email: string;
    telefono: string;
    fechaNacimiento: string;
}