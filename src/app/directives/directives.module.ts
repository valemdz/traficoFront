import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TienePermisoDirective } from './tiene-permiso.directive';
import { UppercaseDirective } from './uppercase.directive';
//import { UppercaseDirective } from './uppercase.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ TienePermisoDirective, UppercaseDirective ],
  exports: [ TienePermisoDirective, UppercaseDirective ]
})
export class DirectivesModule { }
