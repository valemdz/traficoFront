import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {  Subscription } from 'rxjs';

import { ChoferService } from 'src/app/services/choferes/chofer.service';
import { UsuarioService, ErrorService, VencimientoService } from 'src/app/services/service.index';
import { Chofer, CONSTANTES_CHOFER, ConstantesGrales, VencimientosChoferes } from 'src/app/models/model.index';

import { PaginationPage, Table, PaginationPropertySort } from 'src/app/shared/pagination/pagination.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';

declare var swal;

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.css']
})
export class ChoferesComponent implements OnInit, OnDestroy {

   choferPage: PaginationPage<any>;
   self: Table<any>;   

   listadoSubscription: Subscription;
   deleteChoferSubscription: Subscription;
   estadoSubs: Subscription; 
   vencimientosSubs: Subscription;

   choferNuevo: Chofer;    
   currentChofer;
   carnetChofer;
   incidenciaChofer;
   updateEstChofer: Chofer;
   vencimientosCho: VencimientosChoferes[]=[];

   public estados = CONSTANTES_CHOFER.ESTADOS;

   constructor( private choferService: ChoferService,
                 private router: Router, public _vs: VencimientoService,
                 public _us: UsuarioService,                 
                 private ctrolError: ErrorService) {
   }


    ngOnInit() {
        this.mostrarDetalle();
        this.getVencimientos();
    }

    ngOnDestroy(): void {

          if ( this.listadoSubscription ) { this.listadoSubscription.unsubscribe(); }
          if ( this.deleteChoferSubscription ) { this.deleteChoferSubscription.unsubscribe(); }
          if ( this.estadoSubs ) { this.estadoSubs.unsubscribe(); }
          if ( this.vencimientosSubs ){ this.vencimientosSubs.unsubscribe(); }

    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort)  {

        const params = FuncionesGrales.toParams( pageNumber, pageSize, sort );

        this.listadoSubscription
        = this.choferService.findChoferes$(  this._us.usuario.empresa, params )
        .subscribe( this.okChoferes.bind( this), this.error.bind( this ) );
        this.self = this;        
    }

    okChoferes ( choferesPage  ) {
      this.choferPage = choferesPage;
    }

    error( err) {
      this.ctrolError.tratarErrores( err, null, null, null );
    }

    mostrarDetalle(): void {
        this.fetchPage(0, ConstantesGrales.ROWS_BY_PAGE, null);
    }

    getVencimientos(){
        this.vencimientosSubs = this._vs.getChoferesConVencimientos$( this._us.usuario.empresa,
            CONSTANTES_CHOFER.HABILITADO )
            .subscribe(  resp => this.vencimientosCho = resp, this.error.bind( this )  );
    }

    goToDetails( chofer ) {
        this.router.navigate(['chofer', chofer.id]);
    }

    deleteChofer( chofer: any ){
        swal({
         title: "Eliminación",
         text: "Esta seguro que desea eliminar el chofer " + chofer.cho_nombre,
         icon: "warning",
         buttons: true,
         dangerMode: true,
       })
       .then(willDelete => {
         if (willDelete) {
             this.delete( chofer );
         }
       });        
    }

    delete( chofer ) {
        this.deleteChoferSubscription = this.choferService.deleteChofer$( chofer.choferPK.cho_emp_codigo, chofer.choferPK.cho_codigo )
        .subscribe( this.okDeleteChofer.bind( this) );

    }

    okDeleteChofer( ok) {
      this.mostrarDetalle();      
      this.getVencimientos();
    }  

    back( ) {
        history.back();
    }


    crearNuevo() {        
        this.choferNuevo = {
            choferPK: { cho_emp_codigo: this._us.usuario.empresa, cho_codigo:0},
            cho_estado: null,
            cho_chofer: null,
            cho_legajo: null,
            cho_nombre: null,
            cho_doc_codigo: null,
            cho_documento: null,
            cho_grupo_sanguineo: null,
            cho_observaciones: null,
            cho_telefono: null,
            cho_telefono_emergencia: null,
            cho_fecha_nacimiento: null
        };
    }  

    cambiarEstado(updateEstChofer) {

        let valueFuturo;

        if (updateEstChofer.cho_estado === 1) {
            valueFuturo = 0 ;
        } else {
            valueFuturo = 1 ;
        }

        const estadoFuturo = this.estados.find( e => e.codigo === valueFuturo );

        swal({
            title: "Estado",
            text: "El nuevo estado del chofer " 
                   + updateEstChofer.cho_nombre
                   + " sera: " + ( estadoFuturo? estadoFuturo.descripcion: 'Sin definir' ) 
                   + " esta seguro? ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then( actualiza => {
            if (actualiza ){
                updateEstChofer.cho_estado = valueFuturo;
                this.estadoSubs = this.choferService.update$(updateEstChofer)
                .subscribe( result => {
                    this.mostrarDetalle();        
                    this.getVencimientos();    
                }, err => {
                      this.ctrolError.tratarErroresEliminaciones( err );
                } );
            }
        });    
        
    }  
    
   

}
