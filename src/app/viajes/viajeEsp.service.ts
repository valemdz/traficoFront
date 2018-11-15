
import {Injectable} from '@angular/core';
import { PaginationPropertySort} from '../shared/pagination';
// import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { Observable } from 'rxjs';
import { ViajeEspecial, VehiculoPK, ViajeEspecialList } from '../domain';
import { HttpClient } from '@angular/common/http';
import { FuncionesGrales } from '../utiles/funciones.grales';
import { environment } from 'src/environments/environment';



@Injectable()
export class ViajeEspServive {

    private urlBase = environment.origin;

    /*private headers = new Headers({'Content-Type': 'application/json',
     'Access-Control-Allow-Origin':'*'});*/

    constructor(private http: HttpClient ) {
    }

    getEscalasByProvincia( escProCodigo: String ): Observable<any> {
        const url = this.urlBase + `/ViajesEspeciales/provincia/${escProCodigo}/escalas`;
        return this.http.get( url );
    }

    getProvincias() {
        const url = this.urlBase + `/ViajesEspeciales/provincias`;
        return this.http.get( url );
    }

    saveViajeEspecial( viaje: ViajeEspecial ): Observable<any> {
        const url = this.urlBase + `/ViajesEspeciales`;
        return this.http.post( url, viaje );
    }

    saveComentariosViajeEspecial( idViaje: number, viaje: ViajeEspecial ): Observable<any> {
       const url = this.urlBase + `/ViajesEspeciales/${idViaje}/comentarios`;
       return this.http.put(url, viaje );
    }

    getVehiculos( idViaje: number ): Observable<any> {
        const url = this.urlBase + `/ViajesEspeciales/${idViaje}/vehiculos`;
        return this.http.get( url );
    }

    getVehiculosLibres( idViaje: number ): Observable<any> {
        const url = this.urlBase + `/ViajesEspeciales/${idViaje}/vehiculosDisp`;
        return this.http.get( url );
    }

    getViajesEspeciales( empCodigo: String, inicio: any, fin: any): Observable<any> {

        const url = this.urlBase + `/ViajesEspeciales/empresa/${empCodigo}/fechaInicio/${inicio}/fechaFin/${fin}/viajes`;
        return this.http.get(url);
    }

    findViajes(page: number, pageSize: number, sort: PaginationPropertySort,
        idEmpresa: String, inicio: any, fin: any ): Observable<any> {

        const params = FuncionesGrales.toParams( page, pageSize, sort );
        const url = this.urlBase + `/ViajesEspeciales/empresa/${idEmpresa}/fechaInicio/${inicio}/fechaFin/${fin}/viajes`;
        return this.http.get(url, params );
    }

    setVehiculo( idViaje: number, vehiculoPK: VehiculoPK ) {
        const url = this.urlBase + `/ViajesEspeciales/${idViaje}/vehiculo`;
        return this.http.post( url, vehiculoPK );
    }

    getVehiculoByViaje( idViaje: number ): Observable<any> {
        const url = this.urlBase + `/ViajesEspeciales/${idViaje}/vehiculo`;
        return this.http.get(url);
    }

    getChoferes( empCodigo: String ): Observable<any> {
        const url = this.urlBase + `/ViajesEspeciales/empresa/${empCodigo}/choferes`;
        return this.http.get(url);
    }

    getAuxiliares( empCodigo: String ): Observable<any> {
      const url = this.urlBase + `/ViajesEspeciales/empresa/${empCodigo}/auxiliares`;
      return this.http.get(url);
  }

    getChoferesLibres( idViaje: number ): Observable<any> {
        const url = this.urlBase + `/ViajesEspeciales/${idViaje}/choferesDisp`;
        return this.http.get(url);
    }
    getAuxiliaresLibres( idViaje: number ): Observable<any> {
      const url = this.urlBase + `/ViajesEspeciales/${idViaje}/auxiliaresDisp`;
      return this.http.get(url);
  }

    saveChoferes( idViaje: number, listaChoferesPk ): Observable<any> {
        const url = this.urlBase + `/ViajesEspeciales/${idViaje}/choferes`;
        return this.http.post(url, listaChoferesPk );
    }

    saveAuxiliares( idViaje: number, listaAuxiliaresPk ): Observable<any> {
      const url = this.urlBase + `/ViajesEspeciales/${idViaje}/auxiliares`;
      return this.http.post(url, listaAuxiliaresPk );
  }

    deleteViaje( idViaje: number ): Observable<any> {
        const url = this.urlBase + `/ViajesEspeciales/${idViaje}`;
        return this.http.delete(url);
   }

   getChoferesByViaje( idViaje: number ): Observable<any> {
        const url = this.urlBase + `/ViajesEspeciales/${idViaje}/choferes`;
        return this.http.get(url);
   }

   getAuxiliaresByViaje(idViaje: number): Observable <any> {
    const url = this.urlBase + `/ViajesEspeciales/${idViaje}/auxiliares`;
    return this.http.get(url);
   }

}
