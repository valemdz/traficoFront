import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Grupo } from 'src/app/models/model.index';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

@Injectable()
export class PermisoService {

  private urlBase = environment.origin;

  constructor( private http: HttpClient,
               private snackBar: MatSnackBar ) { }

  getGrupos$( empresa: string){
    const url = this.urlBase + '/permisos/grupos';
    return this.http.get( url );

  }

  saveGrupo$( grupo: Grupo ){
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



}
