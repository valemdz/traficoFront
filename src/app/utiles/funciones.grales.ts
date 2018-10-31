import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { HttpParams } from '../../../node_modules/@angular/common/http';
import { PaginationPropertySort } from '../shared/pagination';

export class FuncionesGrales{

    public static toFecha( fecha ){
        let f = null;
        if( !( fecha === null || fecha === '' ) ){
          f = moment( fecha,  'YYYY-MM-DD' ).format() as any;
        }
        return f;
    }

    public static fromFecha(  locale: string, fecha ){
      let dp = new DatePipe( locale );
      let f = dp.transform( fecha, 'yyyy-MM-dd');
      return f;
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
