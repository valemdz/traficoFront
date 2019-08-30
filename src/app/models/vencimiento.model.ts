import { Vehiculo } from "./model.index";

export class Vencimiento{
    activo:boolean;
    cantidadAnticipacion:number;    
    empresa:string;
    id?:number;
    tipoVencimiento?:TipoVencimiento;
} 

export class TipoVencimiento{
    descNombreCampo:string;
    id:number;
    nombreCampo:string;
    nombreEntidad:string;
}


export class VencimientosVehiculo{
    vencimiento:Vencimiento;
	vehiculos: Vehiculo[];
}

export class VencimientoCalculado{
    id: number;
    cantidadAnticipacion: number;
    nombreCampo: string;
    descNombreCampo: string;
    diasAntesVencer: number;
    fechaVencimiento: Date;
    vencido?:boolean;
}