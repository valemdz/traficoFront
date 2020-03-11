import { Component, OnInit, OnDestroy } from '@angular/core';
import { PermisoService, UsuarioService, ErrorService } from 'src/app/services/service.index';
import { Table, PaginationPage, PaginationPropertySort } from 'src/app/shared/pagination/pagination.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { Subscription } from 'rxjs';
import { ConstantesGrales, Grupo, Rol, Modulo, UsuarioWithGrupo, Usuario, ResetPassword } from 'src/app/models/model.index';
import { UsuarioComponent } from './usuario/usuario.component';
import { ContraseniasComponent } from './contrasenias/contrasenias.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  resetSubscription: Subscription;

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
    if( this.resetSubscription != null ){
        this.resetSubscription.unsubscribe() ;
    }    
  }


  //=================== Restablecer Contrasenias =====================

  openResetearContrasenia( usuario: Usuario ){

      const dialogRef = this.dialog.open( ContraseniasComponent,{
        width: '500px',            
        data: { usuario: usuario }
      });

      dialogRef.afterClosed().subscribe( email => {
        if( email ){          
          const reset: ResetPassword={
              empresa: usuario.usuarioPk.empresa,
              legajo: usuario.usuarioPk.legajo,
              emailRecuperacion: email
          }
          this.resetSubscription = this._us.resetPassword$( reset )
                                       .subscribe();
        }      
      });    
  
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


   
}
