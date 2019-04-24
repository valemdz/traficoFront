import { NgModule } from '@angular/core';


import { VueltasService, 
         DiagrService, 
         RequestInterceptorService, 
         TokenInterceptorService, 
         IdaVtaListService, 
         LoginGuardGuard, 
         AlertService,
         ErrorService,         
         IncidenciaService,
         VehiculoService,
         ViajeEspServive,
         ModalService,
         ChoferService,
         ModalSiNoService,
         UsuarioService,
         LoaderService,
         VencimientoService,
         PaginationService,
         ErrorsHandler,
         PermisoService,
         SubirArchivoService,
         ModalUploadService} from './service.index';
         


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
                VehiculoService,
                ViajeEspServive,
                ModalService,
                VencimientoService,
                PaginationService,
                ErrorsHandler,
                PermisoService,
                SubirArchivoService,
                ModalUploadService
             ]
})
export class ServiceModule { }
