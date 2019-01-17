import { ChoferPK } from "./model.index";

export interface Carnet{
    id : number;
    tipo: number,
    fechaEmision: Date;
    fechaVenc: Date;
    numeroCarnet: String;
    observaciones: String;
}

export interface CarnetChofer{
    id : number;
    tipo: number,
    fechaEmision: Date;
    fechaVenc: Date;
    fechaVencString : String;
    fechaEmisionString: String;
    numeroCarnet: String;
    observaciones: String;
    choferPK: ChoferPK;
    cho_nombre: String;
}


export interface ListaCarnet{
    carnets: Array<Carnet>;
}