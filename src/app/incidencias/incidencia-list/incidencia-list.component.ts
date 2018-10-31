import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import * as Rx from 'rxjs/Rx';

import { PaginationPage, PaginationPropertySort } from '../../shared/pagination';
import { Table } from '../../shared/table';
import { showLoading, hideLoading, doNothing } from '../../shared/commons'
import { IncidenciaService } from '../incidencia.service';
import { Incidencia} from '../../domain';

import {MiUsuarioService} from '../../_services/mi.usuario.service';
import { AlertService } from '../../_services/alert.service';
import { Constantes } from '../../utiles/const-data-model';
import { ErrorService } from '../../_services/error.service';
import { IncidenciaComponent } from '../incidencia/incidencia.component';
import { ComponenteItem }         from '../../shared/componente-item';
import { RespuestaModalService } from '../../_services/respuesta.modal.service';
import { Observable, Subscription } from 'rxjs';



@Component({
    selector: 'app-incidencia-list',
    templateUrl: './incidencia-list.component.html',
    styleUrls: ['./incidencia-list.component.css']
})
export class IncidenciaListComponent implements OnInit, OnDestroy  {


    subscription: Subscription;


    modal = null;

    incidenciaPage: PaginationPage<Incidencia>;
    self: Table<Incidencia>;

    incidenciaNuevo: Incidencia;

    ads: ComponenteItem[];

    constructor( private incidenciaService: IncidenciaService,
        private router: Router,
        private yo:MiUsuarioService,
        private alertService: AlertService,
        private ctrolError: ErrorService,
        private respuestaModalService: RespuestaModalService  ) {

        this.subscription = this.respuestaModalService.
        getMessage().
        subscribe( ( mostrar:boolean) => {
                                            if( mostrar ){
                                               this.mostrarDetalle();
                                            }
                                         } );


    }

    ngOnInit() {
        this.mostrarDetalle();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        console.log( 'Libera la suscrip'  )
        this.subscription.unsubscribe();
    }

    mostrarDetalle():void{

        this.modal = null;

        let observable: Observable<any> = this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
        showLoading();
        observable.subscribe( result => {

        }, err => {
          //this.ctrolError.tratarErrores(err, this.incidenciaForm, this.erroresGrales, this.translations['gral']);
          //this.ctrolError.checkFormValidity(this.incidenciaForm, this.errMsgs,  this.translations );
        } );

        this.self = this;
    }


    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Observable<any> {
        let observable: Observable<any> = this.incidenciaService.findIncidencias(pageNumber, pageSize, sort, this.yo.getEmpresa());
        observable.subscribe(incidenciaPage => this.incidenciaPage = incidenciaPage);
        return observable;
    }

    goToDetails(incidencia) {
        this.router.navigate(['incidencia', incidencia.id]);
    }

    delete(incidencia) {
        let observable: Observable<any> = this.incidenciaService.deleteIncidencia(incidencia.id);

        observable.subscribe( result => {
            this.mostrarDetalle();
            this.success('La incidencia se elimino con exito!!!')

        }, err => {

            this.error( this.ctrolError.tratarErroresEliminaciones(err) );

        } );

    }

    viewDetails(incidencia) {
        /*let observable: Observable<any> = this.incidenciaService.viewIncidencia(incidencia.id);
        showLoading();
        observable.subscribe(() => {
            return this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
        }).subscribe(doNothing, hideLoading, hideLoading);*/
    }

    crearNuevo(){
        this.alertService.clear();
        this.incidenciaNuevo= {
            id: 0,
            codigo:null,
            in_descripcion: null,
            in_tipo: null,
            in_color:null,
            in_empresa: this.yo.user.empresa
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

    crearNuevoDinam(){

        this.crearNuevo();
        this.ads = this.getComponente(this.incidenciaNuevo, true);

    }

    modificarDinam( incidenciaM ){
        this.ads = this.getComponente( incidenciaM, false );
    }

    getComponente( incid, nuev) {
        return [
          new ComponenteItem(IncidenciaComponent, {incidencia: incid, nuevo: nuev, mensaje:''})
        ];
    }



}
