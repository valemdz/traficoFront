import { VehiculoService } from "../services/service.index";
import { AbstractControl } from "@angular/forms";
import { VehiculoComponent } from "../pages/vehiculos/vehiculo/vehiculo.component";


export class VehiculoCodigoValidator{

    static createValidator( _vs: VehiculoService, vehComp: VehiculoComponent ){
        
        return (AC: AbstractControl) => {

            if( vehComp.vehiculo && vehComp.vehiculo.vehiculoPK.vehInterno <=0 
                && AC.get('vehiculoPK.vehEmpCodigo').value 
                && AC.get('vehiculoPK.vehInterno').value ){

                _vs.checkExisteVehiculo$( AC.get('vehiculoPK.vehEmpCodigo').value , 
                    AC.get('vehiculoPK.vehInterno').value )
                .subscribe(flag => {
                    if (flag === true) {
                        AC.get('vehiculoPK.vehInterno').setErrors( {codigoTomado: true} );
                        AC.get('vehiculoPK.vehInterno').markAsDirty();
                        vehComp.checkTodoFormValidity();
                        return ({'codigoTomado': true});
                    } else {
                        AC.get('vehiculoPK.vehInterno').markAsPristine();
                        AC.get('vehiculoPK.vehInterno').setErrors( null );
                        vehComp.checkTodoFormValidity();
                        return null;
                    }
                    },
                    (err) => {
                    console.log(err);
                    }
                ); 
            }
           
        }

    }

}