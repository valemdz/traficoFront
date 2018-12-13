import { NgModule } from '@angular/core';


import { VueltasService, DiagrService, RequestInterceptorService, TokenInterceptorService, IdaVtaListService } from './service.index';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
                VueltasService,
                DiagrService,
                IdaVtaListService,
                RequestInterceptorService,
                TokenInterceptorService
             ]
})
export class ServiceModule { }
