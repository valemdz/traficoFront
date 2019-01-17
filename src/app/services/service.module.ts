import { NgModule } from '@angular/core';


import { VueltasService, 
         DiagrService, 
         RequestInterceptorService, 
         TokenInterceptorService, 
         IdaVtaListService, 
         LoginGuardGuard, 
         AlertService,
         ErrorService,
         RespuestaModalService,
         IncidenciaService,
         VehiculoService,
         ViajeEspServive,
         ModalService,
         ChoferService,
         ModalSiNoService,
         UsuarioService,
         LoaderService} from './service.index';
         


@NgModule({
  imports: [],
  declarations: [],
  providers: [
                VueltasService,
                DiagrService,
                IdaVtaListService,
                RequestInterceptorService,
                TokenInterceptorService,
                ModalSiNoService, 
                ChoferService,
                IncidenciaService,
                UsuarioService,
                LoginGuardGuard,
                AlertService,
                ErrorService,
                LoaderService,
                RespuestaModalService,
                VehiculoService,
                ViajeEspServive,
                ModalService
             ]
})
export class ServiceModule { }
