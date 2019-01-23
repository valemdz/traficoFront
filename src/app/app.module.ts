import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

import { AppComponent } from './app.component';
import { LoginComponent } from './inicio/login/login.component';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { PruebaComponent } from './shared/prueba/prueba.component';
import { ServiceModule } from './services/service.module';
import { TokenInterceptorService, RequestInterceptorService } from './services/service.index';
import { MaterialModule } from './material/material.module';
import { PagesModule } from './pages/pages.module';
import { PagesComponent } from './pages/pages.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { DirectivesModule } from './directives/directives.module';


const appRoutes: Routes = [  
  { path: 'login', component: LoginComponent },  
  { path: 'prueba', component: PruebaComponent },
  { path: '**', pathMatch: 'full', component: NoPageFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent,    
    PagesComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2DatetimePickerModule,    
    RouterModule.forRoot(appRoutes, {useHash:true}),            
    ServiceModule,
    MaterialModule,    
    SharedModule,
    PagesModule,
    DirectivesModule
  ],
  providers: [             
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
