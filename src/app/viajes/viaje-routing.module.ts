import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

import { ViajesEspListComponent } from './viajes-esp-list/viajes-esp-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: 'viajesEspeciales', component: ViajesEspListComponent } ]) ],
  exports: [RouterModule]
})
export class ViajeRoutingModule{
}
