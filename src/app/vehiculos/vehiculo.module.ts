import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import {RouterModule} from '@angular/router';

import {VehiculoService} from './vehiculo.service';
import {VehiculoComponent } from './vehiculo/vehiculo.component';
import {VehiculoListComponent} from './vehiculo-list/vehiculo-list.component';
import { IncByVehiComponent } from './inc-by-vehi/inc-by-vehi.component';

import { VehiculoRoutingModule } from './vehiculo-routing.module';

@NgModule({
  imports: [
    SharedModule,
    VehiculoRoutingModule       
  ],
  declarations: [VehiculoListComponent, VehiculoComponent, IncByVehiComponent ],
    providers:[ VehiculoService ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class VehiculoModule { }
