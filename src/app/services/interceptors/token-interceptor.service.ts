import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {


  constructor( ) {

  }

  private get token(): String{
    /*let token = '';
    if( this.store.usuario && this.store.usuario.token ){
      token = this.store.usuario.token;
    }
    return token;*/

    let token = '';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if ( currentUser ) {
        token = currentUser.token;
    }
    return token;
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorizationReq = this.setAuthHeader(req);
    const handledRequest = next.handle(authorizationReq);
    return handledRequest;
  }

  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const authToken = 'Bearer ' + this.token;
    const headers = req.headers.set('X-Authorization', authToken);
    const authorizedReq = req.clone({ headers });
    return authorizedReq;
  }


}
