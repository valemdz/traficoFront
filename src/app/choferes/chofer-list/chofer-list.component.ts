import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
export class ChoferListComponent implements OnInit, OnDestroy {


   choferPage: PaginationPage<any>;
   self: Table<any>;
   listadoSubscription: Subscription;
   deleteChoferSubscription: Subscription;

    choferNuevo: Chofer;

    deleteChofer;
    currentChofer;
    carnetChofer;
    incidenciaChofer;
    updateEstChofer: Chofer;

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

    ngOnDestroy(): void {
          if ( this.listadoSubscription ) { this.listadoSubscription.unsubscribe(); }
          if ( this.deleteChoferSubscription ) { this.deleteChoferSubscription.unsubscribe(); }
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort)  {
        this.listadoSubscription
        = this.choferService.findChoferes$( pageNumber, pageSize, sort, this.yo.getEmpresa() )
        .subscribe( this.okChoferes.bind( this), this.errorChoferes.bind( this ) );
        this.self = this;
    }

    okChoferes ( choferesPage  ) {
      this.choferPage = choferesPage;
    }

    errorChoferes( err) {
      this.ctrolError.tratarErrores( err, null, null, null );
    }

    mostrarDetalle(): void {
        this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
    }

    goToDetails( chofer ) {
        this.router.navigate(['chofer', chofer.id]);
    }

    delete( chofer ) {
        this.deleteChoferSubscription = this.choferService.deleteChofer$( chofer.choferPK.cho_emp_codigo, chofer.choferPK.cho_codigo )
        .subscribe( this.okDeleteChofer.bind( this), this.errorDeleteChofer.bind( this ) );

    }

    okDeleteChofer( ok) {
      this.mostrarDetalle();
      this.success('El personal se elimino con exito!!!');
    }

    errorDeleteChofer( err ) {
       this.ctrolError.tratarErroresEliminaciones(err);
    }

    /*viewDetails(chofer) {
        let observable: Observable<any> = this.choferService.viewChofer(chofer.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }*/

    back( ) {
        history.back();
    }


    crearNuevo() {
        this.clearAlert();
        this.choferNuevo = {
            choferPK: { cho_emp_codigo: this.yo.user.empresa, cho_codigo:0},
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

    success(message: string) {
        this.alertService.success(message);
    }

    clearAlert() {
        this.alertService.clear();
    }

    cambiarEstado(updateEstChofer) {
        if (updateEstChofer.cho_estado === 1) {
            updateEstChofer.cho_estado = 0 ;
        } else {
            updateEstChofer.cho_estado = 1 ;
        }
        this.choferService.update$(updateEstChofer).subscribe(result => {
            this.mostrarDetalle();
            this.success('Se cambio correctamente el estado del Personal');
        }, err => {
              this.ctrolError.tratarErroresEliminaciones( err );
        } );

    }

}
