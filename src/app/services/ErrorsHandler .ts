import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable()
export class ErrorsHandler implements ErrorHandler {

  constructor( private injector: Injector ) { }

  handleError(error: Error | HttpErrorResponse) {   
    if(  error instanceof Error  ) {      
      console.error('Error Capturado ', error);

      const router = this.injector.get(Router);
      //router.navigate(['/error'], { queryParams: {error: error} });
      router.navigate(['/wellcome']);
    } 
  }  

}