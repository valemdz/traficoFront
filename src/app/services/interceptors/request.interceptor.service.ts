import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoaderService } from '../mensajes/loader.service';





@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  private started;

  constructor(  private loaderService: LoaderService, private router: Router ){
    console.log('RequestInterceptorService');
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const successCallback = this.interceptResponse.bind(this);
    const errorCallback = this.catchError.bind(this);
    const interceptionOperator = tap<HttpEvent<any>>(
      successCallback,
      errorCallback
    );
    this.loaderService.display(true);
    this.started = Date.now();
    const handledRequest = next.handle(req);
    return handledRequest.pipe(interceptionOperator);
  }

  private interceptResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      const elapsed_ms = Date.now() - this.started;
      console.log(`Request for ${event.url} took ${elapsed_ms} ms.`);
      this.loaderService.display(false);
    }
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    this.loaderService.display(false);       
    if( err.status === 401 ){
       if( err.url === environment.originLogin ){
          console.log("Not authorized Por Login");
       }else{          
          this.router.navigate(['/login']);
       }
    } else {
      console.warn(err.statusText);
    }    
  }
  
}
