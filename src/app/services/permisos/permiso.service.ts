import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Grupo } from 'src/app/models/model.index';
import { map, catchError } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Injectable()
export class PermisoService {

  private urlBase = environment.origin;

  constructor( private http: HttpClient,
               private snackBar: MatSnackBar ) { }

  getGrupos$( params ){
    const url = this.urlBase + `/permisos/grupos`;
    return this.http.get( url, params );
  }             

  getGruposByEmpresa$( empresa: string, params){
    const url = this.urlBase + `/permisos/grupos/${empresa}`;
    return this.http.get( url, params );

  }

  saveGrupo$( grupo: Grupo,  ){
    if( grupo.id ){ 
      return this.updateGrupo( grupo );
    }else{
      return this.saveGrupo( grupo );
    }

  }

  saveGrupo( grupo: Grupo ){
    const url = this.urlBase + '/permisos/grupo';
    return this.http.post( url, grupo)
              .pipe( 
                map( resp => {
                    this.snackBar.open( 'Grupo guardado con exito!!!', 'X', {
                        duration: 2000,
                    });
                    return resp
                    ;
                })
              );
  }

  updateGrupo( grupo: Grupo ){
    const url = this.urlBase + `/permisos/grupo/${grupo.id}`;
    return this.http.put( url, grupo)
              .pipe( 
                map( resp => {
                    this.snackBar.open( 'Grupo modificado con exito!!!', 'X', {
                        duration: 2000,
                    });
                    return resp;
                })
              );
  }

  deleteGrupo$( grupo: Grupo ){
    const url = this.urlBase + `/permisos/grupos/${grupo.id}`;
    return this.http.delete( url )
               .pipe( 
                  map( resp => {
                    this.snackBar.open( 'Grupo eliminado con exito!!!', 'X', {
                      duration: 2000,
                    });
                    return;
                  }),
                  catchError( err => {  
                    
                    if (err instanceof HttpErrorResponse) {
                      if( err.status == 409 ){
                        this.snackBar.open( 'No puede eliminarse el Grupo. Dado que esta asociado a algun usuario', 'X', 
                        { duration: 10000  });
                      }
                    }                                   
                    return throwError(err);
                  }) 
               );

  }

  getModulos$(){
    const url = this.urlBase +  `/permisos/listar`;
    return this.http.get( url );    
  } 
 
  revokeGrant$( idGrupo, idPermiso){       
    const url = this.urlBase + `/permisos/grupo/${idGrupo}/permiso/${idPermiso}/grantrevoke`;
    return this.http.put(url, null)
               .pipe(
                  map( resp =>{
                    if( resp ){
                        this.snackBar.open( 'Permiso Otorgado!!!', 'X', {
                          duration: 2000,
                        });
                    }else{
                        this.snackBar.open( 'Permiso Denegado!!!', 'X', {
                          duration: 2000,
                        });
                    }
                    return resp;
                  })
               ) ;
 }

 getUsuarios$( params ){
  const url = this.urlBase + `/usuarios`;
  return this.http.get(url, params);
}

 getUsuariosByEmpresa$( empresa: string, params ){
    const url = this.urlBase + `/usuarios/${empresa}`;
    return this.http.get(url, params);
 }

 updateGrupo$( username: string, grupo: Grupo ){
  const url = this.urlBase + `/usuarios/${username}/changeGrupo`;
  return this.http.put( url, grupo)
             .pipe(
               map( resp => {
                  this.snackBar.open( 'Grupo asignado!!!', 'X', {
                      duration: 2000,
                  });
                  return resp;
               })
             ) ;

 }



}
