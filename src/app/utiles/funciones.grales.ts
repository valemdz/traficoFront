import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { HttpParams } from '../../../node_modules/@angular/common/http';
import { PaginationPropertySort } from '../shared/pagination';
import { CHOFER } from './const-data-model';

export class FuncionesGrales {

    public static toFecha( fecha: string, pattern: string ): Date {
        let f = null;
        if ( !( fecha == null || fecha === '' ) ) {
          f = moment( fecha, pattern ).toDate();
        }
        return f;
    }

    public static fromFecha(  locale: string, fecha: Date, pattern: string ): string {
      let dp = new DatePipe( locale );
      let f = dp.transform( fecha, pattern);
      return f;
    }

    public static formatearFecha( locale: string, valueFecha: any,  pattern: string ): string {
      const dp = new DatePipe( locale );
      return dp.transform( valueFecha, pattern );
    }

    public static getMes(  locale: string, fecha ){
      let dp = new DatePipe( locale );
      let f = dp.transform( fecha, 'M');
      return f;
    }

    public static getMesStr(  locale: string, fecha ){
      let dp = new DatePipe( locale );
      let f = dp.transform( fecha, 'MMMM');
      return f;
    }

    public static toParams( page: number, pageSize: number, sort: PaginationPropertySort ){

      let params = new HttpParams()
      .set('size', `${pageSize}`)
      .set('page', `${page}`);

      if (sort != null) {
          params = params.append('sort', `${sort.property},${sort.direction}`);
      }
      return {params};
  }

  public static getTipoChoferStr( tipoChofer ): string {
     if ( tipoChofer === CHOFER ) {
        return 'CHO';
     }
     return 'AUX';
  }

  public static diffDias( inicio: Date, fin: Date ) {
    const fechaInicio = inicio.getTime();
    const fechaFin = fin.getTime();
    const diff = fechaFin - fechaInicio;
    return (diff / ( 1000 * 60 * 60 * 24 ));
  }


}
