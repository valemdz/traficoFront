import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {
 
  public oculto: string = 'oculto';
  public url:string='';

  public notificacion = new EventEmitter<any>();


  constructor() {
    
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.url = null;    
  }

  mostraModal( url ) {
      this.oculto = '';
      this.url = url;      
  }

}
