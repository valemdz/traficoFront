import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationPage, PaginationPropertySort } from 'src/app/shared/pagination';
import { Table } from 'src/app/shared/table';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';
import { Subscription } from 'rxjs';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { Constantes } from 'src/app/utiles/const-data-model';
import { IdaVtaListService } from 'src/app/services/service.index';
import { ErrorService } from 'src/app/_services/error.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-ida-vta-list',
  templateUrl: './ida-vta-list.component.html',
  styleUrls: ['./ida-vta-list.component.css'],  
})
export class IdaVtaListComponent implements OnInit, OnDestroy {

  IdaVueltaPage:  PaginationPage<any>=null;
  self: Table<any>;
  listEnlacesSubs: Subscription;

  deleteEnlaceSubs: Subscription;

  constructor( private yo: MiUsuarioService,
               private _ivs: IdaVtaListService,
               private ctrolError: ErrorService,
               private alertService: AlertService ) { }

  ngOnInit() {
      this.mostrarDetalle();
  }

  mostrarDetalle(): void {
    this.fetchPage(0, Constantes.ROWS_BY_PAGE, null);
  }

  fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort)  {

    const params = FuncionesGrales.toParams( pageNumber, pageSize, sort );
    this.listEnlacesSubs = this._ivs.getEnlacesLineasByEmpresa$( this.yo.getEmpresa(), params )
    .subscribe( this.okListadoEnlaces.bind( this ) );

    this.self = this;
  }

  okListadoEnlaces( enlacesPage ) {    
    this.IdaVueltaPage = enlacesPage;
  }

  ngOnDestroy(): void {
    if ( this.listEnlacesSubs ) { this.listEnlacesSubs.unsubscribe(); }
    if ( this.deleteEnlaceSubs ) { this.deleteEnlaceSubs.unsubscribe(); }
  }
  
  actualizaPage( event ){
    this.mostrarDetalle();
  }

  eliminarEnlace( idEnlace:number ){
      this.deleteEnlaceSubs = this._ivs.deleteEnlaceLineas$( idEnlace )
          .subscribe(  this.okDeleteEnlace.bind( this ), this.errorDeleteEnlace.bind( this ) );
  }  

  okDeleteEnlace( ok) {
    this.mostrarDetalle();
    this.alertService.success('El Enlace se elimino con exito!!!');
  }

  errorDeleteEnlace( err ) {
    this.ctrolError.tratarErroresEliminaciones(err);
  }  

}
