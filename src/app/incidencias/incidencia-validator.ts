import { Injectable } from '@angular/core';
import {IncidenciaService} from './incidencia.service';
import { AbstractControl  } from '@angular/forms';

import 'rxjs/add/operator/toPromise';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

import {IncidenciaComponent } from './incidencia/incidencia.component';


export class IncidenciaValidator {

  private timeout;  

  static createValidator( incidenciaService:IncidenciaService,  incid: IncidenciaComponent) {

    return (AC: AbstractControl) => {          

        if( AC.get('codigo').value && AC.get('in_empresa').value && AC.get('in_tipo').value
            && incid.nuevo  ){  
            
            incidenciaService.checkCodigoIncidencia( AC.get('in_empresa').value , AC.get('in_tipo').value, AC.get('codigo').value )
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