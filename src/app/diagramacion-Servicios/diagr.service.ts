import { PaginationPropertySort, PaginationPage } from './../shared/pagination';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FuncionesGrales } from '../utiles/funciones.grales';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable()
export class DiagrService {

  private urlBase = environment.origin;

  constructor(private http: HttpClient ) {}

  findLineasByEmp$(idEmpresa: String): Observable<any> {
    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/lineas`;
    return this.http.get(url);
  }

  findServiciosByLineaYfecha$(
    page: number, pageSize: number, sort: PaginationPropertySort,
    idEmpresa: String, idLinea: String,
    inicio: any, fin: any): Observable<any> {

    const params = FuncionesGrales.toParams( page, pageSize, sort );

    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/linea/${idLinea}/fechaInicio/${inicio}/fechaFin/${fin}/servicios`;

    return this.http.get(url, params);
  }

  findSerConHorariosByLineaYfecha$( idEmpresa: String, idLinea: String, inicio: any, fin: any): Observable<any> {
    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/linea/${idLinea}/fechaInicio/${inicio}/fechaFin/${fin}/serviciosConHorarios`;
    return this.http.get( url );
  }


  /*getVehiculosLibres( idViaje: number ): Observable<Response> {
   //  const url = `/ViajesEspeciales/${idViaje}/vehiculosDisp`;
   // return this.http.get( url ).map(this.extractData).publish().refCount();
  }  */

  // Esto dede reverse

  finChoferes$( idEmpresa: string ) {
    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/choferes`;
    return this.http.get( url );
  }

  findChoresOcupacion$( idEmpresa, inicio, fin ) {
    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/fechaInicio/${inicio}/fechaFin/${fin}/choferesOcupacion`;
    return  this.http.get( url );
  }


  findVehiculos$( idEmpresa: string ) {
    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/internos`;
    return this.http.get( url );
  }

  saveVuelta$( vuelta ){
     const url = this.urlBase + '/diagr/vuelta';
     return this.http.post( url, vuelta );
  }

  getVueltas$( idEmpresa: String, idLinea: String, inicio: any, fin: any ){
      const url = this.urlBase + `/diagr/empresa/${idEmpresa}/linea/${idLinea}/fechaInicio/${inicio}/fechaFin/${fin}/vueltas`;
      return this.http.get(url)
      .pipe( map( ( v: any) => {                         
                          v.forEach(ele => {
                            ele.servicio.servicioPK.serFechaHora = new Date( ele.servicio.servicioPK.serFechaHora);
                            ele.servicioRet.servicioPK.serFechaHora = new Date( ele.servicioRet.servicioPK.serFechaHora);                            
                          });                          
                return v;
              } ));
  }



}
