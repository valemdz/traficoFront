import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import { IdaVtaListComponent } from './ida-vta-list/ida-vta-list.component';
import { VueltasComponent } from './vueltas/vueltas.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: 'diagramacion', component: IdaVtaListComponent },
        { path: 'idaVtaList', component: IdaVtaListComponent },
        { path: 'vuelta/:idLinIda/:idLinVta', component: VueltasComponent }
         ]) ],
  exports: [RouterModule]
})
export class DiagramacionServicioRoutingModule {
}
