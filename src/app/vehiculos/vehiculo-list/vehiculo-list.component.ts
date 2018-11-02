import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as Rx from 'rxjs/Rx';
import { PaginationPage, PaginationPropertySort } from '../../shared/pagination';
import { Table } from '../../shared/table';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../../domain';
import {MiUsuarioService} from '../../_services/mi.usuario.service';

import { AlertService } from '../../_services/alert.service';
import { ErrorService } from '../../_services/error.service';
import { Constantes } from '../../utiles/const-data-model';
import { Observable, Subscription } from 'rxjs';



@Component({
    selector: 'app-vehiculo-list',
    templateUrl: './vehiculo-list.component.html',
    styleUrls: ['./vehiculo-list.component.css']
})
export class VehiculoListComponent implements OnInit, OnDestroy  {

    vehiculoPage: PaginationPage<any>;
    self: Table<any>;
    vehiculoNuevo: Vehiculo;

    listadoSubs: Subscription;
    deleteVehiculoSubs: Subscription;

    public estados = [
        { value: '0', display: 'HABILITADO' },
        { value: '1', display: 'DESHABILITADO' },
    ];

    constructor(private vehiculoService: VehiculoService,
        private router: Router,
        private yo: MiUsuarioService,
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
        this.listadoSubs =
        this.vehiculoService.findVehiculos$(pageNumber, pageSize, sort, this.yo.getEmpresa())
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
      this.error( this.ctrolError.tratarErroresEliminaciones(err) );
    }

    /*viewDetails(vehiculo) {
        let observable: Observable<any> = this.vehiculoService.viewVehiculo(vehiculo.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }*/

    crearNuevo() {

        this.clearAlert();
        this.vehiculoNuevo = {
            vehiculoPK: { vehEmpCodigo: this.yo.user.empresa, vehInterno: 0  },
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

    cambiarEstado(vehiculo){

        this.vehiculoService.update$( vehiculo ).subscribe( result => {
            //nada solo cambia el color del boton
          }, err => {
            this.error( this.ctrolError.tratarErroresEliminaciones(err) );

          }
        );

    }



}
