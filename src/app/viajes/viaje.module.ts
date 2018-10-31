import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import {RouterModule} from '@angular/router';

import { VentanasModalesModule } from '../ventanas-modales/ventanas-modales.module';


import { ViajesEspListComponent } from './viajes-esp-list/viajes-esp-list.component';
import { ViajesEspecialesComponent } from './viajes-especiales/viajes-especiales.component';
import { ViajeEspServive } from './viajeEsp.service';
import { DiagrInternoComponent } from './diagr-interno/diagr-interno.component';
import { ViajeRoutingModule } from './viaje-routing.module';

import { ViajeEdicionComponent } from './viaje-edicion/viaje-edicion.component';

@NgModule({
  imports: [
    SharedModule,
    VentanasModalesModule,
    ViajeRoutingModule       
  ],
  declarations: [ ViajesEspListComponent, 
                  ViajesEspecialesComponent,  
                  DiagrInternoComponent,
                  ViajeEdicionComponent ],
    providers:[ ViajeEspServive ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class ViajesModule { }