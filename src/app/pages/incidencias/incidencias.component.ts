import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertService, ErrorService, ModalService, UsuarioService, IncidenciaService } from 'src/app/services/service.index';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { Incidencia, ConstantesGrales } from 'src/app/models/model.index';
import { PaginationPage, Table, PaginationPropertySort } from 'src/app/shared/pagination/pagination.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { ComponenteItem } from 'src/app/shared/modal/componente-item';

declare var swal;

@Component({
    selector: 'app-incidencias-list',
    templateUrl: './incidencias.component.html',
    styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit, OnDestroy  {

    subscription: Subscription;
    listadoSubcription: Subscription;
    deleteIncSubscription: Subscription;
    modal = null;

    incidenciaPage: PaginationPage<any>;
    self: Table<any>;

    incidenciaNuevo: Incidencia;

    comp: ComponenteItem;

    currentIncidencia;

    constructor( private incidenciaService: IncidenciaService,
        public _us: UsuarioService, 
        private router: Router,                
        private ctrolError: ErrorService,
        private _ms: ModalService ) {

        this.subscription = this._ms.getRespuesta()
                                .subscribe( ( mostrar: boolean) => {
                                            if ( mostrar ) {
                                                this.mostrarDetalle();
                                            }
                                } );
    }

    ngOnInit() {
        this.mostrarDetalle();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        if ( this.subscription) { this.subscription.unsubscribe(); }
        if ( this.listadoSubcription ) { this.listadoSubcription.unsubscribe(); }
        if ( this.deleteIncSubscription ){ this.deleteIncSubscription.unsubscribe(); }
    }

    mostrarDetalle(): void {
        this.modal = null;
        this.fetchPage(0, ConstantesGrales.ROWS_BY_PAGE, null);
    }


    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort) {
        const params = FuncionesGrales.toParams( pageNumber, pageSize, sort );
        this.listadoSubcription = 
        this.incidenciaService.findIncidencias$(this._us.usuario.empresa, params )
        .subscribe( this.okIncidencias.bind( this), this.errorIncidencias.bind( this ) );
        this.self = this;
    }

    okIncidencias(  incidenciasPage ) {
       this.incidenciaPage = incidenciasPage;
    }

    errorIncidencias( err ) {      
      this.ctrolError.tratarErrores( err, null, null, null );
    }

    goToDetails(incidencia) {
        this.router.navigate(['incidencia', incidencia.id]);
    }

    delete( incidencia ) {

        swal({
        title: "Eliminación",
        text: "Esta seguro que desea eliminar la incidencia: " + incidencia.in_descripcion ,
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then(willDelete => {
            if (willDelete) {
                this.deleteIncSubscription = this.incidenciaService.deleteIncidencia$(incidencia.id)
                    .subscribe( this.okDeleteInc.bind( this ), this.errorDeleteInc.bind(this) );   
            }
        });         
    }

    okDeleteInc( okDelete){
      this.mostrarDetalle();      
    }

    errorDeleteInc( err ) {
       this.ctrolError.tratarErroresEliminaciones(err);
    }   

    crearNuevoDinam() {            
        this._ms.sendComponent( this.getComponente( new Incidencia() , true) );
    }

    modificarDinam( incidenciaM ) {
        this._ms.sendComponent( this.getComponente( incidenciaM, false ) );
    }

    getComponente( incid, nuev) {        
        return new ComponenteItem( IncidenciaComponent, 
                                   {incidencia: incid, nuevo: nuev, mensaje: ''});
        
    }



}
