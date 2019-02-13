import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { FuncionesGrales } from '../utiles/funciones.grales';
import { ConstantesGrales } from '../models/model.index';

@Pipe({
  name: 'filterByFecha'
})
export class FilterByFechaPipe implements PipeTransform {

  constructor( @Inject(LOCALE_ID) public locale: string) {  }

  transform( servicios: any, dia?: Date): any {

    const diaF = FuncionesGrales.formatearFecha( this.locale, dia , ConstantesGrales.FECHA_PATTERN );

    const filtrados =  servicios.filter( s  =>
    diaF == FuncionesGrales.formatearFecha( this.locale, s.servicioPK.serFechaHora, ConstantesGrales.FECHA_PATTERN )   );


    return filtrados;
  }

}
