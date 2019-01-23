import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Incidencia } from 'src/app/models/model.index';
import swal from 'sweetalert';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class IncidenciaService {

    private urlBase = environment.origin;

    constructor( private http: HttpClient ) {
    }

    findIncidencias$(  idEmpresa: String, params ): Observable<any> {
      const url = this.urlBase + `/incidencias/empresa/${idEmpresa}`;      
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
        return this.http.put(url, incidencia )
        .pipe( 
            map( resp => {
              swal('Modificación', 'La incidencia se modifico con éxito','success');
              return resp;
            })
        );
    }

     create$( incidencia: Incidencia ): Observable<any>{

        const url = this.urlBase +  `/incidencias`;
        return this.http.post(url, incidencia )
                   .pipe( 
                       map( resp => {
                         swal('Creación', 'La incidencia se agrego con éxito','success');
                         return resp;
                       })
                   ) ;

    }

   deleteIncidencia$(id: number): Observable<any> {
       const  url = this.urlBase +  `/incidencias/${id}`;
        return this.http.delete( url ).pipe(
          map( resp =>{
               swal("Eliminacion","La eliminacion fue exitosa!!!", "success");
               return resp;
          }),
          catchError( err => {               
            swal( 'Inconvenientes al eliminar Incidencia!!!', 
                   err.error.errorCode + ' - ' + err.error.errorMessage ,
                   'error');
             return throwError(err);
          })
          );
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
