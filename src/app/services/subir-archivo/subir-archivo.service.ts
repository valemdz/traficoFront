import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class SubirArchivoService {

  
  constructor() { }


  subirArchivo( archivo: File, urlUpload:string ) {


    let formData = new FormData();
    let xhr = new XMLHttpRequest();

    formData.append( 'archivo', archivo, archivo.name );

    return new Promise( ( resolve , reject ) => {

      xhr.onreadystatechange =  function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log('Se subio con exito!!!');
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('Problemas al subir ');
            reject( xhr.response );
          }
        }
      }

      const url = urlUpload;      
      xhr.open('PUT', url, true );
      xhr.send( formData );
    });

  }

  /*subirArchivo( archivo: File, tipo: string, id: string ) {


    let formData = new FormData();
    let xhr = new XMLHttpRequest();

    formData.append( 'imagen', archivo, archivo.name );

    return new Promise( ( resolve , reject ) => {

      xhr.onreadystatechange =  function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log('Se subio con exito!!!');
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('Problemas al subir ');
            reject( xhr.response );
          }
        }
      }

      const url = this.urlBackend + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true );
      xhr.send( formData );
    });

  }*/

}
