import { ServicioPK, VencimientoCalculado } from "./model.index";

/*export interface VehiculoOcupacion{
    etaDesde: number;
    etaHasta: number;
    vehiculoPK: VehiculoPK;
}*/

export interface VehiculoOcupacion{
    vehiculoPK: VehiculoPK;
    patente: string;
    estado: number;
    servicios: VehiculoServ[];
    incidencias: VehiculoIndicencia[];
    viajes: VehiculoViajesEsp[];
}

export interface VehiculoServ {
    servicioPK: ServicioPK;
    estado:number;
    fechaHoraSalida:Date;
    fechaHoraLlegada:Date;  
}


export interface VehiculoViajesEsp{
    idViaje:number;
    inicio:Date
    fin:Date;
}

export interface VehiculoPK {
    vehEmpCodigo: string;
    vehInterno: number;
}

export interface Vehiculo{
    vehiculoPK:VehiculoPK,
    vehEstado:number,
    vehPatente: String,
    vehMotor: String,
    vehChasis: String,
    vehCarroceria: String,
    vehMovilGps: String,    
    vehVerificacionTecnicaVto: Date,        
    vehVencido?: boolean,    
    vencimientos?:Array<VencimientoCalculado>;
    mapaAsiento?:MapaAsiento
}

export interface MapaAsiento{
    mapaAsientoPK:MapaAsientoPK,
    descripcion?:string
}

export interface MapaAsientoPK{
    empresa: string,
    codigo: number
}

export interface VehiculosArray{
    comboMapas: Array<VehiculoOp>;

}

export interface VehiculoOp{
    int:number;
    escripcion: String;
}

export interface VehiculoIndicencia{
    id:number;
    idIncidencia:number;
    inicio:Date;
    fin:Date;
}

export interface ListaVehiculoIncidencia{
    incidencias: Array<VehiculoIndicencia>;
}

export interface VehiculoMinDTO{
    vehiculoPK: VehiculoPK;
    vehEstado: number;
}

export interface VehiculoPKConDet{
    vehiculoPK: VehiculoPK;
    interno:String;
    detalles:Array<String>;
}


export interface VehiCombo{
    vehiculoPK: VehiculoPK,
    vehiculoPKStr: string,                  
    interno: number,
    classObj: string; 
}

