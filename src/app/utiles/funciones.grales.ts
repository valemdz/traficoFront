import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { HttpParams } from '../../../node_modules/@angular/common/http';
import { PaginationPropertySort } from '../shared/pagination';

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


}
