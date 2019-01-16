import {Injectable} from '@angular/core';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationPropertySort } from 'src/app/shared/pagination';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { Vehiculo } from 'src/app/domain';



@Injectable()
export class VehiculoService {

    private urlBase = environment.origin;

    /*private headers = new Headers({'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'});*/

    constructor(private http: HttpClient ) {
    }

    findVehiculos$(page: number, pageSize: number, sort: PaginationPropertySort, vehEmpCodigo: String ): Observable<any> {
      const url = this.urlBase + `/vehiculos/empresa/${vehEmpCodigo}`;
      const params = FuncionesGrales.toParams( page, pageSize, sort );
      return this.http.get( url, params );
    }

    viewVehiculo$( id: number ): Observable<any> {
        const url =  this.urlBase + `/vehiculo/${id}`;
        return this.http.get( url );
    }

    getVehiculo$(id: number): Observable<any> {
      const url = this.urlBase + `/vehiculo/${id}`;
      return this.http.get( url );
    }

    update$( vehiculo: Vehiculo ): Observable<any> {
        const url = this.urlBase + `/vehiculos/empresa/${vehiculo.vehiculoPK.vehEmpCodigo}/interno/${vehiculo.vehiculoPK.vehInterno}`;
        return this.http
        .put( url, vehiculo );
    }

     create$( vehiculo: Vehiculo ): Observable<any>{
        const url = this.urlBase + `/vehiculos`;
        return this.http.post( url, vehiculo );
    }

   deleteVehiculo$( vehEmpCodigo: String,  vehInterno: number): Observable<any> {
        const url = this.urlBase + `/vehiculos/empresa/${vehEmpCodigo}/interno/${vehInterno}`
        return this.http.delete(url);
   }

    getOpcionesVeh$( vehEmpCodigo): Observable<any> {
        const url = this.urlBase + `/empresa/${vehEmpCodigo}/vehiculosCb`;
        return this.http.get( url );
    }

    getIncidenciasByVehiculo$( idEmpresa: String, idInterno: number ): Observable<any> {
      const url = this.urlBase + `/vehiculos/empresa/${idEmpresa}/interno/${idInterno}/incidencias`;
      return this.http.get( url );
    }

    saveIncidenciasByVehiculo$(  vehEmpCodigo: String, vehInterno: number, incidenciasDeepCopy ) {
        const url = this.urlBase + `/vehiculos/empresa/${vehEmpCodigo}/interno/${vehInterno}/incidencias`;
        return this.http.put(url, incidenciasDeepCopy );
    }


}
