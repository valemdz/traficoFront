import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as Rx from 'rxjs/Rx';
import { PaginationPage, PaginationPropertySort } from '../../shared/pagination';
import { Table } from '../../shared/table';
import { showLoading, hideLoading, doNothing } from '../../shared/commons'
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../../domain';
import {MiUsuarioService} from '../../_services/mi.usuario.service';

import { AlertService } from '../../_services/alert.service';
import { ErrorService } from '../../_services/error.service';
import { Constantes } from '../../utiles/const-data-model';
import { Observable } from 'rxjs';



@Component({
    selector: 'app-vehiculo-list',
    templateUrl: './vehiculo-list.component.html',
    styleUrls: ['./vehiculo-list.component.css']
})
export class VehiculoListComponent implements OnInit  {

    vehiculoPage: PaginationPage<Vehiculo>;
    self: Table<Vehiculo>;

    vehiculoNuevo: Vehiculo ;

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

        let observable: Observable<any> = this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
        this.self = this;
    }

    mostrarDetalle():void{
        let observable: Observable<any> = this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
    }

   fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Observable<PaginationPage<any>> {
        let observable: Observable<any> =
        this.vehiculoService.findVehiculos$(pageNumber, pageSize, sort, this.yo.getEmpresa());
        observable.subscribe(vehiculoPage =>
         { this.vehiculoPage = vehiculoPage;
          for (let _i = 0; _i < this.vehiculoPage.content.length; _i++) {
              this.vehiculoPage.content[_i].vehVerificacionTecnica =
               new Date(this.vehiculoPage.content[_i].vehVerificacionTecnica);
          }
        });
        return observable;
    }

    goToDetails(vehiculo) {
        console.log('un vehiculo ' + vehiculo.veh_interno);
        this.router.navigate(['vehiculo', vehiculo.id]);
    }

    delete(vehiculo) {
        let observable: Observable<any> =
        this.vehiculoService.deleteVehiculo$( vehiculo.vehiculoPK.vehEmpCodigo, vehiculo.vehiculoPK.vehInterno );
        observable.subscribe(result => {
            this.mostrarDetalle();
            this.success('El Vehiculo se elimino con exito!!!');

         }, err => {

           this.error( this.ctrolError.tratarErroresEliminaciones(err) );
           //this.ctrolError.tratarErrores(err, this.choferForm, this.erroresGrales, this.translations['gral']);
           //this.checkTodoFormValidity();
         } );
    }

    viewDetails(vehiculo) {
        /*let observable: Observable<any> = this.vehiculoService.viewVehiculo(vehiculo.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
        }).subscribe(doNothing, hideLoading, hideLoading);*/
    }

    crearNuevo(){

        this.clearAlert();
        this.vehiculoNuevo = {
            vehiculoPK:{ vehEmpCodigo:this.yo.user.empresa,vehInterno:0  },
            vehEstado:null,
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
