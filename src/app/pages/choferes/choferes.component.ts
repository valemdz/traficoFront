import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {  Subscription } from 'rxjs';
import {PaginationPage, PaginationPropertySort} from '../../shared/pagination';
import {Table} from '../../shared/table';
import { Constantes } from '../../utiles/const-data-model';
import { ChoferService } from 'src/app/services/choferes/chofer.service';
import { UsuarioService, AlertService, ErrorService } from 'src/app/services/service.index';
import { Chofer } from 'src/app/models/model.index';


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

    choferNuevo: Chofer;    
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
                 public _us: UsuarioService,
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
        = this.choferService.findChoferes$( pageNumber, pageSize, sort, this._us.usuario.empresa )
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

    deleteChofer( chofer: any ){
        swal({
         title: "Eliminación",
         text: "Esta seguro que desea eliminar el chofer " + chofer.cho_nombre,
         icon: "warning",
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
    }

    /*errorDeleteChofer( err ) {
       // Lo manejo interamente 
       this.ctrolError.tratarErroresEliminaciones(err);
    }*/
  

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
        if (updateEstChofer.cho_estado === 1) {
            updateEstChofer.cho_estado = 0 ;
        } else {
            updateEstChofer.cho_estado = 1 ;
        }
        swal({
            title: "Estado",
            text: "Esta seguro que desea cambiar el estado del chofer " + updateEstChofer.cho_nombre,
            icon: "warning",
            dangerMode: true,
        })
        .then(willDelete => {
            if (willDelete) {
                //this.delete( chofer );
            }
        });        


        this.choferService.update$(updateEstChofer).subscribe(result => {
            this.mostrarDetalle();            
        }, err => {
              this.ctrolError.tratarErroresEliminaciones( err );
        } );
        
    }  
    
   

}
