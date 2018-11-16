import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { FECHA_PATTERN } from '../utiles/const-data-model';
import { FuncionesGrales } from '../utiles/funciones.grales';

@Pipe({
  name: 'serMayoIgual'
})
export class SerMayoIgualPipe implements PipeTransform {

  //constructor( @Inject(LOCALE_ID) public locale: string) {  }

  transform(servicios: any, dia?: Date): any {

    const filtrados =  servicios.filter( s  =>
    dia <   s.servicioPK.serFechaHora );

    return filtrados;
  }

}
