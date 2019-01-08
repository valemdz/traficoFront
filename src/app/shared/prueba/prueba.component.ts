import { Component, OnInit, Inject, LOCALE_ID, ViewChild, ElementRef, AfterViewInit, ViewChildren, OnDestroy } from '@angular/core';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';
import { DiagrService, VueltasService } from 'src/app/services/service.index';
import { ChoferesConEstadoPipe } from 'src/app/pipes/choferes-con-estado.pipe';
import { ModalSiNoService } from '../modal-si-no/modal-si-no.service';
import { ModalSiNo } from 'src/app/models/modalSiNo.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
  providers: [ ChoferesConEstadoPipe ]
})
export class PruebaComponent implements OnInit, AfterViewInit, OnDestroy  {
 

  mensaje:ModalSiNo;
  subs:Subscription;

  resultado = {"2":[" En Viaje Especial  Desde 29/11/2018 12:30 Hasta 30/11/2018 12:00","Ocupado en el servicio IMQ 125 30/11/2018 12:00/0","Ocupado en el servicio IMQ 100 30/11/2018 15:00/0"],"(CHO)VALERIa":[" Con Incidencia ENFERMEDAD Desde 30/11/2018 01:00 Hasta 03/12/2018 18:30","Ocupado en el servicio IMQ 100 30/11/2018 15:00/0"]};
 
  constructor( public _vs: VueltasService,     
      private yo: MiUsuarioService,   
      public _ms: ModalSiNoService,   
      @Inject(LOCALE_ID) public locale: string ) {     

     
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit() {   
    
    let mensajes: string [] = [];

    for ( let clave in this.resultado ) {
        console.log( clave );
        mensajes.push( clave + ":");
        for( let mje of this.resultado[ clave] ){
            mensajes.push( `     ${mje}` );
        }
    }

    console.log( mensajes );

    this.mensaje = {    
      title:"Conflicto con Choferes y Vehiculos",      
      messages:mensajes,      
    };

    this.escucharModalSino();
  
  }  

  abrirModalSiNo() {
    this._ms.mostraModal( this.mensaje );    
  }

  escucharModalSino(){
      this.subs = this._ms.notificacionSiNO.subscribe( resultado => {
          console.log('resultado ' , resultado);
      });
  }

  ngOnDestroy(): void {
    if( this.subs ){ this.subs.unsubscribe(); }
  } 


}
