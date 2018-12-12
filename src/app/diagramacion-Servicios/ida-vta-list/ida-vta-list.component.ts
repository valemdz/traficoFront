import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationPage, PaginationPropertySort } from 'src/app/shared/pagination';
import { Table } from 'src/app/shared/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdaVtaListService } from './ida-vta-list.service';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';
import { Subscription } from 'rxjs';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { Constantes } from 'src/app/utiles/const-data-model';

@Component({
  selector: 'app-ida-vta-list',
  templateUrl: './ida-vta-list.component.html',
  styleUrls: ['./ida-vta-list.component.css'],
  providers: [  IdaVtaListService ]
})
export class IdaVtaListComponent implements OnInit, OnDestroy {

  IdaVueltaPage:  PaginationPage<any>;
  self: Table<any>;
  listEnlacesSubs: Subscription;

  constructor( private yo: MiUsuarioService,
               private _ivs: IdaVtaListService ) { }

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
  }
/*
deleteEnlace(enlace) {
  this._ivs.deleteEnlaceLineas$(enlace);
}
*/
  
  actualizaPage( event ){
    this.mostrarDetalle();
  }

}
