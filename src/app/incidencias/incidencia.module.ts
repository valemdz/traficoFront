import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import {RouterModule} from '@angular/router';

import { IncidenciaRoutingModule } from './incidencia-routing.module';
import {IncidenciaService} from './incidencia.service';
import {IncidenciaComponent } from './incidencia/incidencia.component';
import {IncidenciaListComponent} from './incidencia-list/incidencia-list.component';


@NgModule({
  imports: [
    SharedModule,
    IncidenciaRoutingModule   
  ],
  declarations: [ IncidenciaComponent,
    IncidenciaListComponent],
    providers:[ IncidenciaService ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class IncidenciaModule { }
