import { Pipe, PipeTransform } from '@angular/core';
import { CHOFER_LIBRE_STR, CHOFER_CON_VIAJES_STR, CHOFER_CON_INCIDENCIAS_STR, CHOFER_CON_SERVICIOS_STR } from '../utiles/const-data-model';
import { FuncionesGrales } from '../utiles/funciones.grales';



@Pipe({
  name: 'choferesConEstado'
})
export class ChoferesConEstadoPipe implements PipeTransform {

  transform( choferes: any, inicio?: Date, fin?: Date ): any {

    //console.log( 'inicioT', inicio );
    //console.log( 'finT', fin );

    let choferesOcup: any = [];
    let classCho = CHOFER_LIBRE_STR;

    if ( choferes ) {
          for ( let cho of choferes  ) {

              classCho = CHOFER_LIBRE_STR;

              const viajesConflicto = cho.viajes.filter( v => inicio <= v.fin
                &&  fin >= v.inicio );
              if  ( viajesConflicto && viajesConflicto.length > 0) {
                classCho = CHOFER_CON_VIAJES_STR;
              }

              const incConflicto = cho.incidencias.filter( inc => inicio <= inc.fin
                &&  fin >= inc.inicio );
              if ( incConflicto && incConflicto.length > 0 )  {
                classCho = CHOFER_CON_INCIDENCIAS_STR;
              }

              const servConflicto = cho.servicios.filter( serv => ( inicio <= serv.fechaHoraLlegada
                        &&  fin >= serv.fechaHoraSalida ) );
              if ( servConflicto && servConflicto.length > 0 ) {
                classCho = CHOFER_CON_SERVICIOS_STR;
              }

              choferesOcup.push ( {
                  choferPK: cho.choferPK,
                  choferPKStr: JSON.stringify( cho.choferPK ),
                  nombre: cho.nombre,
                  nombreConTipo: cho.nombreConTipo,
                  classCho: classCho });
              }
    }

    return choferesOcup;
  }

}
