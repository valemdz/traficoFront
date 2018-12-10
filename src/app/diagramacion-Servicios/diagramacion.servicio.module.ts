import { NgModule, CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { SharedModule } from './../shared/shared.module';


import { VentanasModalesModule } from '../ventanas-modales/ventanas-modales.module';

import { DiagrService } from './diagr.service';
import { DiagramacionListComponent } from './diagramacion-list/diagramacion-list.component';
import { DiagramacionServicioRoutingModule } from './diagramacion-servicio-routing.module';
import { ModalConDetalleComponent } from './modal-con-detalle/modal-con-detalle.component';
import { AdService }         from './ad.service';

import { HeroJobAdComponent } from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
import { DiagramacionChoferesComponent } from './diagramacion-choferes/diagramacion-choferes.component';
import { DiagramacionInternosComponent } from './diagramacion-internos/diagramacion-internos.component';
import { IdaVtaListComponent } from '../diagramacion-Servicios/ida-vta-list/ida-vta-list.component';
import { EnlaceLineasComponent } from '../diagramacion-Servicios/enlace-lineas/enlace-lineas.component';
import { VueltasComponent } from '../diagramacion-Servicios/vueltas/vueltas.component';
import { FormsModule } from '@angular/forms';
import { VueltaDeVueltaComponent } from '../diagramacion-Servicios/vuelta-de-vuelta/vuelta-de-vuelta.component';
import { VueltasService } from './vueltas/vueltas.service';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    SharedModule,
    VentanasModalesModule,
    FormsModule,
    DiagramacionServicioRoutingModule,
    PipesModule
  ],
  declarations: [
              DiagramacionListComponent,
              ModalConDetalleComponent,
              HeroJobAdComponent,
              HeroProfileComponent,
              DiagramacionChoferesComponent,
              DiagramacionInternosComponent,
              IdaVtaListComponent,
              EnlaceLineasComponent,
              VueltasComponent,
              
              VueltaDeVueltaComponent ],
  entryComponents: [ModalConDetalleComponent, HeroJobAdComponent, HeroProfileComponent],
    providers:[ DiagrService, AdService, VueltasService],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DiagramacionServicioModule { }
