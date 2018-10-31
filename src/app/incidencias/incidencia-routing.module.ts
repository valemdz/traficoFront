import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {IncidenciaComponent } from './incidencia/incidencia.component';
import {IncidenciaListComponent} from './incidencia-list/incidencia-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: 'incidencia', component: IncidenciaListComponent },
        { path: 'incidencia/:id', component: IncidenciaComponent } ] ),    
  ],
  exports: [RouterModule]
})
export class IncidenciaRoutingModule{
}