import { NgModule } from '@angular/core';
import { ChoferesConEstadoPipe } from './choferes-con-estado.pipe';
import { FilterByFechaPipe } from './filter-by-fecha.pipe';
import { SerMayoIgualPipe } from './ser-mayo-igual.pipe';
import { VehiculosConColoresPipe } from './vehiculos-con-colores.pipe';

@NgModule({
  imports: [    
  ],
  declarations: [ ChoferesConEstadoPipe,
                  FilterByFechaPipe,
                  SerMayoIgualPipe,
                  VehiculosConColoresPipe ],
  exports:[ ChoferesConEstadoPipe,
            FilterByFechaPipe,
            SerMayoIgualPipe,
            VehiculosConColoresPipe ]                
})
export class PipesModule { }
