import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import { DiagramacionListComponent } from './diagramacion-list/diagramacion-list.component';
import { IdaVtaListComponent } from './ida-vta-list/ida-vta-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: 'diagramacion', component: DiagramacionListComponent },
        { path: 'idaVtaList', component: IdaVtaListComponent }
         ]) ],
  exports: [RouterModule]
})
export class DiagramacionServicioRoutingModule{
}
