import { Injectable, EventEmitter } from '@angular/core';
import { ModalSiNo } from 'src/app/models/modalSiNo.model';

@Injectable()
export class ModalSiNoService {
  public idLlamada: string;
  public mensaje: ModalSiNo;
  public oculto: string = 'oculto';

  public notificacionSiNO = new EventEmitter<any>();


  constructor() {    
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.mensaje = null; 
  }

  mostraModal ( mensaje: ModalSiNo, idLlamada: string='' ) {      
      this.oculto = '';  
      this.mensaje = mensaje;    
      this.idLlamada = idLlamada;
  }

  notificarSi(){
    this.notificacionSiNO.emit( { acepto: true, idLlamada: this.idLlamada} );
    this.ocultarModal();
  }

  notificarCancelar(){
    this.notificacionSiNO.emit( { acepto: false, idLlamada: this.idLlamada} );
    this.ocultarModal();
  }
  
}
