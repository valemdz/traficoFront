import { ChoferMinDTO, VehiculoMinDTO } from "./model.index";

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