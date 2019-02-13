
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { ModalSiNoService } from 'src/app/shared/modal-si-no/modal-si-no.service';
import { PaginationPropertySort } from 'src/app/shared/pagination/pagination.index';




@Injectable()
export class DiagrService { 

  private urlBase = environment.origin;

  constructor(  private http: HttpClient,
                public _ms: ModalSiNoService ) {      
               
  }

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
    return this.http.get( url ).pipe(
      map( (  v :any ) =>{
              v.forEach(serv => {
                  serv.servicioPK.serFechaHora = new Date( serv.servicioPK.serFechaHora );
                  serv.fechaHoraLlegada = new Date( serv.fechaHoraLlegada );
                  serv.fechaHoraSalida = new Date( serv.fechaHoraSalida ); 
              });
              return v;
        }
      )
    );
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
    return  this.http.get( url )
            .pipe(
              map( ( choferes: any ) =>{

                choferes.forEach(cho => {
                    cho.servicios.forEach( serv =>{
                      serv.servicioPK.serFechaHora = new Date( serv.servicioPK.serFechaHora );
                      serv.fechaHoraSalida = new Date( serv.fechaHoraSalida );
                      serv.fechaHoraLlegada = new Date( serv.fechaHoraLlegada );
                    });

                    cho.incidencias.forEach( inc => {
                        inc.inicio = new Date( inc.inicio );
                        inc.fin = new Date( inc.fin );
                    });

                    cho.viajes.forEach( v => {
                      v.inicio = new Date( v.inicio );
                      v.fin = new Date( v.fin );
                    });
                });                
                return choferes;
              })
            );
  }


  findVehiculos$( idEmpresa: string ) {
    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/internos`;
    return this.http.get( url );
  }

  checkVueltas$(  vuelta ) {
    const url = this.urlBase + '/diagr/vuelta/check';
    return this.http.post( url, vuelta );           
  }
 

  saveVuelta$( vuelta ){
     //this.checkVueltas$( vuelta ).subscribe( resp => console.log( resp ));
     const url = this.urlBase + '/diagr/vuelta';
     return this.http.post( url, vuelta ).pipe( map( resp =>{
          swal('La vuelta' ,'Fue Agregada  con exito', 'success' );
          return resp;
        }
     ));
  }

  updateVuelta$( idVuelta, vuelta ){

    //this.checkVueltas$( vuelta );

    const url = this.urlBase + `/diagr/vuelta/${idVuelta}`;
    return this.http.put( url, vuelta ).pipe( map( resp =>{
        swal('La vuelta' ,'Fue modificada con exito', 'success' );
        return resp;
      }
    ));    
  }

  getVueltas$( idEmpresa: String, idLinea: String, inicio: any, fin: any ){
      const url = this.urlBase + `/diagr/empresa/${idEmpresa}/linea/${idLinea}/fechaInicio/${inicio}/fechaFin/${fin}/vueltas`;
      return this.http.get(url)
      .pipe( map( ( v: any) => {
                          v.forEach(ele => {
                            ele.servicio.servicioPK.serFechaHora = new Date( ele.servicio.servicioPK.serFechaHora);
                            ele.servicioRet.servicioPK.serFechaHora =
                            new Date( ele.servicioRet.servicioPK.serFechaHora);
                          });
                return v;
              } ));
  } 

  getFullVueltas$( idEmpresa: String,  inicio: any, fin: any ) {
    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/fechaInicio/${inicio}/fechaFin/${fin}/fullVueltas`;
   console.log('FULL VUELTAS ', this.http.get(url));
    return this.http.get(url);
}

  deleteVuelta$( idVuelta ){
    const url = this.urlBase + `/diagr/vuelta/${idVuelta}`;
    return this.http.delete( url ).pipe( map( resp =>{
          swal('La vuelta' ,'Fue eliminada con exito', 'success' );
          return resp;
      }
    ));
  }

  findVehiculosOcupacion$( idEmpresa, inicio, fin ) {
    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/fechaInicio/${inicio}/fechaFin/${fin}/vehiculosOcupacion`;
    return  this.http.get( url )
            .pipe(
              map( ( vehiculos: any ) =>{

                vehiculos.forEach(veh => {
                    veh.servicios.forEach( serv =>{
                      serv.servicioPK.serFechaHora = new Date( serv.servicioPK.serFechaHora );
                      serv.fechaHoraSalida = new Date( serv.fechaHoraSalida );
                      serv.fechaHoraLlegada = new Date( serv.fechaHoraLlegada );
                    });

                    veh.incidencias.forEach( inc => {
                        inc.inicio = new Date( inc.inicio );
                        inc.fin = new Date( inc.fin );
                    });

                    veh.viajes.forEach( v => {
                      v.inicio = new Date( v.inicio );
                      v.fin = new Date( v.fin );
                    });
                });                
                return vehiculos;
              })
            );
  } 

  
    

}
