import { Pipe, PipeTransform } from '@angular/core';
import { Chofer } from '../models/model.index';
import { ChoferService } from '../services/service.index';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform { 

  constructor( private choferService: ChoferService ){ }  

  transform( chofer: Chofer , tipo: string= 'choferes' ): any {     
    var urlImagen = '';    
    if( chofer.foto === null ){
      urlImagen ='assets/img/no-img.jpg';
    } else{   
      urlImagen =  this.choferService.getUrlImagenChofer( chofer );
    }     
    return urlImagen;
  }
  
}
