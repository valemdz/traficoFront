import {Injectable} from '@angular/core';
import {Vehiculo, VehiculoIndicencia} from './../domain'
import {VehiculoOp, VehiculosArray} from './../domain';
import {PaginationPage, PaginationPropertySort} from './../shared/pagination';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuncionesGrales } from '../utiles/funciones.grales';





@Injectable()
export class VehiculoService{

    //private headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});

    constructor(private http: HttpClient ) {
    }

    findVehiculos(page: number, pageSize: number, sort: PaginationPropertySort, vehEmpCodigo: String ): Observable<any> {

      const params = FuncionesGrales.toParams( page, pageSize, sort );
      return this.http.get(`/vehiculos/empresa/${vehEmpCodigo}`, params);
    }


    //para ver el detalle
    viewVehiculo(id:number): Observable<any>{
         return this.http.get(`/vehiculo/${id}`);
    }

    getVehiculo(id: number): Observable<any> {
        return this.http.get(`/vehiculo/${id}`);
    }

    update( vehiculo: Vehiculo ): Observable<any> {
        const url = `/vehiculos/empresa/${vehiculo.vehiculoPK.vehEmpCodigo}/interno/${vehiculo.vehiculoPK.vehInterno}`;
        return this.http
        .put(url, JSON.stringify(vehiculo));
    }

     create( vehiculo: Vehiculo ): Observable<any>{
        const url = `/vehiculos`;
        return this.http.post(url, JSON.stringify(vehiculo));

    }

   private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
   }

   deleteVehiculo( vehEmpCodigo:String,  vehInterno:number): Observable<any> {
        const url = `/vehiculos/empresa/${vehEmpCodigo}/interno/${vehInterno}`
        return this.http.delete(url);
   }

    getOpcionesVeh( vehEmpCodigo): Observable<any> {
        return this.http.get(`/empresa/${vehEmpCodigo}/vehiculosCb`);
    }

    getIncidenciasByVehiculo( idEmpresa:String, idInterno:number ):Observable<any>{
      return this.http.get(`/vehiculos/empresa/${idEmpresa}/interno/${idInterno}/incidencias`);
    }

    saveIncidenciasByVehiculo(  vehEmpCodigo:String, vehInterno:number, incidenciasDeepCopy ){
        const url = `/vehiculos/empresa/${vehEmpCodigo}/interno/${vehInterno}/incidencias`;
        return this.http.put(url, JSON.stringify(incidenciasDeepCopy));
     }


}
