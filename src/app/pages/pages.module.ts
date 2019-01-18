import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChoferesComponent } from './choferes/choferes.component';
import { ChoferNuevoComponent } from './choferes/chofer-nuevo/chofer-nuevo.component';
import { IncByChoferComponent } from './choferes/inc-by-chofer/inc-by-chofer.component';
import { CarnetListComponent } from './choferes/carnet-list/carnet-list.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoComponent } from './vehiculos/vehiculo/vehiculo.component';
import { ViajesEspListComponent } from './viajes/viajes-esp-list/viajes-esp-list.component';
import { ViajesEspecialesComponent } from './viajes/viajes-especiales/viajes-especiales.component';
import { ViajeEdicionComponent } from './viajes/viaje-edicion/viaje-edicion.component';
import { DiagrInternoComponent } from './viajes/diagr-interno/diagr-interno.component';
import { IdaVtaListComponent } from './diagramacion-Servicios/ida-vta-list/ida-vta-list.component';
import { EnlaceLineasComponent } from './diagramacion-Servicios/enlace-lineas/enlace-lineas.component';
import { PipesModule } from '../pipes/pipes.module';
import { IncidenciaComponent } from './incidencias/incidencia/incidencia.component';



@NgModule({
  declarations: [ WellcomeComponent, 
                  ChoferesComponent, 
                  ChoferNuevoComponent, 
                  IncByChoferComponent, 
                  CarnetListComponent,
                  IncidenciasComponent,
                  VehiculosComponent,
                  ViajesEspListComponent,
                  ViajesEspecialesComponent,
                  ViajeEdicionComponent,
                  DiagrInternoComponent,                  
                  IdaVtaListComponent,
                  EnlaceLineasComponent,
                  IncidenciaComponent ],
  exports:[ WellcomeComponent, 
            ChoferesComponent, 
            ChoferNuevoComponent, 
            IncByChoferComponent,
            CarnetListComponent, 
            IncidenciasComponent,
            VehiculosComponent,
            ViajesEspListComponent,
            ViajesEspecialesComponent,
            ViajeEdicionComponent,
            DiagrInternoComponent,
            IdaVtaListComponent,
            EnlaceLineasComponent,
            IncidenciaComponent ],
  imports: [
    CommonModule,    
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PipesModule 
  ], 
  entryComponents:[ IncidenciaComponent ]  
})
export class PagesModule { }
