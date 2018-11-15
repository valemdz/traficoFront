import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { FECHA_PATTERN } from '../utiles/const-data-model';
import { FuncionesGrales } from '../utiles/funciones.grales';

@Pipe({
  name: 'filterByFecha'
})
export class FilterByFechaPipe implements PipeTransform {

  constructor( @Inject(LOCALE_ID) public locale: string) {  }

  transform( servicios: any, dia?: Date): any {

    const diaF = FuncionesGrales.formatearFecha( this.locale, dia , FECHA_PATTERN );

    const filtrados =  servicios.filter( s  =>
    diaF == FuncionesGrales.formatearFecha( this.locale, s.servicioPK.serFechaHora, FECHA_PATTERN )   );


    return filtrados;
  }

}
