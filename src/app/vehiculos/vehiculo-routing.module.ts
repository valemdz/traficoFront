import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

import {VehiculoComponent } from './vehiculo/vehiculo.component';
import {VehiculoListComponent} from './vehiculo-list/vehiculo-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: 'vehiculo', component: VehiculoListComponent},
        { path: 'vehiculo/:id', component: VehiculoComponent} ]) ],
  exports: [RouterModule]
})
export class VehiculoRoutingModule{
}