import { Component, OnInit, OnDestroy } from '@angular/core';
import { PermisoService, UsuarioService, ErrorService } from 'src/app/services/service.index';
import { Table, PaginationPage, PaginationPropertySort } from 'src/app/shared/pagination/pagination.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { Subscription } from 'rxjs';
import { ConstantesGrales, Grupo, Rol, Modulo, UsuarioWithGrupo } from 'src/app/models/model.index';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RolesComponent } from './roles/roles.component';
import { UsuarioComponent } from './usuario/usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  usuariosPage: PaginationPage<any>;
  self: Table<any>; 
  listadoSubcription: Subscription;
  busqueda: string;

  constructor( private _ps: PermisoService,
               private _us: UsuarioService,
               public dialog: MatDialog,
               private snackBar: MatSnackBar,
               private _es: ErrorService ) { }

  ngOnInit() {
      this.mostrarDetalle();
  }

  mostrarDetalle(): void {  
    this.fetchPage(0, ConstantesGrales.ROWS_BY_PAGE, null);
  }
  
  fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort) {

    let params = FuncionesGrales.toParams( pageNumber, pageSize, sort );

    if(  this.busqueda != null &&  this.busqueda.length > 0 ){
        params = FuncionesGrales.toParamsWithBusqueda( this.busqueda, pageNumber, pageSize, sort );        
    }
    
    /*this.listadoSubcription = 
    this._ps.getUsuarios$( this._us.usuario.empresa, params )
          .subscribe( this.okUsuarios.bind( this ) );*/   

    this.listadoSubcription = 
    this._ps.getUsuarios$( params )
          .subscribe( this.okUsuarios.bind( this ) );   

    this.self = this; 
  }


  okUsuarios( usuariosPage ){
    this.usuariosPage = usuariosPage;
  }


  buscarUsuarios( busqueda: string ){
      this.busqueda = busqueda;
      this.mostrarDetalle();
  }

  ngOnDestroy(): void {
    if( this.listadoSubcription != null ){
      this.listadoSubcription.unsubscribe();
    }    
  }


  // ==================Modificar Usuario ==================================

  openModificarGrupo( usuario: UsuarioWithGrupo ){    
    
    const dialogRef = this.dialog.open( UsuarioComponent,{
      width: '1300px',            
      data: { usuario: usuario }
    });

    dialogRef.afterClosed().subscribe( respuesta => {
      if( respuesta ){
          this._ps.updateGrupo$( respuesta.usuario.username, respuesta.grupo)
              .subscribe( () =>{
                this.mostrarDetalle();
              } , 
              this.erroresModificarGrupo.bind( this ) );
      }      
    });    

  }

  erroresModificarGrupo( err ){    
    this._es.tratarErroresBackEnd( err, null, null );
  }


   // ============================ Roles ====================================

   openPermisosGrupo( grupo: Grupo ){

     if( grupo ){
      this._ps.getModulos$()
      .subscribe( modulos => { this.okRoles( modulos, grupo ) } );   
     } else{
        this.snackBar.open( 'No tiene grupo asignado', 'X', 
        { duration: 5000  });
     } 

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
