import { NgModule } from '@angular/core';
import { ChoferesConEstadoPipe } from './choferes-con-estado.pipe';
import { FilterByFechaPipe } from './filter-by-fecha.pipe';
import { SerMayoIgualPipe } from './ser-mayo-igual.pipe';

@NgModule({
  imports: [    
  ],
  declarations: [ ChoferesConEstadoPipe,
                  FilterByFechaPipe,
                  SerMayoIgualPipe ],
  exports:[ ChoferesConEstadoPipe,
            FilterByFechaPipe,
            SerMayoIgualPipe ]                
})
export class PipesModule { }
