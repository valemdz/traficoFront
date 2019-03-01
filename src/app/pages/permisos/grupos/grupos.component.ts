import { Component, OnInit } from '@angular/core';
import { PermisoService, UsuarioService } from 'src/app/services/service.index';
import { PaginationPage } from 'src/app/shared/pagination/pagination';
import { Table } from 'src/app/shared/pagination/table';
import { Grupo, Modulo, Rol } from 'src/app/models/model.index';
import { MatDialog } from '@angular/material';
import { GrupoComponent } from '../grupo/grupo.component';
import { ConfirmarDeleteComponent } from 'src/app/shared/confirmar-delete/confirmar-delete.component';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styles: []
})
export class GruposComponent implements OnInit {

  groupPage: PaginationPage<any>;
  self: Table<any>; 

  constructor( private permisoService: PermisoService,
               public dialog: MatDialog,
               public _us: UsuarioService ) { }

  ngOnInit() {
      this.getGrupos(); 
  }

  getGrupos(){
      this.permisoService.getGrupos$('')
        .subscribe( this.okGrupos.bind( this ) );
  }

  okGrupos( gruposPage ){
    this.groupPage = gruposPage;
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
      width: '250px',
      data: grupo      
    });

    dialogRef.afterClosed().subscribe( si => {
      if( si ){
          this.saveGrupo( grupo );         
      }
    } );

  } 
  
  saveGrupo( grupo: Grupo ){
    this.permisoService.saveGrupo$( grupo )
        .subscribe( () =>  this.getGrupos()  );
  }

  deleteGrupo( grupo: Grupo ){

    const confirmDelete = this.dialog.open( ConfirmarDeleteComponent, {
      width: '300px',
      data: { titulo:`Esta seguro que desea eliminar el grupo nombre = [ ${grupo.groupName} ]`}      
    });

    confirmDelete.afterClosed().subscribe( siDelete => {      
        if(  siDelete ) {
            this.permisoService.deleteGrupo$( grupo )
                .subscribe( ()=> this.getGrupos() );
        }
    } );

  }

  // ============================ Roles ====================================

  permisosGrupo( grupo: Grupo ){

    this.permisoService.getModulos$()
        .subscribe( modulos => { this.okRoles( modulos, grupo ) } );    

  }

  okRoles( modulos,  grupo: Grupo ){

    this.completarRolesconPermisoGrupo( grupo.roles , modulos); 

    const dialogRef = this.dialog.open( RolesComponent,{
      data: { modulos: modulos, idGrupo: grupo.id }
    } );

    dialogRef.afterClosed().subscribe();

  }

  completarRolesconPermisoGrupo( roles: Rol[], modulos: Modulo[]){   
    
    for( let modulo of modulos ){
        for( let permiso of modulo.permisos ){
            permiso.granted = roles.find( rol => rol.authority ===  permiso.authority )?true:false;
        }
    }   
    
  }

}
