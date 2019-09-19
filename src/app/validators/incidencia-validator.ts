import { AbstractControl  } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';


import { IncidenciaService } from 'src/app/services/service.index';
import { IncidenciaComponent } from '../pages/incidencias/incidencia/incidencia.component';


export class IncidenciaValidator {

  private timeout;

  static createValidator( incidenciaService:IncidenciaService,  incid: IncidenciaComponent) {

    return (AC: AbstractControl) => {

        if( AC.get('codigo').value && AC.get('empresa').value && AC.get('tipo').value
            && !incid.incidencia.id  ){

            incidenciaService.checkCodigoIncidencia$( AC.get('empresa').value , AC.get('tipo').value, AC.get('codigo').value )
            .subscribe(flag => {
                if (flag === true) {
                  AC.get('codigo').setErrors( {codigoTomado: true} );
                  AC.get('codigo').markAsDirty();
                  incid.checkFormValidity();
                  return ({'codigoTomado': true});
                } else {
                  AC.get('codigo').markAsPristine();
                  AC.get('codigo').setErrors( null );
                  incid.checkFormValidity();
                  return null;
                }
              },
              (err) => {
                console.log(err);
              }
            );
        } else{
            return null;
        }
    }

  }

}
