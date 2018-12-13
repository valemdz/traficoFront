import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

import { AppComponent } from './app.component';
import { ValidationService } from './_services/validation.service';
import { ErrorService } from './_services/error.service';
import { MiUsuarioService } from './_services/mi.usuario.service';
import { AlertService } from './_services/alert.service';
import { LoaderService } from './_services/loader.service';
import { UsuarioService } from './inicio/usuario.service';
import { AuthGuard } from './_guards/auth.guard';
import { RespuestaModalService } from './_services/respuesta.modal.service';
import { LoginComponent } from './inicio/login/login.component';
import { HomeComponent } from './inicio/home/home.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { VentanasModalesModule } from './ventanas-modales/ventanas-modales.module';
import { RouterModule, Routes } from '@angular/router';
import { IncidenciaModule } from './incidencias/incidencia.module';
import { VehiculoModule } from './vehiculos/vehiculo.module';
import { ChoferModule } from './choferes/chofer.module';
import { ViajesModule } from './viajes/viaje.module';
import { DiagramacionServicioModule } from './diagramacion-Servicios/diagramacion.servicio.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationService } from './_services/authentication.service';
import { PruebaComponent } from './shared/prueba/prueba.component';
import { ServiceModule } from './services/service.module';
import { TokenInterceptorService, RequestInterceptorService } from './services/service.index';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'prueba', component: PruebaComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2DatetimePickerModule,
    VentanasModalesModule,
    RouterModule.forRoot(appRoutes),
    IncidenciaModule,
    VehiculoModule,
    ChoferModule,
    ViajesModule,
    DiagramacionServicioModule,
    ServiceModule,
    SharedModule
  ],
  providers: [
    ValidationService,
    ErrorService,
    MiUsuarioService,
    AlertService,
    LoaderService,
    UsuarioService,
    AuthGuard,
    RespuestaModalService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
{
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },

*/
