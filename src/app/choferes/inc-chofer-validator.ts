import { AbstractControl  } from '@angular/forms';
import * as moment from 'moment';  

//import {IncByChoferComponent} from './inc-by-chofer/inc-by-chofer.component';

export class IncChoferValidator {


    static createValidator( ) {           

        return (AC: AbstractControl) => {              
            
            if(  AC.get('fInicio').value && AC.get('hInicio').value 
                 && AC.get('fFin').value && AC.get('hFin').value  ){                             
                
                let fInicio = moment( AC.get('fInicio').value + ' ' + AC.get('hInicio').value, 'YYYY-MM-DD HH:mm'); 
                let fFin = moment( AC.get('fFin').value + ' ' + AC.get('hFin').value , 'YYYY-MM-DD HH:mm');               
                     
                if( fInicio <  fFin){                    
                    AC.get('fFin').setErrors( null );
                    AC.get('fFin').markAsPristine();                                      
                    return null;             
                } else{                   
                    AC.get('fFin').setErrors( {fechaInc: true} );
                    AC.get('fFin').markAsDirty();                    
                    return ({'fechaInc': true});
                }            
                
            } else{
                return null;
            }   
        }
    
    }


}    
