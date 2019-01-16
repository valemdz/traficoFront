export interface Person {
    id : number;
}

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
    cho_fecha_nacimiento:Date
    //carnets:Array<Carnet>;
    //choferIncidencias:Array<ChoferIndicencia>;
}

export interface ChoferPK{
    cho_emp_codigo:String;
    cho_codigo:number;
}

export interface VehiculoPK{
    vehEmpCodigo:String;
    vehInterno:number;
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
}

export interface UsuarioPk{
    empresa: String;
    legajo:number;
}
/*

/*export interface Usuario{
    usuarioPk: UsuarioPk;
    login: String;
    pass: String;
    nombre: String;
}*/

export interface Usuario{
    username?: string;
    password?: string;
    name?: string;
    empresa?: string;
    token?: string;
}

export interface Me{
    username: string;
}

export interface UserLogueado{
    empresa: string;
    name: string;
    refreshToken: string;
    token: string;
    username:string;
}

export interface Incidencia {
    id: number;
    codigo:String;
    in_descripcion: String;
    in_tipo: number; /*0 unidades , 1 choferes */
    in_color: String;
    in_empresa: String;
}

export interface VehiculosArray{
    comboMapas: Array<VehiculoOp>;

}

export interface VehiculoOp{
    int:number;
    escripcion: String;
}

export interface OpcCombo{
    codigo:number;
    descripcion: String;
}

 export interface NoAutorizado{
    status:	number; // 401 - 409 - 404
    message: String; // Invalid Username
    errorCode: number; // 	10 codigo interno
    timestamp:	Date;
 }

 export interface Error500 {
    timestamp: Date;
    status:number;
    error:String;
    exception:String;
    message: String;
    path: String;
 }

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

export interface ChoferIndicencia{
    id:number;
    idIncidencia:number;
    inicio:Date;
    fin:Date;
}

export interface VehiculoIndicencia{
    id:number;
    idIncidencia:number;
    inicio:Date;
    fin:Date;
}

export interface ViajeEspecial{
    id: number,
    agenciaContratante: String,
    fechaHoraSalida: Date,
    origen: String,
    destino: String,
    fechaHoraRegreso: Date,
    observaciones:String
    empCodigo:String,
}

export interface ViajeEspecialList{
    id: number,
    agenciaContratante: String,
    fechaHoraSalida: Date,
    origen: String,
    destino: String,
    fechaHoraRegreso: Date,
    observaciones:String
    empCodigo:String,
    choferes: Array<ChoferMinDTO>,
    vehiculo: VehiculoMinDTO
}


export interface ChoferPKConDet{
    choferPK: ChoferPK;
    nombreChofer:String;
    detalles:Array<String>;
}

export interface VehiculoPKConDet{
    vehiculoPK: VehiculoPK;
    interno:String;
    detalles:Array<String>;
}


export interface ChoferMinDTO{
    choferPK: ChoferPK;
    cho_nombre:String;
    cho_estado: number;
}

export interface VehiculoMinDTO{
    vehiculoPK: VehiculoPK;
    vehEstado: number;

}

export interface ListaChoferPK {
    choferesPK: Array<ChoferPK>;
}

/*export interface AuxiliarPK {
  cho_emp_codigo: String;
  cho_codigo: number;
}

export interface ListaAuxPK {
  auxiliaresPK: Array<AuxiliarPK>;
}
*/
export interface ListaCarnet{
    carnets: Array<Carnet>;
}

export interface ListaChoferIncidencia{
    choferIncidencias: Array<ChoferIndicencia>;
}

export interface ListaVehiculoIncidencia{
    incidencias: Array<VehiculoIndicencia>;
}

export interface Servicios {
    servicioPK: ServicioPK;
    serEsrCodigo: number;
}
export interface ServicioPK {
    serEmpCodigo: String;
    serLinCodigo: String;
    serFechaHora: Date;
    serRefuerzo: number;
}
