import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {
 
  public oculto: string = 'oculto';
  public url:string='';
  public titulo:string='';

  public notificacion = new EventEmitter<any>();

  constructor() {    
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.url = null;    
  }

  mostraModal( url, titulo ) {
      this.oculto = '';
      this.url = url;      
      this.titulo = titulo;
  }  

}
