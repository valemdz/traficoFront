import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import { DiagramacionListComponent } from './diagramacion-list/diagramacion-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: 'diagramacion', component: DiagramacionListComponent }, 
         ]) ],
  exports: [RouterModule]
})
export class DiagramacionServicioRoutingModule{
}