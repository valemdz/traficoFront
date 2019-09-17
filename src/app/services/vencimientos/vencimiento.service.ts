import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Vencimiento } from 'src/app/models/model.index';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Observable } from 'rxjs';


@Injectable()
export class VencimientoService {

  private urlBase = environment.origin;

  constructor( private http: HttpClient ) { }

  getVencimientos$( empresa: string ){
    const url = this.urlBase + `/vencimientos/empresa/${empresa}`;
    return this.http.get( url );
  }

  saveVencimiento$( vencimiento: Vencimiento ){

    if( vencimiento.id > 0 ){
      const url = this.urlBase + `/vencimientos/${vencimiento.id}`;
      return this.http.put(url, vencimiento )
                      .pipe(
                        map( resp =>{
                          swal( 'Modificación', 'El vencimiento fue modificado con exito!!!', 'success');
                          return resp;
                        })
                      );
      
    }else{
      const url = this.urlBase + '/vencimientos';
      return this.http.post(url, vencimiento )
                      .pipe(
                        map( resp =>{
                          swal( 'Creación', 'El vencimiento fue creado con exito!!!', 'success');
                          return resp;
                        })
                      );
    }    
  }

  deleteVencimiento$( id: number ){
    const url = this.urlBase + `/vencimientos/${id}`;
    return this.http.delete( url)
               .pipe(
                 map( resp =>{
                   swal('Eliminación','El vencimiento fue eliminado con exito', 'success');
                 })
               ) 

  }

  getVehiculosConVencimientos$( vehEmpCodigo:string, vehEstado: number ): Observable<any>{
    const url = this.urlBase + `/vencimientos/empresa/${vehEmpCodigo}/estado/${vehEstado}/vehiculos`;
    return this.http.get( url )
                .pipe(
                    map( (veh:any) =>{

                        for( let v of veh ){
                            v.vehiculos.forEach( ( v, k )=>{   

                                v.vehVerificacionTecnicaVto = v.vehVerificacionTecnicaVto || new Date();                          
                                v.vehVerificacionTecnicaVto = new Date( v.vehVerificacionTecnicaVto );                             

                            });
                        }                            
                        return veh;
                    })
                );
  }


  getChoferesConVencimientos$( cho_emp_codigo:string, cho_estado: number ): Observable<any>{

    const url = this.urlBase + `/vencimientos/empresa/${cho_emp_codigo}/estado/${cho_estado}/choferes`;
    return this.http.get( url )
                .pipe(
                    map( (vencChoferes:any) =>{                        
                        for ( let ch of vencChoferes ) {
                            ch.choferes.forEach( ( v:any, k ) =>{                                
                                v.vencimientos.forEach( venc => {                                    
                                    venc.fechaVenc = new Date( venc.fechaVencimiento );                                   
                                });
                            } )
                        }                                                                  
                        return vencChoferes;
                    })
                );
  }

  existenVencimientos$( empresa:string ): Observable<any>{
    const url = this.urlBase + `/vencimientos/empresa/${empresa}/existenVencimientos`;    
    return this.http.get( url );               
  }

  

}
