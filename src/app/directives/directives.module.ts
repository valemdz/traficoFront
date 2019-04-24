import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TienePermisoDirective } from './tiene-permiso.directive';
import { UppercaseDirective } from './uppercase.directive';
import { ColorBotonEstadoChoferDirective } from './color-boton-estado-chofer.directive';
import { ColorBotonEstadoVehiculoDirective } from './color-boton-estado-vehiculo.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ TienePermisoDirective, 
                  UppercaseDirective,
                  ColorBotonEstadoChoferDirective,
                  ColorBotonEstadoVehiculoDirective ],
  exports: [ TienePermisoDirective, 
             UppercaseDirective,
             ColorBotonEstadoChoferDirective,
             ColorBotonEstadoVehiculoDirective ]
})
export class DirectivesModule { }
