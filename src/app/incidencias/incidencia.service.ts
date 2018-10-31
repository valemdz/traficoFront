import {Injectable} from '@angular/core';
import {Incidencia} from './../domain';
import { PaginationPropertySort} from './../shared/pagination';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FuncionesGrales } from '../utiles/funciones.grales';


@Injectable()
export class IncidenciaService{

    //private headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});

    constructor( private http: HttpClient ) {
    }

    findIncidencias( page: number, pageSize: number, sort: PaginationPropertySort, idEmpresa: String ): Observable<any> {
      const params = FuncionesGrales.toParams( page, pageSize, sort );
      return this.http.get(`/incidencias/empresa/${idEmpresa}`, params);
    }


//para ver el detalle
    viewIncidencia(id:number): Observable<any>{
         return this.http.get(`/incidencias/${id}`);
    }

    getIncidencia(id: number): Observable<any> {
        return this.http.get(`/incidencias/${id}`);
    }


    update( incidencia: Incidencia ): Observable<any>{
        const url = `/incidencias/${incidencia.id}`;
        return this.http
        .put(url, JSON.stringify(incidencia));
    }

     create( incidencia: Incidencia ): Observable<any>{

        const url = `/incidencias`;
        return this.http.post(url, JSON.stringify(incidencia));

    }

   deleteIncidencia(id: number): Observable<any> {
        return this.http.delete(`/incidencias/${id}`);
   }

   findIncidenciasByEmpyTipo( idEmpresa:String, idTipo:number ): Observable<any>{
        return this.http.get(`/empresa/${idEmpresa}/tipo/${idTipo}/incidencias`);
   }

   /*checkCodigoIncidencia( idEmpresa:String, idTipo:number, idCodigo:String ): Observable<boolean>{
        const url = `/checkCodigoIncidencia/empresa/${idEmpresa}/tipo/${idTipo}/codigo/${idCodigo}`;
        return this.http.get(url).map(this.extractData).publish().refCount();
   }*/

   checkCodigoIncidencia( idEmpresa:String, idTipo:number, idCodigo:String ): Observable<any>{
        const url = `/checkCodigoIncidencia/empresa/${idEmpresa}/tipo/${idTipo}/codigo/${idCodigo}`;
        return this.http.get(url);
   }

}
