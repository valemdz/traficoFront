import { Pipe, PipeTransform } from '@angular/core';
import { FuncionesGrales } from '../utiles/funciones.grales';
import { ConstantesGrales } from '../models/model.index';


@Pipe({
  name: 'choferesConEstado'
})
export class ChoferesConEstadoPipe implements PipeTransform {

   transform( choferes: any, inicio?: Date, fin?: Date ): any {   
    
    let choferesOcup: any = [];    

    if ( choferes ) {
          for ( let cho of choferes  ) {             

              let classCho = ConstantesGrales.LIBRE_STR;

              const incConflicto = cho.incidencias.filter( inc => inicio <= inc.fin
                &&  fin >= inc.inicio );
              if ( incConflicto && incConflicto.length > 0 )  {                
                classCho = ConstantesGrales.CON_INCIDENCIAS_STR;                
              }

              const viajesConflicto = cho.viajes.filter( v => inicio <= v.fin
                &&  fin >= v.inicio );
              if  ( viajesConflicto && viajesConflicto.length > 0) {
                classCho = ConstantesGrales.CON_VIAJES_STR;                
              }              

              const servConflicto = cho.servicios.filter( serv => ( inicio <= serv.fechaHoraLlegada
                        &&  fin >= serv.fechaHoraSalida ) );
              if ( servConflicto && servConflicto.length > 0 ) {
                classCho = ConstantesGrales.CON_SERVICIOS_STR;                
              }              

              choferesOcup.push ( {
                  choferPK: cho.choferPK,
                  choferPKStr: JSON.stringify( cho.choferPK ),
                  nombre: cho.nombre,
                  nombreConTipo: cho.nombreConTipo,
                  idaux: cho.cho_id_aux,
                  classCho: classCho });
        }

        FuncionesGrales.ordenamientoAscendente( choferesOcup, 'nombre' ); 
    }

    return choferesOcup;
  }

}
