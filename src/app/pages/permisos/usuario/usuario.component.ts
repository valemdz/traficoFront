import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Grupo, Modulo, Rol, UsuarioWithGrupo } from 'src/app/models/model.index';
import { PermisoService, UsuarioService } from 'src/app/services/service.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioWithGrupo;
  modulos: Modulo[] = [];    
  grupos: Grupo[] = null;  
  grupoControl: FormControl;

  constructor( public _ps: PermisoService, public _us: UsuarioService,
               public dialogRef: MatDialogRef<UsuarioComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,  ) {
      this.grupoControl = new FormControl(null, [Validators.required]);        
  }

  grupoForm(){    
    return this.grupoControl.value;
  }

  ngOnInit() {     

    this.usuario = this.data.usuario;    
    setTimeout( () =>{
      Observable.forkJoin(
        this._ps.getModulos$().pipe( map( (res) => res ), catchError(  error => of([]) ))  ,
        this.getGrupos().pipe( map( (res) => res ), catchError( error => of([]) ))
      ).subscribe(res => this.handleResponse(res));   

    });  

  

  }

  getGrupos() {     
    let params = FuncionesGrales.toParams( 0, 1000, null );          
    return  this._ps.getGruposByEmpresa$( this.usuario.usuarioPk.empresa, params );    
  }  
 

  handleResponse( respuesta ){
    this.modulos = respuesta[0];
    this.grupos = respuesta[1].content;     
    if( this.usuario.group ){
      const grupoUsuario = this.grupos.find( g => g.id === this.usuario.group.id );
      this.grupoControl.setValue( grupoUsuario );      
      this.select( grupoUsuario );
    }   
    
  }


  completarRolesconPermisoGrupo( roles: Rol[] ){ 

    this.revokeAllModulo();
    this.modulos.forEach( m => {
      m.permisos.forEach( p => {
                                  p.granted =  roles.find( rol => rol.authority ===  p.authority )?true:false;
                               } );
    });    
    
  }

  revokeAllModulo( ){    
      this.modulos.forEach( m => {
          m.permisos.forEach( p => p.granted = false );
      });
  } 

  onClick( ){    
    
      const grupoSeleccionado:Grupo = this.grupoControl.value;      
      this.dialogRef.close({usuario:this.usuario, grupo: grupoSeleccionado });
  }

  select( grupo: Grupo ){  
    this.revokeAllModulo();
    if( grupo ){
      this.completarRolesconPermisoGrupo( grupo.roles );
    }    
  } 

}
