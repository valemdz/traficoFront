// import { ServiciosList } from './../domain';
import { PaginationPropertySort, PaginationPage } from './../shared/pagination';
import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { Servicios } from '../domain';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FuncionesGrales } from '../utiles/funciones.grales';
import { environment } from 'src/environments/environment';


@Injectable()
export class DiagrService {

  private urlBase = environment.origin;

  constructor(private http: HttpClient ) {}

  findLineasByEmp(idEmpresa: String): Observable<any> {
    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/lineas`;
    return this.http.get(url);
  }

  findServiciosByLineaYfecha(
    page: number, pageSize: number, sort: PaginationPropertySort,
    idEmpresa: String, idLinea: String,
    inicio: any, fin: any): Observable<any> {

    const params = FuncionesGrales.toParams( page, pageSize, sort );

    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/linea/${idLinea}/fechaInicio/${inicio}/fechaFin/${fin}/servicios`;

    return this.http.get(url, params);
  }

  /*getVehiculosLibres( idViaje: number ): Observable<Response> {
   //  const url = `/ViajesEspeciales/${idViaje}/vehiculosDisp`;
   // return this.http.get( url ).map(this.extractData).publish().refCount();
  }  */


}
