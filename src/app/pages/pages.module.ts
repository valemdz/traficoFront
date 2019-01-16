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


@NgModule({
  declarations: [ WellcomeComponent, 
                  ChoferesComponent, 
                  ChoferNuevoComponent, 
                  IncByChoferComponent, 
                  CarnetListComponent,
                  IncidenciasComponent,
                  VehiculosComponent ],
  exports:[ WellcomeComponent, 
            ChoferesComponent, 
            ChoferNuevoComponent, 
            IncByChoferComponent,
            CarnetListComponent, 
            IncidenciasComponent,
            VehiculosComponent ],
  imports: [
    CommonModule,    
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule 
  ]  
})
export class PagesModule { }
