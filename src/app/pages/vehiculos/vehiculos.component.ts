import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UsuarioService, AlertService, ErrorService, VehiculoService } from 'src/app/services/service.index';
import { Vehiculo, Constantes } from 'src/app/models/model.index';
import { PaginationPage, Table, PaginationPropertySort } from 'src/app/shared/pagination/pagination.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';




@Component({
    selector: 'app-vehiculo-list',
    templateUrl: './vehiculos.component.html',
    styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit, OnDestroy  {

    vehiculoPage: PaginationPage<any>;
    self: Table<any>;
    vehiculoNuevo: Vehiculo;

    listadoSubs: Subscription;
    deleteVehiculoSubs: Subscription;

    currentVehiculo;
    updateEstvehiculo : Vehiculo;

    public estados = [
        { value: '0', display: 'HABILITADO' },
        { value: '1', display: 'DESHABILITADO' },
    ];

    constructor(private vehiculoService: VehiculoService,
        private router: Router,
        private _us: UsuarioService,
        private alertService: AlertService,
        private ctrolError: ErrorService) {
    }

    ngOnInit() {
       this.mostrarDetalle();
    }

    ngOnDestroy(): void {
        if ( this.listadoSubs ) { this.listadoSubs.unsubscribe(); }
        if ( this.deleteVehiculoSubs ) { this.deleteVehiculoSubs.unsubscribe(); }
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

    delete(vehiculo) {
        this.deleteVehiculoSubs =
        this.vehiculoService.deleteVehiculo$( vehiculo.vehiculoPK.vehEmpCodigo, vehiculo.vehiculoPK.vehInterno )
        .subscribe( this.okDeleteVehiculo.bind(this), this.errorDeleteVehiculo.bind( this ) );
    }

    okDeleteVehiculo( ok ) {
      this.mostrarDetalle();
      this.success('El Vehiculo se elimino con exito!!!');
    }

    errorDeleteVehiculo( err ) {
       this.ctrolError.tratarErroresEliminaciones(err);
    }    

    crearNuevo() {

        this.clearAlert();
        this.vehiculoNuevo = {
            vehiculoPK: { vehEmpCodigo: this._us.usuario.empresa , vehInterno: 0  },
            vehEstado: null,
            vehPatente: null,
            vehMotor: null,
            vehChasis: null,
            vehCarroceria: null,
            vehMovilGps: null,
            vehMpaCodigo: null,
            vehVerificacionTecnica: null
        };

    }

    success(message: string) {
        this.alertService.success(message);
    }

    error(message: string) {
        this.alertService.error(message);
    }

    clearAlert() {
        this.alertService.clear();
    }

    cambiarEstado(updateEstvehiculo) {
    if (updateEstvehiculo.vehEstado === 1) {
        updateEstvehiculo.vehEstado = 0;
    } else {
        updateEstvehiculo.vehEstado = 1;
    }
        this.vehiculoService.update$( updateEstvehiculo ).subscribe( result => {
          this.mostrarDetalle();
          this.success('Se cambio correctamente el estado del vehículo');
          }, err => {
             this.ctrolError.tratarErroresEliminaciones(err) ;
          }
        );
        this.clearAlert();
    }
  


}
