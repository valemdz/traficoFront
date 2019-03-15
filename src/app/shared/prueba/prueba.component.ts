import { Component, OnInit, Inject, LOCALE_ID, ViewChild, ElementRef, AfterViewInit, ViewChildren, OnDestroy } from '@angular/core';
import { DiagrService, VueltasService, UsuarioService } from 'src/app/services/service.index';
import { ChoferesConEstadoPipe } from 'src/app/pipes/choferes-con-estado.pipe';
import { ModalSiNoService } from '../modal-si-no/modal-si-no.service';
import { ModalSiNo } from 'src/app/models/modalSiNo.model';
import { Subscription, forkJoin } from 'rxjs';
import { getSingleValueObservable, getDelayedValueObservable, getMultiValueObservable } from './prueba';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
  providers: [ ChoferesConEstadoPipe ]
})
export class PruebaComponent implements OnInit,  OnDestroy  {

  constructor( private _us: UsuarioService ){

  }

  permisos = [ 'ROLE_USUARIOS_LISTAR', 'ROLE_USUARIOS_MODIFICAR', 
              'ROLE_USUARIOS_TODOS_LISTAR', 'ROLE_ADMIN'];


  usuarios = [ 'ROLE_USUARIOS_TODOS_LISTAR*', 'ROLE_ADMIN' ];            

  ngOnInit(): void {    

  let tienePermiso = false;  

   console.log( this._us.usuario.authorities );

    this.permisos.forEach( p => {
        const encontro =  this._us.usuario.authorities.find( a => a.authority === p  )?true:false;       
        console.log( encontro );         
        tienePermiso = tienePermiso || encontro ;
     });    

  }

  // Multi value observables must manually
  // unsubscribe to prevent memory leaks.
  ngOnDestroy() {
    
  }

}
