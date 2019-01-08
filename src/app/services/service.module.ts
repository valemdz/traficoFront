import { NgModule } from '@angular/core';


import { VueltasService, DiagrService, RequestInterceptorService, TokenInterceptorService, IdaVtaListService } from './service.index';
import { ModalSiNoService } from '../shared/modal-si-no/modal-si-no.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
                VueltasService,
                DiagrService,
                IdaVtaListService,
                RequestInterceptorService,
                TokenInterceptorService,
                ModalSiNoService
             ]
})
export class ServiceModule { }
