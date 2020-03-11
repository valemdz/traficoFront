import { Component, OnInit } from '@angular/core';
import { PermisoService, UsuarioService } from 'src/app/services/service.index';
import { PaginationPage, PaginationPropertySort } from 'src/app/shared/pagination/pagination';
import { Table } from 'src/app/shared/pagination/table';
import { Grupo, Modulo, Rol, ConstantesGrales, Empresa } from 'src/app/models/model.index';

import { GrupoComponent } from '../grupo/grupo.component';
import { ConfirmarDeleteComponent } from 'src/app/shared/confirmar-delete/confirmar-delete.component';
import { RolesComponent } from '../roles/roles.component';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styles: []
})
export class GruposComponent implements OnInit {
  empresas:Empresa[];
  groupPage: PaginationPage<any>;
  self: Table<any>; 

  constructor( private permisoService: PermisoService,
               public dialog: MatDialog,
               public _us: UsuarioService ) { }

  ngOnInit() {
      this.mostrarDetalle();
  }

  mostrarDetalle(): void {  
    this.fetchPage(0, ConstantesGrales.ROWS_BY_PAGE, null);
  }
  
  fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort) {

    let params = FuncionesGrales.toParams( pageNumber, pageSize, sort );      

    /*this.permisoService.getGruposByEmpresa$( this._us.usuario.empresa, params )
    .subscribe( this.okGrupos.bind( this ) );*/

    this.permisoService.getGrupos$( params )
    .subscribe( this.okGrupos.bind( this ) );

    this.self = this; 
  } 

  okGrupos( respuesta ){
    this.groupPage = respuesta.grupos;
    this.empresas = respuesta.empresas;    
  }

  crearGrupo(){    
    const grupo = new Grupo( null, null, this._us.usuario.empresa );
    this.openModalGrupo( grupo );
  }

  modificarGrupo( grupo ){
      this.openModalGrupo( grupo );
  }

  openModalGrupo( grupo: Grupo ){    

    const dialogRef = this.dialog.open( GrupoComponent, {
      width: '300px',
      data:{ grupo: grupo, empresas: this.empresas }      
    });

    dialogRef.afterClosed().subscribe( grupo => {        
        if( grupo ){
            this.saveGrupo( grupo );         
        }
    } );

  } 
  
  saveGrupo( grupo: Grupo ){
    this.permisoService.saveGrupo$( grupo )
        .subscribe( () => this.mostrarDetalle() );
  }

  deleteGrupo( grupo: Grupo ){

    const confirmDelete = this.dialog.open( ConfirmarDeleteComponent, {
      width: '300px',
      data: { titulo:`Esta seguro que desea eliminar el perfil nombre = [ ${grupo.groupName} ]`}      
    });

    confirmDelete.afterClosed().subscribe( siDelete => {      
        if(  siDelete ) {
            this.permisoService.deleteGrupo$( grupo )
                .subscribe( ()=> this.mostrarDetalle() );
        }
    } );

  }

  // ============================ Roles ====================================

  permisosGrupo( grupo: Grupo ){

    this.permisoService.getModulos$()
        .subscribe( modulos => { this.openRoles( modulos, grupo ) } );    

  }

  openRoles( modulos,  grupo: Grupo ){

    this.completarRolesconPermisoGrupo( grupo.roles , modulos); 

    const dialogRef = this.dialog.open( RolesComponent,{
      data: { modulos: modulos, idGrupo: grupo.id }
    } );

    dialogRef.afterClosed().subscribe( ()=> this.mostrarDetalle() );

  }

  completarRolesconPermisoGrupo( roles: Rol[], modulos: Modulo[]){   
    
    for( let modulo of modulos ){
        for( let permiso of modulo.permisos ){
            permiso.granted = roles.find( rol => rol.authority ===  permiso.authority )?true:false;
        }
    }   
    
  }

}
