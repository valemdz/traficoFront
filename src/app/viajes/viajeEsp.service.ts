
import {Injectable} from '@angular/core';
import { PaginationPropertySort} from '../shared/pagination';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { Observable } from 'rxjs';
import { ViajeEspecial, VehiculoPK, ViajeEspecialList } from '../domain';
import { HttpClient } from '@angular/common/http';
import { FuncionesGrales } from '../utiles/funciones.grales';



@Injectable()
export class ViajeEspServive {

    //private headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});

    constructor(private http: HttpClient ) {
    }


    getEscalasByProvincia( escProCodigo:String ): Observable<any>{
        return this.http.get(`/ViajesEspeciales/provincia/${escProCodigo}/escalas`);
    }

    getProvincias(){
        return this.http.get(`/ViajesEspeciales/provincias`);
    }

    saveViajeEspecial( viaje: ViajeEspecial ): Observable<any>{
        const url = `/ViajesEspeciales`;
        return this.http.post(url, JSON.stringify(viaje));

    }

    saveComentariosViajeEspecial( idViaje: number, viaje: ViajeEspecial ): Observable<any>{
       const url = `/ViajesEspeciales/${idViaje}/comentarios`;
       return this.http.put(url, JSON.stringify(viaje));
    }

    getVehiculos( idViaje:number ): Observable<any>{
        const url = `/ViajesEspeciales/${idViaje}/vehiculos`;
        return this.http.get( url );
    }

    getVehiculosLibres( idViaje:number ): Observable<any>{
        const url = `/ViajesEspeciales/${idViaje}/vehiculosDisp`;
        return this.http.get( url );
    }

    getViajesEspeciales( empCodigo:String, inicio: any, fin: any): Observable<any> {

        const url = `/ViajesEspeciales/empresa/${empCodigo}/fechaInicio/${inicio}/fechaFin/${fin}/viajes`;
        return this.http.get(url);
    }

    findViajes(page: number, pageSize: number, sort: PaginationPropertySort,
        idEmpresa: String, inicio: any, fin: any ): Observable<any> {

        const params = FuncionesGrales.toParams( page, pageSize, sort );

        const url = `/ViajesEspeciales/empresa/${idEmpresa}/fechaInicio/${inicio}/fechaFin/${fin}/viajes`;

        return this.http.get(url, params );
    }

    setVehiculo( idViaje:number, vehiculoPK: VehiculoPK ){
        const url = `/ViajesEspeciales/${idViaje}/vehiculo`;
        return this.http.post(url, JSON.stringify(vehiculoPK));

    }

    getVehiculoByViaje( idViaje: number ):Observable<any>{
        const url =`/ViajesEspeciales/${idViaje}/vehiculo`
        return this.http.get(url);
    }

    getChoferes( empCodigo:String ):Observable<any>{
        const url =`/ViajesEspeciales/empresa/${empCodigo}/choferes`
        return this.http.get(url);
    }

    getChoferesLibres( idViaje:number ):Observable<any>{
        const url =`/ViajesEspeciales/${idViaje}/choferesDisp`;
        return this.http.get(url);
    }

    saveChoferes( idViaje:number, listaChoferesPk ): Observable<any>{
        const url = `/ViajesEspeciales/${idViaje}/choferes`
        return this.http.post(url, JSON.stringify(listaChoferesPk));

    }

    deleteViaje( idViaje:number ): Observable<any> {
        const url = `/ViajesEspeciales/${idViaje}`;
        return this.http.delete(url);
   }

   getChoferesByViaje( idViaje: number ):Observable<any>{
        const url =`/ViajesEspeciales/${idViaje}/choferes`
        return this.http.get(url);
   }

}
