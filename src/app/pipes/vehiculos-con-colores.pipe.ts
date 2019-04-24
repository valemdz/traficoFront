import { Pipe, PipeTransform } from '@angular/core';
import { ConstantesGrales } from '../models/model.index';


@Pipe({
  name: 'vehiculosConColores'
})
export class VehiculosConColoresPipe implements PipeTransform {

  transform( vehiculos: any, inicio?: Date, fin?: Date ): any {  

    let vehiOcup: any = [];
    let classObj = ConstantesGrales.LIBRE_STR;

    if ( vehiculos ) {
          for ( let vehi of vehiculos  ) {            

              classObj = ConstantesGrales.LIBRE_STR;

              const incConflicto = vehi.incidencias.filter( inc => inicio <= inc.fin
                                                            &&  fin >= inc.inicio );
              if ( incConflicto && incConflicto.length > 0 )  {
                classObj = ConstantesGrales.CON_INCIDENCIAS_STR;
              }

              const viajesConflicto = vehi.viajes.filter( v => inicio <= v.fin
                &&  fin >= v.inicio );
              if  ( viajesConflicto && viajesConflicto.length > 0) {
                classObj = ConstantesGrales.CON_VIAJES_STR;
              }              

              const servConflicto = vehi.servicios.filter( serv => ( inicio <= serv.fechaHoraLlegada
                        &&  fin >= serv.fechaHoraSalida ) );
              if ( servConflicto && servConflicto.length > 0 ) {
                classObj = ConstantesGrales.CON_SERVICIOS_STR;
              }

              vehiOcup.push ( {
                  vehiculoPK: vehi.vehiculoPK,
                  vehiculoPKStr: JSON.stringify( vehi.vehiculoPK ),                  
                  interno: vehi.vehiculoPK.vehInterno,
                  classObj: classObj });                

          }
    }

    return vehiOcup;
  }


}
