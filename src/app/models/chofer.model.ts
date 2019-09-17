import { Vencimiento, Carnet, ServicioPK, VencimientoCalculado } from "./model.index";

export class Chofer {
   constructor( public choferPK: ChoferPK,
                public cho_estado?: number,
                public cho_chofer?: number,
                public cho_legajo?: number,
                public cho_nombre?: string,
                public cho_doc_codigo?: number,
                public cho_documento?: String,
                public cho_grupo_sanguineo?: String,
                public cho_observaciones?: String,
                public cho_telefono?: String,
                public cho_telefono_emergencia?: String,
                public cho_fecha_nacimiento?:Date,
                public cho_funcion?:string, 
                public cho_id_aux?:number,   
                public carnets?:Carnet[],
                public cho_vencido?:boolean,
                public foto?:string,
                public vencimientos?:Array<VencimientoCalculado> ){}
    
}

export interface ChoferPK {
    cho_emp_codigo: string;
    cho_codigo: number;
}

export class VencimientosChoferes{
    vencimiento:Vencimiento;
	choferes: Chofer[];
}

export interface ListaChoferPK {
    choferesPK: Array<ChoferPK>;
}

export interface ChoferPKConDet{
    choferPK: ChoferPK;
    nombreChofer:String;
    detalles:Array<String>;
}

export interface ChoferMinDTO{
    choferPK: ChoferPK;
    cho_nombre:String;
    cho_estado: number;
}

export interface ComboCho{
    choferPK: ChoferPK;
    choferPKStr: string;
    classCho: string;
    nombre: string;
    nombreConTipo: string;
}

/*export interface ChoferOcupacion {
    choferPK: ChoferPK;
    etaDesde:number;
    etaHasta:number;
    nombre:string;
    nombreConTipo: string;
    tipoChofer: number;
}*/

export interface ChoferOcupacion {
    choferPK:ChoferPK;    
    nombre:string;
    tipoChofer:number;
    estado:number;
    nombreConTipo:string;
    cho_id_aux:number;
    servicios:ChoferServ[];
    incidencias:ChoferIndicencia[];
    viajes:ChoferViajesEsp[];
}

export interface ChoferServ {
    servicioPK: ServicioPK;
    estado:number;
    fechaHoraSalida:Date;
    fechaHoraLlegada:Date;  
}

export interface ChoferIndicencia{
    id?:number;
    idIncidencia:number;
    inicio:Date;
    fin:Date;
}

export interface ChoferViajesEsp{
    idViaje:number;
    inicio:Date
    fin:Date;
}

export interface ListaChoferIncidencia{
    choferIncidencias: Array<ChoferIndicencia>;
}
