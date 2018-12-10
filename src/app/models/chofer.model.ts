import { ChoferPK } from "./choferPK.model";

export interface Chofer {
    choferPK: ChoferPK;
    etaDesde:number;
    etaHasta:number;
    nombre:string;
    nombreConTipo: string;
    tipoChofer: number;
}




