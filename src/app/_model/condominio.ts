import { TipoCondominio } from './tipoCondominio';

export class Condominio{
    idCondominio: number;
    nombreCondominio: string;
    descripcionCondominio: string;
    direccionCondominio: string;
    urlCondominio: string;
    telefonoCondominio: string;
    tipoCondominio: TipoCondominio;
}