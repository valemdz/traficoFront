import { Pipe, PipeTransform } from '@angular/core';
import { LIBRE_STR, CON_VIAJES_STR, CON_INCIDENCIAS_STR, CON_SERVICIOS_STR } from '../utiles/const-data-model';
import { FuncionesGrales } from '../utiles/funciones.grales';




@Pipe({
  name: 'choferesConEstado'
})
export class ChoferesConEstadoPipe implements PipeTransform {

  transform( choferes: any, inicio?: Date, fin?: Date ): any {

    //console.log( 'inicioT', inicio );
    //console.log( 'finT', fin );

    let choferesOcup: any = [];
    let classCho = LIBRE_STR;

    if ( choferes ) {
          for ( let cho of choferes  ) {

              classCho = LIBRE_STR;

              const incConflicto = cho.incidencias.filter( inc => inicio <= inc.fin
                &&  fin >= inc.inicio );
              if ( incConflicto && incConflicto.length > 0 )  {
                classCho = CON_INCIDENCIAS_STR;
              }

              const viajesConflicto = cho.viajes.filter( v => inicio <= v.fin
                &&  fin >= v.inicio );
              if  ( viajesConflicto && viajesConflicto.length > 0) {
                classCho = CON_VIAJES_STR;
              }              

              const servConflicto = cho.servicios.filter( serv => ( inicio <= serv.fechaHoraLlegada
                        &&  fin >= serv.fechaHoraSalida ) );
              if ( servConflicto && servConflicto.length > 0 ) {
                classCho = CON_SERVICIOS_STR;
              }

              choferesOcup.push ( {
                  choferPK: cho.choferPK,
                  choferPKStr: JSON.stringify( cho.choferPK ),
                  nombre: cho.nombre,
                  nombreConTipo: cho.nombreConTipo,
                  classCho: classCho });
              }

              FuncionesGrales.ordenamientoAscendente( choferesOcup, 'nombre' ); 
    }

    return choferesOcup;
  }

}
