import { Injectable } from '@angular/core';
import{ FormGroup, FormControl, FormArray } from '@angular/forms';
import { AlertService } from '../mensajes/alert.service';
import swal from 'sweetalert';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class  ErrorService {

  constructor( private alertService: AlertService,
    private snackBar: MatSnackBar ) {
  }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
          const control = formGroup.get(field);
          if (control instanceof FormControl) {
             control.markAsDirty({ onlySelf: true });
          } else if (control instanceof FormGroup) {
             this.validateAllFormFields(control);
          } else if( control instanceof FormArray ) {
            for( var i:number=0; i <  control.length; i++ ){
              this.validateAllFormFields(<FormGroup>control.controls[i]);
            }
          }
        });
    }

     checkFormValidity(form: FormGroup, errMsgs, translations, data?: any ){
        for( let k in errMsgs ) {
          errMsgs[k] = [];

          if(   form.controls[k].errors &&  form.controls[k].dirty ) {
            for( let e in  form.controls[k].errors ) {
              if( translations[k][e] ) {
                errMsgs[k].push( translations[k][e] );
              }
            }
          }
        }
      }

      checkFormValidityUnControl( nombreControl, form: FormGroup, errMsgs, translations, data?: any ){

          errMsgs[ nombreControl ] = [];
          if (   form.controls[nombreControl].errors &&  form.controls[nombreControl].dirty ) {
            for ( let e in  form.controls[nombreControl].errors ) {
              if ( translations[nombreControl][e] ) {
                errMsgs[nombreControl].push( translations[nombreControl][e] );
              }
            }
          }

      }

    tratarErroresBackEnd(err, form: FormGroup, errMsgs) {

      this.limpiarErrores();
      //this.error( this.tratarErroresHttpBackEndArray( err, form, errMsgs));

      this.tratarErroresHttpBackEndArray( err, form, errMsgs)
    }

    tratarErroresHttpBackEndArray( err, form: FormGroup, errMsgs ) {

          let errores =[];
          const data = err.error;

          if( err.status == 500 ){
            errores.push(' Error interno 500 comuniquese con el administrador! ');
          }else if( err.status == 0){
            errores.push(' NO es posible comunicarse con el back end! ');
          }else if ( err.status == 401 ){
            errores.push(' Su sesion ha caducado ');
          }else if( err.status == 403 ){  
            console.log('PASO POR 403');
            errores.push(' Usted no tiene permiso para acceder a la pagina ');
          } else if( err.status == 404 ){
            if( data['errorCode'] ){
              errores.push( data['errorMessage']);
            }
          }else if( err.status == 400 ){
            //bad request todo lo que tiene que ver con validaciones
            /* puede ser este objeto
              {"errorCode": "Sql Erroneo",
                "errorMessage": "Regla de integridad ConstraintCVP.HRS_CHO1_FK" }

              ooo el objeto enviado con sus respectivas validaciones por campos
            */
            if( data['errorCode'] ){
              errores.push( data['errorMessage']);

            }else{
              for (let fieldName in data) {

                const serverErrors = data[fieldName];

                let control = form.get(fieldName);
                if( control && errMsgs[fieldName] ){
                  errMsgs[fieldName].push( serverErrors );
                  control.markAsDirty();
                }else{
                  errores.push( fieldName + ' - ' + serverErrors );
                }
              }
            }


          }else if ( err.status == 409 ) {

            console.log( data );
            if( data['errorCode'] ){
              errores.push( data['errorMessage']);
            }
          }else{
            errores.push(' Error Desconocido comuniquese con el administrador! ');
          }

          //return errores;
          this.mostrarError( errores );
    }

  tratarErroresEliminaciones(err) {
    this.tratarErroresBackEnd( err, null, null);
  }

    /*error( messages ) {
      this.alertService.clear();
      if( messages ){
        for(let mge of messages ) {
            this.alertService.error(mge);
        }
      }
    }*/

    limpiarErrores(){
        this.alertService.clear();
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    tratarErroresBackEndLista(err, erroresGral){

      if( erroresGral ){ erroresGral.length = 0; }
      else { erroresGral=[]; }

      const data = err.error;

      if( err.status == 500 ){
        erroresGral.push(' Error interno 500 comuniquese con el administrador! ');
      }else if( err.status == 0){
        erroresGral.push(' NO es posible comunicarse con el back end! ');
      }else if ( err.status == 401 ){
        erroresGral.push(' Su sesion ha caducado ');
      } else if( err.status == 404 ){
        if( data['errorCode'] ){
          erroresGral.push( data['errorMessage']);
        }
      } else if( err.status == 403) {

      }else if( err.status == 400 ){
        if( data['errorCode'] ){
          erroresGral.push( data['errorMessage']);
        }
      }else if ( err.status == 409 ) {
        if( data['errorCode'] ){
          erroresGral.push( data['errorMessage']);
        }
      }else if( err.status == 405 ){
          if( data['errorCode'] ){
            erroresGral.push( data['errorMessage'] );
          }
      }else{
        erroresGral.push(' Error Desconocido comuniquese con el administrador! ');
      }

      this.mostrarError( erroresGral );
}


    tratarErrores(err, form: FormGroup, erroresGral, translationsGral){

      if( erroresGral ){ erroresGral.length = 0; }
      else { erroresGral=[]; }      

      if( err.status == 500 ){
        erroresGral.push(' Error interno 500 comuniquese con el administrador! ');
      }else if( err.status == 0){
        erroresGral.push(' NO es posible comunicarse con el back end! ');
      }else if ( err.status == 401 ){
        erroresGral.push(' Su sesion ha caducado ');
      }else if ( err.status == 409 ) {
          const data = err.error;
          if ( form && data ) {

            for (let fieldName in data) {

              const serverErrors = data[fieldName];
              const errors = {};

              for (let serverError of serverErrors) {
                errors[serverError] = true;
              }

              let control = form.get(fieldName);
              if( control ){
                control.setErrors(errors);
                control.markAsDirty();
              }else{
                for (let serverError of serverErrors) {
                  erroresGral.push(translationsGral[serverError]);

                }
              }
            }
          }
      }else{
        erroresGral.push(' Error Desconocido comuniquese con el administrador! ');
      }

      this.mostrarError( erroresGral );
  }

  mostrarError( errores ){
    if(  errores && errores.length > 0 ) {
         let mensajes = '';
         errores.forEach( e => mensajes = mensajes + e );
        // swal('Error', mensajes,'error');
        this.snackBar.open( 'Error!!! ' + mensajes , 'X', {
          duration: 5000,
        });
    }
  }

}
