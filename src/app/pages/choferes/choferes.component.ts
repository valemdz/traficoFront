import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';

import { ChoferService } from 'src/app/services/choferes/chofer.service';
import { UsuarioService, ErrorService, VencimientoService, ModalService, ModalUploadService } from 'src/app/services/service.index';
import { Chofer, CONSTANTES_CHOFER, ConstantesGrales, VencimientosChoferes, ChoferPK } from 'src/app/models/model.index';

import { PaginationPage, Table, PaginationPropertySort } from 'src/app/shared/pagination/pagination.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { ComponenteItem } from 'src/app/shared/modal/modal.index';
import { ChoferComponent } from './chofer/chofer.component';
import { CarnetListComponent } from './carnet-list/carnet-list.component';
import { IncidenciaByChoferComponent } from './incidencia-by-chofer/incidencia-by-chofer.component';

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
   subscriptionModal: Subscription;

   carnetChofer;
   incidenciaChofer;
   updateEstChofer: Chofer;
   vencimientosCho: VencimientosChoferes[]=[];

   notificacionSubscription: Subscription;

   public estados = CONSTANTES_CHOFER.ESTADOS;

   busqueda:string;

   constructor( private choferService: ChoferService,
                 private router: Router, public _vs: VencimientoService,
                 public _us: UsuarioService,                 
                 private ctrolError: ErrorService,
                 private _ms: ModalService,
                 public _imgs: ModalUploadService ) {

        this.subscriptionModal = this._ms.getRespuesta()
        .subscribe( resp => {
                if( FuncionesGrales.tienePropiedad(resp, 'nuevo') ){                   
                        if(  !resp.nuevo ){
                            this.updateChoferesEnPage( resp.chofer );
                        }else{
                            this.mostrarDetalle();
                    
                        }       
                }                                                                            
                //this.getVencimientos();               
                   
        });            
   }

   cambiarImagenModal( chofer: Chofer ) {        
    const url = this.choferService.getUrlImagenChofer( chofer );
    const titulo = `Personal  ${chofer.idAux} - ${chofer.nombre}`
    const existe  = chofer.foto != null && chofer.foto.length> 0;
    this._imgs.mostraModal( url, titulo, existe );
   }

   suscripcionModalImagenes(){
       this.notificacionSubscription = this._imgs.notificacion.subscribe( 
            chofer =>  { 
                this.choferPage.content[this.choferPage.rowSelected] = chofer;                
            });
   }


    ngOnInit() {
        this.suscripcionModalImagenes();
        this.mostrarDetalle();
        //this.getVencimientos();
    }

    ngOnDestroy(): void {

          if ( this.listadoSubscription ) { this.listadoSubscription.unsubscribe(); }
          if ( this.deleteChoferSubscription ) { this.deleteChoferSubscription.unsubscribe(); }
          if ( this.estadoSubs ) { this.estadoSubs.unsubscribe(); }
          if ( this.vencimientosSubs ){ this.vencimientosSubs.unsubscribe(); }
          if ( this.subscriptionModal ) { this.subscriptionModal.unsubscribe(); }
          if(  this.notificacionSubscription ){  this.notificacionSubscription.unsubscribe(); }

    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort)  {

        let params = FuncionesGrales.toParams( pageNumber, pageSize, sort );

        if(  this.busqueda != null &&  this.busqueda.length > 0 ){
            params = FuncionesGrales.toParamsWithBusqueda( this.busqueda, pageNumber, pageSize, sort );        
        }

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

    deleteChofer( chofer: Chofer ){
        swal({
         title: "Eliminación",
         text: "Esta seguro que desea eliminar el Personal " + chofer.nombre,
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

    delete( chofer: Chofer ) {
        this.deleteChoferSubscription = this.choferService.deleteChofer$( chofer.choferPK.empCodigo, chofer.choferPK.codigo )
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
        
        let choferPK: ChoferPK = { empCodigo: this._us.usuario.empresa,
                                    codigo:0};

        let choferNuevo = new Chofer( choferPK );        

        this._ms.sendComponent( new ComponenteItem( ChoferComponent ,
                                { chofer: choferNuevo, nuevo:true } ) );       
    }  

    modificarChofer( chofer: Chofer ){  
        this._ms.sendComponent( new ComponenteItem( ChoferComponent ,
                                { chofer: chofer, nuevo: false } ) );       
    }

    openCarnets( chofer: Chofer ){  
        this._ms.sendComponent( new ComponenteItem( CarnetListComponent ,
                                { chofer: chofer } ) );       
    }

    openIncidencias( chofer: Chofer ){  
        this._ms.sendComponent( new ComponenteItem( IncidenciaByChoferComponent ,
                                { chofer: chofer } ) );       
    }

    cambiarEstado(updateEstChofer) {

        let valueFuturo;

        if (updateEstChofer.estado === 1) {
            valueFuturo = 0 ;
        } else {
            valueFuturo = 1 ;
        }

        const estadoFuturo = this.estados.find( e => e.codigo === valueFuturo );

        swal({
            title: "Estado",
            text: "El nuevo estado del Personal " 
                   + updateEstChofer.nombre
                   + " sera: " + ( estadoFuturo? estadoFuturo.descripcion: 'Sin definir' ) 
                   + " esta seguro? ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then( actualiza => {
            if (actualiza ){
                updateEstChofer.estado = valueFuturo;
                this.estadoSubs = this.choferService.update$(updateEstChofer)
                .subscribe( result => {
                    this.updateChoferesEnPage( result );   
                }, err => {
                      this.ctrolError.tratarErroresEliminaciones( err );
                } );
            }
        });    
        
    }  
    
    updateChoferesEnPage( chofer ){            
        this.choferPage.content[this.choferPage.rowSelected] = chofer;
    }

    buscarPersonal( busqueda ){
        this.busqueda =  busqueda;       
        this.mostrarDetalle(); 
    }   
   
    setRowSelected( i ){
        this.choferPage.rowSelected = i;
    }

}
