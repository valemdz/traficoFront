import { NgModule, CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { SharedModule } from './../shared/shared.module';


import { VentanasModalesModule } from '../ventanas-modales/ventanas-modales.module';

import { DiagramacionServicioRoutingModule } from './diagramacion-servicio-routing.module';
import { ModalConDetalleComponent } from './modal-con-detalle/modal-con-detalle.component';
import { AdService }         from './ad.service';

import { HeroJobAdComponent } from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
import { IdaVtaListComponent } from '../diagramacion-Servicios/ida-vta-list/ida-vta-list.component';
import { EnlaceLineasComponent } from '../diagramacion-Servicios/enlace-lineas/enlace-lineas.component';
import { VueltasComponent } from '../diagramacion-Servicios/vueltas/vueltas.component';
import { FormsModule } from '@angular/forms';
import { VueltaDeVueltaComponent } from '../diagramacion-Servicios/vuelta-de-vuelta/vuelta-de-vuelta.component';

import { PipesModule } from '../pipes/pipes.module';
import { ViewVueltaDeVueltaComponent } from './vuelta-de-vuelta/view-vuelta-de-vuelta.component';

@NgModule({
  imports: [
    SharedModule,
    VentanasModalesModule,
    FormsModule,
    DiagramacionServicioRoutingModule,
    PipesModule
  ],
  declarations: [              
              ModalConDetalleComponent,
              HeroJobAdComponent,
              HeroProfileComponent,              
              IdaVtaListComponent,
              EnlaceLineasComponent,
              VueltasComponent,              
              VueltaDeVueltaComponent,
              ViewVueltaDeVueltaComponent ],
  entryComponents: [ModalConDetalleComponent, HeroJobAdComponent, HeroProfileComponent],
    providers:[ AdService ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DiagramacionServicioModule { }
