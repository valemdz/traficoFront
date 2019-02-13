import { Vencimiento, Carnet } from "./model.index";

export interface Chofer {
    choferPK: ChoferPK,
    cho_estado: number,
    cho_chofer: number,
    cho_legajo: number,
    cho_nombre: String,
    cho_doc_codigo: number,
    cho_documento: String,
    cho_grupo_sanguineo: String,
    cho_observaciones: String,
    cho_telefono: String,
    cho_telefono_emergencia: String,
    cho_fecha_nacimiento:Date,
    cho_funcion?:string,    
    carnets?:Carnet[];
    
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

export interface ChoferOcupacion {
    choferPK: ChoferPK;
    etaDesde:number;
    etaHasta:number;
    nombre:string;
    nombreConTipo: string;
    tipoChofer: number;
}


export interface ChoferIndicencia{
    id:number;
    idIncidencia:number;
    inicio:Date;
    fin:Date;
}

export interface ListaChoferIncidencia{
    choferIncidencias: Array<ChoferIndicencia>;
}
