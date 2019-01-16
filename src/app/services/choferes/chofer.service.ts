import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { PaginationPropertySort } from 'src/app/shared/pagination';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { Chofer } from 'src/app/domain';


@Injectable()
export class ChoferService {

    private urlBase = environment.origin;

    /* private headers = new Headers({'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'}); */

    constructor( private http: HttpClient ) {
    }

    findChoferes$( page: number, pageSize: number, sort: PaginationPropertySort, cho_emp_codigo: String ): Observable<any> {
      const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}`;
      const params = FuncionesGrales.toParams( page, pageSize, sort );
      return this.http.get( url , params);
    }

    
    findVencimientos$(cho_emp_codigo: String ): Observable<any> {
         const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/VencimientoCarnets`;
         return this.http.get(url);
    }



    viewChofer$(id: number): Observable<any> {
        const url = this.urlBase + `/chofer/${id}`;
        return this.http.get( url );
    }

    getChofer$(id: number): Observable<any> {
        const url = this.urlBase + `/chofer/${id}`;
        return this.http.get( url );
    }


    update$( chofer: Chofer ) {
        const url = this.urlBase + `/choferes/empresa/${chofer.choferPK.cho_emp_codigo}/codigo/${chofer.choferPK.cho_codigo}`;
        return this.http.put( url, chofer );
    }

    create$( chofer: Chofer ): Observable<any> {
        const url = this.urlBase + `/choferes`;
        return this.http.post( url, chofer );
    }

   deleteChofer$( cho_emp_codigo: String ,  cho_codigo: number ): Observable<any> {
        const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/codigo/${cho_codigo}`;
        return this.http.delete(url);
   }

   saveIncidenciasByChofer$( cho_emp_codigo: String, cho_codigo: number, incidencias: any ) {
        const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/codigo/${cho_codigo}/incidencias`;
        return this.http.put(url, incidencias );
   }

   getIncidenciasByChofer$( cho_emp_codigo: String, cho_codigo: number ): Observable<any> {
        const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/codigo/${cho_codigo}/incidencias`;
        return this.http.get(url);
   }

   getCarnetsByChofer$( cho_emp_codigo: String, cho_codigo: number ): Observable<any> {
        const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/codigo/${cho_codigo}/carnets`;
        return this.http.get(url);
   }

   saveCarnetsByChofer$( cho_emp_codigo: String, cho_codigo: number, listaCarnets: any ){
        const url = this.urlBase + `/choferes/empresa/${cho_emp_codigo}/codigo/${cho_codigo}/carnets`;
        return this.http.put( url, listaCarnets);
   }

}
