 import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
 import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
 import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
 

  imagenSubir: File = null;
  imgTemp: any;  

  @ViewChild('fileNombre')
  fileNombre: ElementRef;

  constructor(  public _subirArcService: SubirArchivoService,
                public _ms: ModalUploadService ) {     
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
                            this._ms.notificacion.emit( resp );                            
                            this.cerrarModal();
            }).catch( err => console.log(err));
  }

}
