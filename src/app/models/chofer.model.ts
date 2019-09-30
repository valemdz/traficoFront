import { Vencimiento, Carnet, ServicioPK, VencimientoCalculado } from "./model.index";

export class Chofer {
   constructor( public choferPK: ChoferPK,
                public estado?: number,
                public tipoChofer?: number,
                public legajo?: number,
                public nombre?: string,
                public codigoDoc?: number,
                public documento?: String,
                public grupoSanguineo?: String,
                public observaciones?: String,
                public telefono?: String,
                public telefonoEmergencia?: String,
                public fechaNacimiento?:Date,
                public funcion?:string, 
                public idAux?:number,   
                public carnets?:Carnet[],
                public vencido?:boolean,
                public foto?:string,
                public vencimientos?:Array<VencimientoCalculado> ){}
    
}

export interface ChoferPK {
    empCodigo: string;
    codigo: number;
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
    nombre:String;
    estado: number;
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
    idAux:number;
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
