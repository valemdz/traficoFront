import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehiculo } from 'src/app/models/model.index';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';




@Injectable()
export class VehiculoService {

    private urlBase = environment.origin;

    /*private headers = new Headers({'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'});*/

    constructor(private http: HttpClient ) {
    }

    findVehiculos$( vehEmpCodigo: String, params ): Observable<any> {
      const url = this.urlBase + `/vehiculos/empresa/${vehEmpCodigo}`;   
      return this.http.get( url, params )
                 .pipe(
                     map( (resp:any) => {
                        resp.content.forEach( ( v, k) => {
                            if(  v.vehVerificacionTecnicaVto ){
                                v.vehVerificacionTecnicaVto = new Date( v.vehVerificacionTecnicaVto ) || new Date();
                                v.vehVencido = v.vehVerificacionTecnicaVto.getTime() <= (new Date()).getTime();
                            }else{
                                v.vehVencido = false;
                            }
                          
                        });                         
                        return resp; 
                     })
                 );
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
        .put( url, vehiculo )
        .pipe(
            map( resp =>{
                swal('Actualización', 'La unidad fue actualizada con éxito','success');
                return resp;
            } )
        );
    }

     create$( vehiculo: Vehiculo ): Observable<any>{
        const url = this.urlBase + `/vehiculos`;
        return this.http.post( url, vehiculo )
                   .pipe(
                        map( resp => {
                            swal('Creación', 'La unidad fue creada con éxito', 'sucess');  
                            return resp; 
                        })
                   );
    }

   deleteVehiculo$( vehEmpCodigo: String,  vehInterno: number): Observable<any> {
        const url = this.urlBase + `/vehiculos/empresa/${vehEmpCodigo}/interno/${vehInterno}`
        return this.http.delete(url).pipe(
            map( resp => {
                swal('Anulación', 'La unidad fue eliminada con éxito', 'success');
                return resp;
            }),
            catchError( err => {
                swal( 'Inconvenientes al eliminar la unidad!!!', 
                      'El Unidad tiene informacion asociada no es posible eliminarla!!!.'  ,
                'error');
                return throwError(err);
            })
        );
   }

   checkExisteVehiculo$( vehEmpCodigo: String,  vehInterno: number): Observable<any> {

        const url = this.urlBase + `/vehiculos/empresa/${vehEmpCodigo}/interno/${vehInterno}/checkExiste`;
        return this.http.get(url);
        
    }


    getOpcionesVeh$( vehEmpCodigo): Observable<any> {
        const url = this.urlBase + `/empresa/${vehEmpCodigo}/vehiculosCb`;
        return this.http.get( url )
                   .pipe(
                       map( ( resp: any)  => {
                           return resp.comboMapas; 
                       })
                   );
    }

    getIncidenciasByVehiculo$( idEmpresa: String, idInterno: number ): Observable<any> {
      const url = this.urlBase + `/vehiculos/empresa/${idEmpresa}/interno/${idInterno}/incidencias`;
      return this.http.get( url );
    }

    saveIncidenciasByVehiculo$(  vehEmpCodigo: String, vehInterno: number, incidenciasDeepCopy ) {
        const url = this.urlBase + `/vehiculos/empresa/${vehEmpCodigo}/interno/${vehInterno}/incidencias`;
        return this.http.put(url, incidenciasDeepCopy )
                   .pipe(
                       map( resp => {
                           swal('Modificación','Las incidencias fueron modificadas con éxito.','success');
                           return resp;
                       })
                   );
    }    


}
