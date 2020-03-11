import { Chofer, ChoferPK } from "./chofer.model";
import { Vehiculo, VehiculoPK } from "./vehiculo.model";

export interface Servicio {
    servicioPK:ServicioPK;
    estado: number;
    fechaHoraSalida: Date;
    escSalida: string;
    fechaHoraLlegada:Date;    
    escLlegada: string;
    etaInicio: number;
    etaFin: number;    
    choferes: ChoferServicio[]; 
    vehiculos:Array<Vehiculo>;
    horarios:Array<Horario>;
    servicioPKStr?:string;
    detalle?:string; 

    escalaSalida?:string;
    escalaLlegada?:string;

}

export interface ChoferServicio{
    choferPK: ChoferPK;    
    tipoChofer: number;
    etaDesde: number;	
    etaHasta: number;
    fechaHoraSalida: Date;
    fechaHoraLlegada: Date;
    nombre:	string;
    nombreConTipo:string;
    ordenChofer: number;
    idAux:number;    
}

export interface VehiculoServicio{
    vehiculoPK: VehiculoPK;        
    etaDesde: number;	
    etaHasta: number;
    fechaHoraSalida: Date;
    fechaHoraLlegada: Date;   
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

export interface Horario{
    fechaHoraSalida: Date;
    fechaHoraLlegada: Date;
    accionEtaCodigo:number;
    chofer1: number;
    chofer2: number;
    auxiliar1: number;
    auxiliar2: number;
    interno: number;
    etapa:Etapa;
    codigoEtapa:number;
    nombreChofer1?:string;
    nombreChofer2?:string;
    nombreAux1?:string;
    nombreAux2?:string;
}

export interface Etapa{
    etapaPK: EtapaPK;
    codigoEtapa:number;
}

export interface EtapaPK{
    empresa: string;
    linea: string;
    etaCodigo: number;
}

