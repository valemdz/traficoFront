import {Injectable} from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Chofer, DialogData } from 'src/app/models/model.index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { ConfirmErrorDialogComponent } from 'src/app/shared/confirm-error-dialog/confirm-error-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class ChoferService {

    private urlBase = environment.origin;

    /* private headers = new Headers({'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'}); */

    constructor( private http: HttpClient, private _snackBar: MatSnackBar,
                 private dialog: MatDialog  ) {
    }

    findChoferes$(  cho_emp_codigo: String, params ): Observable<any> {
      const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}`;      
      return this.http.get( url , params);
    }

    
    findVencimientos$(cho_emp_codigo: String ): Observable<any> {
         const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/VencimientoCarnets`;
         return this.http.get(url);
    }


    viewChofer$(id: number): Observable<any> {
        const url = this.urlBase + `/chofer/${id}`;
        return this.http.get( url );
    }

    getChofer$(id: number): Observable<any> {
        const url = this.urlBase + `/chofer/${id}`;
        return this.http.get( url );
    }


    update$( chofer: Chofer ) {
        const url = this.urlBase + `/choferes/empresa/${chofer.choferPK.empCodigo}/codigo/${chofer.choferPK.codigo}`;
        return this.http.put( url, chofer )
                   .pipe(
                      map( (resp: any) => {

                         FuncionesGrales.openSnackBar( this._snackBar, 
                              "El personal " + chofer.nombre + " fue actualizado con exito!", 
                               'X' ) 
                         // swal( "Actualizacón", 
                         //       "El personal fue actualizado con exito!",
                         //       "success" );  
                         return resp;      
                      })  
                   );
    }

    create$( chofer: Chofer ): Observable<any> {
        const url = this.urlBase + `/choferes`;
        return this.http.post( url, chofer )
                   .pipe(
                      map( ( resp: any) => {

                         FuncionesGrales.openSnackBar( this._snackBar, 
                              "El personal " + chofer.nombre + " fue creado con exito!", 
                               'X' ); 

                         // swal( "Creacion", 
                         //       "El personal " + chofer.nombre + " fue creado con exito!",
                         //       "success" );
                         return resp;      
                      })  
                   ) ;
    }

   deleteChofer$( empresa: String ,  codigo: number ): Observable<any> {
        const url = this.urlBase + `/choferes/empresa/${empresa}/codigo/${codigo}`;
        return this.http.delete(url).pipe(
             map( resp =>{

               FuncionesGrales.openSnackBar( this._snackBar, 
                    "La eliminacion del personal fue exitosa!!!", 
                     'X' );                   
                  return resp;
             }),
             catchError( err => {   
               
               const data: DialogData = { titulo:'Inconvenientes al eliminar el Personal!!! ', 
                    mensajes:[ err.error.errorCode + ' - ' + err.error.errorMessage ] }
               
                  
               const dialogRef = this.dialog.open(ConfirmErrorDialogComponent, {
                    width: '450px',
                    data: data
                    });
             
                return throwError(err);
             })
        );
   }

   saveIncidenciasByChofer$( cho_emp_codigo: String, cho_codigo: number, incidencias: any ) {
        const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/codigo/${cho_codigo}/incidencias`;
        return this.http.put(url, incidencias );
   }

   getIncidenciasByChofer$( cho_emp_codigo: String, cho_codigo: number ): Observable<any> {
        const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/codigo/${cho_codigo}/incidencias`;
        return this.http.get(url);
   }

   getCarnetsByChofer$( cho_emp_codigo: String, cho_codigo: number ): Observable<any> {
        const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/codigo/${cho_codigo}/carnets`;
        return this.http.get(url);
   }

   saveCarnetsByChofer$( cho_emp_codigo: String, cho_codigo: number, listaCarnets: any ){
        const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/codigo/${cho_codigo}/carnets`;
        return this.http.put( url, listaCarnets);
   }

   getUrlImagenChofer( chofer: Chofer ){
     return   environment.originSinApi 
            + `/imagen/choferes/empresa/${chofer.choferPK.empCodigo}/codigo/${chofer.choferPK.codigo}`;         
   }    

}
