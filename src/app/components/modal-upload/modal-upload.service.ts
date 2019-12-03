import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {
 
  public oculto: string = 'oculto';
  public url:string='';
  public titulo:string='';
  public imgDefault = 'assets/img/no-img.jpg';
  public existe: boolean = false;

  public notificacion = new EventEmitter<any>();

  constructor() {    
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.url = null; 
    this.existe = false;   
  }

  mostraModal( url, titulo, existe = false ) {
      this.oculto = '';
      this.url = url;      
      this.titulo = titulo;
      this.existe = existe;
  }

  getUrlImagenMostrar(){
    if( this.existe && this.url !== null ){
      return this.url;
    }
    return this.imgDefault;
  }
 

}
