import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs';
import {PaginationPage, PaginationPropertySort} from '../../shared/pagination';
import {Table} from '../../shared/table';
import {ChoferService} from '../chofer.service';
import {Chofer} from '../../domain';
import {MiUsuarioService} from '../../_services/mi.usuario.service';
import { AlertService } from '../../_services/alert.service';
import { ErrorService } from '../../_services/error.service';
import { Constantes } from '../../utiles/const-data-model';


@Component({
  selector: 'app-chofer-list',
  templateUrl: './chofer-list.component.html',
  styleUrls: ['./chofer-list.component.css']
})
export class ChoferListComponent implements OnInit {

   choferPage: PaginationPage<any>;
   self: Table<any>;

    choferNuevo: Chofer;

    public estados = [
        { value: '0', display: 'HABILITADO' },
        { value: '1', display: 'DESHABILITADO' },
    ];

    constructor( private choferService: ChoferService,
                 private router: Router,
                 private yo: MiUsuarioService,
                 private alertService: AlertService,
                 private ctrolError: ErrorService) {
    }


    ngOnInit() {
        this.mostrarDetalle();
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort)  {
        let observable: Observable<any>
        = this.choferService.findChoferes$( pageNumber, pageSize, sort, this.yo.getEmpresa() );
        observable.subscribe( this.okChoferes.bind( this), this.errorChoferes.bind( this ) );
        this.self = this;
    }

    okChoferes ( choferesPage  ) {
      this.choferPage = choferesPage;
    }

    errorChoferes( err) {

    }

    mostrarDetalle(): void {
        this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
    }



    goToDetails( chofer ) {
        this.router.navigate(['chofer', chofer.id]);
    }

    delete(chofer){
        let observable: Observable<any> = this.choferService.deleteChofer$( chofer.choferPK.cho_emp_codigo, chofer.choferPK.cho_codigo );

        observable.subscribe(result => {
             this.mostrarDetalle();
             this.success('El chofer se elimino con exito!!!');

          }, err => {
            this.error( 'El chofer no se pudo eliminar.' + this.ctrolError.tratarErroresEliminaciones(err) );
          } );

    }

    viewDetails(chofer) {
        /* let observable: Observable<any> = this.choferService.viewChofer(chofer.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
        }).subscribe(doNothing, hideLoading, hideLoading);*/
    }

    back( ) {
        history.back();
    }


    crearNuevo() {
        this.clearAlert();
        this.choferNuevo = {
            choferPK: { cho_emp_codigo: this.yo.user.empresa, cho_codigo:0},
            cho_estado: null,
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

    success(message: string) {
        this.alertService.success(message);
    }

    error(message: string) {
        this.alertService.error(message);
    }

    clearAlert() {
        this.alertService.clear();
    }

    cambiarEstado(chofer) {

        this.choferService.update$(chofer).subscribe(result => {
            //nada solo cambiar el color del boton
        }, err => {
            this.error(  this.ctrolError.tratarErroresEliminaciones(err) );
        } );

    }

}
