import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { UsuarioService, ErrorService, VehiculoService, ModalService } from 'src/app/services/service.index';
import { Vehiculo, Constantes, CONSTANTES_VEHICULOS } from 'src/app/models/model.index';
import { PaginationPage, Table, PaginationPropertySort } from 'src/app/shared/pagination/pagination.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { ComponenteItem } from 'src/app/shared/modal/modal.index';
import { VehiculoComponent } from './vehiculo/vehiculo.component';

declare var swal;

declare var $;

@Component({
    selector: 'app-vehiculo-list',
    templateUrl: './vehiculos.component.html',
    styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit, OnDestroy  {

    vehiculoPage: PaginationPage<any>;
    self: Table<any>;    

    listadoSubs: Subscription;
    deleteVehiculoSubs: Subscription;
    modalSubs: Subscription;    
    updateEstvehiculo : Vehiculo;

    public estados = CONSTANTES_VEHICULOS.ESTADOS_VEHICULO;

    constructor(private vehiculoService: VehiculoService,
        private router: Router,
        private _us: UsuarioService,
        private _ms: ModalService,        
        private ctrolError: ErrorService) {

            this.modalSubs = this._ms.getRespuesta().subscribe( res => {
                this.mostrarDetalle();
            });
    }

    ngOnInit() {
       this.mostrarDetalle();
    }

    ngOnDestroy(): void {
        if ( this.listadoSubs ) { this.listadoSubs.unsubscribe(); }
        if ( this.deleteVehiculoSubs ) { this.deleteVehiculoSubs.unsubscribe(); }
        if ( this.modalSubs ){ this.modalSubs.unsubscribe(); }
    }

    mostrarDetalle(): void {
        this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
    }

   fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort) {

        const params = FuncionesGrales.toParams( pageNumber, pageSize, sort );
        this.listadoSubs =  this.vehiculoService.findVehiculos$( this._us.usuario.empresa, params )
        .subscribe( this.okVehiculo.bind( this), this.errorVehiculo.bind( this) );
        this.self = this;
    }

    okVehiculo ( vehiculosPage ) {
        this.vehiculoPage = vehiculosPage;
    }

    errorVehiculo( err ) {
      this.ctrolError.tratarErrores( err, null, null, null );
    }

    goToDetails(vehiculo) {
        this.router.navigate(['vehiculo', vehiculo.id]);
    }

    delete( vehiculo ) {

        swal({
            title: "Eliminacion",
            text: "Esta seguro que desea eliminar el Vehiculo " 
                   + vehiculo.vehiculoPK.vehInterno                   
                   + " ? ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then( actualiza => {
            if (actualiza ){
                this.deleteVehiculoSubs =
                this.vehiculoService.deleteVehiculo$( vehiculo.vehiculoPK.vehEmpCodigo, vehiculo.vehiculoPK.vehInterno )
                .subscribe( this.okDeleteVehiculo.bind(this) );
            }               
         }); 
       
    }

    okDeleteVehiculo( ok ) {
      this.mostrarDetalle();      
    }   

    crearNuevo() {        
        let vehiculoNuevo = {
            vehiculoPK: { vehEmpCodigo: this._us.usuario.empresa , vehInterno: 0 },
            vehEstado: null,
            vehPatente: null,
            vehMotor: null,
            vehChasis: null,
            vehCarroceria: null,
            vehMovilGps: null,
            vehMpaCodigo: null,
            vehVerificacionTecnica: null
        };

        this._ms.sendComponent( new ComponenteItem( VehiculoComponent, { vehiculo: vehiculoNuevo }));
        
    }   
    
    modificarVehiculo( vehiculo ){
        this._ms.sendComponent( new ComponenteItem( VehiculoComponent, { vehiculo: vehiculo }));
    }

    cambiarEstado(updateEstvehiculo) {

        let valueFuturo;

        if (updateEstvehiculo.vehEstado === CONSTANTES_VEHICULOS.HABILITADO ) {
            valueFuturo = CONSTANTES_VEHICULOS.DESHABILITADO
        } else {
            valueFuturo = CONSTANTES_VEHICULOS.HABILITADO
        }

        const estadoFuturo = this.estados.find( e => e.codigo === valueFuturo );

        swal({
            title: "Estado",
            text: "El nuevo estado del Vehiculo " 
                   + updateEstvehiculo.vehiculoPK.vehInterno
                   + " sera: " + ( estadoFuturo? estadoFuturo.descripcion: 'Sin definir' ) 
                   + " esta seguro? ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then( actualiza => {
            if (actualiza ){
                updateEstvehiculo.vehEstado =  valueFuturo;
                this.vehiculoService.update$( updateEstvehiculo ).subscribe( result => {
                    this.mostrarDetalle();
                    
                    }, err => {
                        this.ctrolError.tratarErroresEliminaciones(err) ;
                    }
                    );                    
                }
               
            });    
    }          

}
