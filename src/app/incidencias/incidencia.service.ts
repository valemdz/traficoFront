import {Injectable} from '@angular/core';
import {Incidencia} from './../domain';
import { PaginationPropertySort} from './../shared/pagination';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FuncionesGrales } from '../utiles/funciones.grales';
import { environment } from 'src/environments/environment';


@Injectable()
export class IncidenciaService {

    private urlBase = environment.origin;

    constructor( private http: HttpClient ) {
    }

    findIncidencias$( page: number, pageSize: number, sort: PaginationPropertySort, idEmpresa: String ): Observable<any> {
      const url = this.urlBase + `/incidencias/empresa/${idEmpresa}`;
      const params = FuncionesGrales.toParams( page, pageSize, sort );
      return this.http.get( url, params);
    }

    viewIncidencia$( id: number ): Observable<any> {
      const url = this.urlBase + `/incidencias/${id}`;
      return this.http.get( url );
    }

    getIncidencia$(id: number): Observable<any> {
      const url = this.urlBase +  `/incidencias/${id}`;
      return this.http.get( url );
    }

    update$( incidencia: Incidencia ): Observable<any> {
        const url = this.urlBase + `/incidencias/${incidencia.id}`;
        return this.http
        .put(url, incidencia );
    }

     create$( incidencia: Incidencia ): Observable<any>{

        const url = this.urlBase +  `/incidencias`;
        return this.http.post(url, incidencia );

    }

   deleteIncidencia$(id: number): Observable<any> {
       const  url = this.urlBase +  `/incidencias/${id}`;
        return this.http.delete( url );
   }

   findIncidenciasByEmpyTipo$( idEmpresa: String, idTipo: number ): Observable<any> {
       const url = this.urlBase + `/empresa/${idEmpresa}/tipo/${idTipo}/incidencias`;
       return this.http.get( url );
   }

   checkCodigoIncidencia$( idEmpresa: string, idTipo:number, idCodigo: string ): Observable<any> {
        const url = this.urlBase + `/checkCodigoIncidencia/empresa/${idEmpresa}/tipo/${idTipo}/codigo/${idCodigo}`;
        return this.http.get(url);
   }

}
