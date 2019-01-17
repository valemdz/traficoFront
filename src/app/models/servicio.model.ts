import { Chofer } from "./chofer.model";
import { Vehiculo } from "./vehiculo.model";

export interface Servicio {
    choferes: Array<Chofer>;
    escLlegada: string;
    escSalida: string;
    estado: number;
    etaFin: number;
    etaInicio: number;
    fechaHoraLlegada:Date;    
    fechaHoraSalida: Date;
    servicioPK:ServicioPK;
    vehiculos:Array<Vehiculo>;
    servicioPKStr?:string;
    detalle?:string; 
}

export interface ServicioPK {
    serEmpCodigo:string;
    serLinCodigo: string;
    serFechaHora: Date;
    serRefuerzo: number
}

export interface Servicios {
    servicioPK: ServicioPK;
    serEsrCodigo: number;
}



