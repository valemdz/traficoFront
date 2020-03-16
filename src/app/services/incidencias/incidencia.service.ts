import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Incidencia, DialogData } from 'src/app/models/model.index';
import swal from 'sweetalert';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { ConfirmErrorDialogComponent } from 'src/app/shared/confirm-error-dialog/confirm-error-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class IncidenciaService {

    private urlBase = environment.origin;

    constructor( private http: HttpClient, private _snackBar: MatSnackBar,
                 private dialog: MatDialog ) {
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
              FuncionesGrales.openSnackBar( this._snackBar,
                'La incidencia se modifico con éxito',
                'X');               
              return resp;
            })
        );
    }

     create$( incidencia: Incidencia ): Observable<any>{

        const url = this.urlBase +  `/incidencias`;
        return this.http.post(url, incidencia )
                   .pipe( 
                       map( resp => {

                         FuncionesGrales.openSnackBar( this._snackBar,
                              'La incidencia se agrego con éxito',
                              'X');                          
                         return resp;
                       })
                   ) ;

    }

   deleteIncidencia$(id: number): Observable<any> {
       const  url = this.urlBase +  `/incidencias/${id}`;
        return this.http.delete( url ).pipe(
          map( resp =>{

              FuncionesGrales.openSnackBar( this._snackBar,
                'La eliminacion fue éxitosa!!!',
                'X');                 
               return resp;
          }),
          catchError( err => {
            
            const data: DialogData = { titulo:'Inconvenientes al eliminar Incidencia!!!', 
            mensajes:[ err.error.errorCode + ' - ' + err.error.errorMessage ] }         
          
            const dialogRef = this.dialog.open(ConfirmErrorDialogComponent, {
                  width: '450px',
                  data: data
            });            
            // Ya lo manejo aca al error
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
