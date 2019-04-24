import { NgModule } from '@angular/core';
import { ChoferesConEstadoPipe } from './choferes-con-estado.pipe';
import { FilterByFechaPipe } from './filter-by-fecha.pipe';
import { SerMayoIgualPipe } from './ser-mayo-igual.pipe';
import { VehiculosConColoresPipe } from './vehiculos-con-colores.pipe';
import { ImagenPipe } from './imagen.pipe';

@NgModule({
  imports: [    
  ],
  declarations: [ ChoferesConEstadoPipe,
                  FilterByFechaPipe,
                  SerMayoIgualPipe,
                  VehiculosConColoresPipe,
                  ImagenPipe ],
  exports:[ ChoferesConEstadoPipe,
            FilterByFechaPipe,
            SerMayoIgualPipe,
            VehiculosConColoresPipe,
            ImagenPipe ]                
})
export class PipesModule { }
