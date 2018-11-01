import { Injectable } from '@angular/core';
import{ FormGroup, FormControl, FormArray } from '@angular/forms';
import { IfStmt } from '@angular/compiler';



@Injectable()
export class  ErrorService {

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
          if(   form.controls[nombreControl].errors &&  form.controls[nombreControl].dirty ) {
            for( let e in  form.controls[nombreControl].errors ) {
              if( translations[nombreControl][e] ) {
                errMsgs[nombreControl].push( translations[nombreControl][e] );
              }
            }
          }

      }

      tratarErroresBackEnd(err, form: FormGroup, erroresGral, errMsgs){

          erroresGral.length = 0;

          const data = err;

          if( err.status == 500 ){
            erroresGral.push(' Error interno 500 comuniquese con el administrador! ');
          }else if( err.status == 0){
            erroresGral.push(' NO es posible comunicarse con el back end! ');
          }else if ( err.status == 401 ){
            erroresGral.push(' Usuario o contraseña incorrecta ');
          } else if( err.status == 404 ){
            if( data['errorCode'] ){
              erroresGral.push( data['errorMessage']);
            }
          }else if( err.status == 400 ){
            //bad request todo lo que tiene que ver con validaciones
            /* puede ser este objeto
              {"errorCode": "Sql Erroneo",
                "errorMessage": "Regla de integridad ConstraintCVP.HRS_CHO1_FK" }

              ooo el objeto enviado con sus respectivas validaciones por campos
            */
            if( data['errorCode'] ){
              erroresGral.push( data['errorMessage']);

            }else{
              for (let fieldName in data) {

                const serverErrors = data[fieldName];

                let control = form.get(fieldName);
                if( control ){
                  errMsgs[fieldName].push( serverErrors );
                  control.markAsDirty();
                }else{
                    erroresGral.push(serverErrors);
                }
              }
            }


          }else if ( err.status == 409 ) {
            if( data['errorCode'] ){
              erroresGral.push( data['errorMessage']);
            }
          }else{
            erroresGral.push(' Error Desconocido comuniquese con el administrador! ');
          }

    }

    tratarErroresBackEndLista(err, erroresGral){

      erroresGral.length = 0;

      const data = err;

      if( err.status == 500 ){
        erroresGral.push(' Error interno 500 comuniquese con el administrador! ');
      }else if( err.status == 0){
        erroresGral.push(' NO es posible comunicarse con el back end! ');
      }else if ( err.status == 401 ){
        erroresGral.push(' Usuario o contraseña incorrecta ');
      } else if( err.status == 404 ){
        if( data['errorCode'] ){
          erroresGral.push( data['errorMessage']);
        }
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

}

    tratarErrores(err, form: FormGroup, erroresGral, translationsGral){

      erroresGral.length = 0;

      if( err.status == 500 ){
        erroresGral.push(' Error interno 500 comuniquese con el administrador! ');
      }else if( err.status == 0){
        erroresGral.push(' NO es posible comunicarse con el back end! ');
      }else if ( err.status == 401 ){
        erroresGral.push(' Usuario o contraseña incorrecta ');
      }else if ( err.status == 409 ) {
          const data = err;
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

  }

      tratarErroresEliminaciones(err):string{

          let mensajeMostrar = '';

          const data = err;

          if( err.status == 500 ){
            mensajeMostrar = ' Error interno 500 comuniquese con el administrador! ';
          }else if( err.status == 0){
            mensajeMostrar = ' NO es posible comunicarse con el back end! ';
          }else if ( err.status == 401 ){
            mensajeMostrar = ' Usuario o contraseña incorrecta ';
          } else if( err.status == 404 ){
            if( data['errorCode'] ){
              mensajeMostrar =  data['errorMessage'];
            }
          }else if( err.status == 400 ){
            //bad request todo lo que tiene que ver con validaciones
            /* puede ser este objeto
              {"errorCode": "Sql Erroneo",
                "errorMessage": "Regla de integridad ConstraintCVP.HRS_CHO1_FK" }
            */
            if( data['errorCode'] ){
              mensajeMostrar = data['errorMessage'];

            }

          }else if ( err.status == 409 ) {
            if( data['errorCode'] ){
              mensajeMostrar =  data['errorMessage'];
            }
          }else{
              mensajeMostrar = ' Error Desconocido comuniquese con el administrador! ';
          }

          return mensajeMostrar;
      }


}
