import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './inicio/login/login.component';
import { PruebaComponent } from './shared/prueba/prueba.component';
import { ChangePasswordComponent } from './inicio/change-password/change-password.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';


const routes: Routes = [  
   { path: 'login', component: LoginComponent },  
   { path: 'prueba', component: PruebaComponent },
   { path: 'change-password/:token', component: ChangePasswordComponent },
   { path: '**', pathMatch: 'full', component: NoPageFoundComponent }
 ];


@NgModule({
  imports: [RouterModule.forRoot( routes ) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
