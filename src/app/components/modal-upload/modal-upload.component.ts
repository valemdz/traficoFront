 import { Component, OnInit, OnChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
 import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
 import { ModalUploadService } from './modal-upload.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { ModalService } from 'src/app/services/service.index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

declare var swal;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
 

  imagenSubir: File = null;
  imgTemp: any;  
  deleteImagenSubscription = null;
  
  

  @ViewChild('fileNombre')
  fileNombre: ElementRef;

  constructor(  public _subirArcService: SubirArchivoService,
                public _ms: ModalUploadService,
                private http: HttpClient,
                private snackBar: MatSnackBar,
                private _modals: ModalService,
                public dialog: MatDialog ) {     
                  
  }

  ngOnInit() { 
  }
 

  cerrarModal() {

    this.imagenSubir = null;
    this.imgTemp = null;
    this.fileNombre.nativeElement.value = "";
    this._ms.ocultarModal();

  }

  seleccionImagen( archivo: File ) {

    if ( !archivo  ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
        swal('Cambio de Imagen', 'El archivo Seleccionada no es una imagen', 'error' );
        return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlTemp = reader.readAsDataURL( archivo);
    reader.onloadend = () => this.imgTemp = reader.result;

  }

  subirImagen() {           
      this._subirArcService.subirArchivo( this.imagenSubir,
                                          this._ms.url )
            .then( ( resp: any ) => {                               
                            this._modals.sendRespuesta( { nuevo:false, chofer:resp } );                            
                            this.cerrarModal();
            }).catch( err => console.log(err));
  }

  
  deleteImage(  ){    

    /*const confirmDelete = this.dialog.open( ConfirmarDeleteComponent, {
      width: '300px',
      data: { titulo:`Esta seguro que desea eliminar la imagen??`}      
    });

    confirmDelete.afterClosed().subscribe( siDelete => {      
        if(  siDelete ) {
            this.delete();
        }
    } );*/

    this.deleteImagenSubscription = this.deleteImagen$(). 
    subscribe( this.okDelete.bind( this ), this.errorDelete.bind(this) );
   
   
}

  

  deleteImagen$( ): Observable<any> {
    const url = this._ms.url;
    return this.http.delete(url).pipe(
        map( resp =>{
            this.snackBar.open( 'Imagen eliminada con exito!!!', 'X', {
              duration: 2000,
            });              
            this._modals.sendRespuesta( { nuevo:false, chofer:resp } );                            
            this.cerrarModal();              
        }),
        catchError( err => {               
            this.snackBar.open( 'Problemas al eliminar imagen!!!', 'X', {
            duration: 2000,
            });
            return throwError(err);
        })
    );
  }

    okDelete(){

    }

    errorDelete(){

    }

    ngOnDestroy(): void {
      if( this.deleteImagenSubscription ){
        this.deleteImagenSubscription.unsubscribe();
      }
    }

}
