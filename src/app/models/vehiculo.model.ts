export interface VehiculoOcupacion{
    etaDesde: number;
    etaHasta: number;
    vehiculoPK: VehiculoPK;
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
    vehMpaCodigo: String,
    vehVerificacionTecnica: Date;
    vehMpaDesc?:string
    vehVencido?: boolean;
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