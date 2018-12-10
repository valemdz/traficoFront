import { VehiculoPK } from "./vehiculoPK.model";

export interface Vehiculo {
    etaDesde: number;
    etaHasta: number;
    vehiculoPK: VehiculoPK;
}