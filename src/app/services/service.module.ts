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
         VehiculoService} from './service.index';
         
import { ModalSiNoService } from '../shared/modal-si-no/modal-si-no.service';
import { ChoferService } from './choferes/chofer.service';
import { UsuarioService } from './usuario/usuario.service';
import { LoaderService } from './mensajes/loader.service';


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
                VehiculoService
             ]
})
export class ServiceModule { }
