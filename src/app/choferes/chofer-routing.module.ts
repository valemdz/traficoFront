import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

import {ChoferListComponent } from './chofer-list/chofer-list.component';
import {ChoferNuevoComponent } from './chofer-nuevo/chofer-nuevo.component';
import { IncByChoferComponent } from './inc-by-chofer/inc-by-chofer.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: 'chofer', component: ChoferListComponent},    
        { path: 'chofer/:id', component: ChoferNuevoComponent },     
        { path: 'incByChofer', component: IncByChoferComponent },
         ]) ],
  exports: [RouterModule]
})
export class ChoferRoutingModule{
}
