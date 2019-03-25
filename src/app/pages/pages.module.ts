import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChoferesComponent } from './choferes/choferes.component';
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
import { DiagramacionComponent } from './diagramacion-Servicios/diagramacion.component';
import { VueltasComponent } from './diagramacion-Servicios/vueltas/vueltas.component';
import { VueltaDeVueltaComponent } from './diagramacion-Servicios/vuelta-de-vuelta/vuelta-de-vuelta.component';
import { MaterialModule } from '../material/material.module';
import { ViewVueltaDeVueltaComponent } from './diagramacion-Servicios/vuelta-de-vuelta/view-vuelta-de-vuelta.component';
//import { MyCustomModalComponent } from '../shared/my-custom-modal/my-custom-modal.component';
import { IncidenciaByVehiculoComponent } from './vehiculos/incidencia-by-vehiculo/incidencia-by-vehiculo.component';
import { IncidenciaByChoferComponent } from './choferes/incidencia-by-chofer/incidencia-by-chofer.component';
import { ChoferComponent } from './choferes/chofer/chofer.component';
import { VencimientosComponent } from './vencimientos/vencimientos.component';
import { ChoferVencimientoComponent } from './vencimientos/chofer-vencimiento/chofer-vencimiento.component';
import { VehiculoVencimientoComponent } from './vencimientos/vehiculo-vencimiento/vehiculo-vencimiento.component';
import { ConfVencimientoComponent } from './vencimientos/conf-vencimiento/conf-vencimiento.component';
import { VencimientoCarnetComponent } from './vencimiento-carnet/vencimiento-carnet.component';
import { DiagrAuxiliaresComponent } from './viajes/diagr-auxiliares/diagr-auxiliares.component';
import { DiagrViajesEspComponent } from './viajes/diagr-viajes-esp/diagr-viajes-esp.component';
import { DiagrChoferesComponent } from './viajes/diagr-choferes/diagr-choferes.component';
import { ErrorAppComponent } from './error-app/error-app.component';
import { UsuariosComponent } from './permisos/usuarios.component';
import { GruposComponent } from './permisos/grupos/grupos.component';
import { GrupoComponent } from './permisos/grupo/grupo.component';
import { RolesComponent } from './permisos/roles/roles.component';
import { UsuarioComponent } from './permisos/usuario/usuario.component';
import { DirectivesModule } from '../directives/directives.module';



@NgModule({
  declarations: [ WellcomeComponent, 
                  ChoferesComponent, 
                  ChoferComponent, 
                  IncidenciaByChoferComponent, 
                  CarnetListComponent,
                  IncidenciasComponent,
                  VehiculosComponent,
                  ViajesEspListComponent,
                  ViajesEspecialesComponent,
                  ViajeEdicionComponent,
                  DiagrInternoComponent,                  
                  IdaVtaListComponent,
                  EnlaceLineasComponent,
                  IncidenciaComponent,
                  DiagramacionComponent,
                  VueltasComponent,
                  VueltaDeVueltaComponent,
                  ViewVueltaDeVueltaComponent,
                  VehiculoComponent,
                  //MyCustomModalComponent,
                  IncidenciaByVehiculoComponent,
                  VehiculoVencimientoComponent,
                  ConfVencimientoComponent,
                  VencimientosComponent,
                  VencimientosComponent,
                  ChoferVencimientoComponent,
                  VencimientoCarnetComponent,
                  DiagrAuxiliaresComponent,
                  DiagrChoferesComponent,
                  DiagrViajesEspComponent,
                  ErrorAppComponent,
                  UsuariosComponent,
                  GruposComponent,
                  GrupoComponent,
                  RolesComponent,
                  UsuarioComponent     ],
                  
  exports:[ WellcomeComponent, 
            ChoferesComponent, 
            ChoferComponent, 
            IncidenciaByChoferComponent,
            CarnetListComponent, 
            IncidenciasComponent,
            VehiculosComponent,
            ViajesEspListComponent,
            ViajesEspecialesComponent,
            ViajeEdicionComponent,
            DiagrInternoComponent,
            IdaVtaListComponent,
            EnlaceLineasComponent,
            IncidenciaComponent,
            DiagramacionComponent,
            VueltasComponent,
            VueltaDeVueltaComponent,
            ViewVueltaDeVueltaComponent,
            VehiculoComponent,
            //MyCustomModalComponent,
            IncidenciaByVehiculoComponent,
            VehiculoVencimientoComponent,
            ConfVencimientoComponent,
            VencimientosComponent,
            VencimientoCarnetComponent,
            DiagrAuxiliaresComponent,
            DiagrChoferesComponent,
            DiagrViajesEspComponent,
            ErrorAppComponent,
            GruposComponent     ],
  imports: [
    CommonModule,    
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    MaterialModule,
    DirectivesModule     
  ], 
  entryComponents:[ IncidenciaComponent, 
                    VehiculoComponent, 
                    //MyCustomModalComponent, 
                    IncidenciaByVehiculoComponent,
                    GrupoComponent,
                    RolesComponent,                    
                    UsuarioComponent,
                    CarnetListComponent ]  
})
export class PagesModule { }
