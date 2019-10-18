import { NgModule } from '@angular/core';
import { ChoferesConEstadoPipe } from './choferes-con-estado.pipe';
import { FilterByFechaPipe } from './filter-by-fecha.pipe';
import { SerMayoIgualPipe } from './ser-mayo-igual.pipe';
import { VehiculosConColoresPipe } from './vehiculos-con-colores.pipe';
import { ImagenPipe } from './imagen.pipe';
import { PropIgualAPipe } from './prop-igual-a.pipe';

@NgModule({
  imports: [    
  ],
  declarations: [ ChoferesConEstadoPipe,
                  FilterByFechaPipe,
                  SerMayoIgualPipe,
                  VehiculosConColoresPipe,
                  ImagenPipe,
                  PropIgualAPipe ],
  exports:[ ChoferesConEstadoPipe,
            FilterByFechaPipe,
            SerMayoIgualPipe,
            VehiculosConColoresPipe,
            ImagenPipe,
            PropIgualAPipe ]                
})
export class PipesModule { }
