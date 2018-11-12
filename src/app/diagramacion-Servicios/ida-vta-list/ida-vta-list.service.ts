import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class IdaVtaListService {

  private urlBase = environment.origin;

  constructor( private http: HttpClient ) {  }

  getLineasByEmpresa$( idEmpresa: string ): Observable<any> {
     const url = this.urlBase + `/empresa/${idEmpresa}/lineas`;
     return this.http.get( url );
  }

  getEnlacesLineasByEmpresa$( idEmpresa: string, params ): Observable<any> {
    const url = this.urlBase + `/empresa/${idEmpresa}/enlaceLineas`;
    return this.http.get( url, params) ;
  }

  saveEnlaceLineas$( enlace: any ): Observable<any> {
    const url = this.urlBase + `/enlaceLineas`;
    return this.http.post( url, enlace);
  }

  deleteEnlaceLineas$( idEnlace ): Observable<any> {
    const url = this.urlBase + `/enlaceLineas/${idEnlace}`;
    return this.http.delete( url );
  }

}
