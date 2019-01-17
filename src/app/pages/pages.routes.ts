import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
//import { LoginGuardGuard } from '../services/service.index';
import { WellcomeComponent } from './wellcome/wellcome.component';

import { ChoferNuevoComponent } from './choferes/chofer-nuevo/chofer-nuevo.component';
import { IncByChoferComponent } from './choferes/inc-by-chofer/inc-by-chofer.component';
import { ChoferesComponent } from './choferes/choferes.component';
import { LoginGuardGuard } from '../services/service.index';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ViajesEspListComponent } from './viajes/viajes-esp-list/viajes-esp-list.component';
import { IdaVtaListComponent } from './diagramacion-Servicios/ida-vta-list/ida-vta-list.component';


const pagesRoutes: Routes = [
  { path: '',
  component: PagesComponent,  
  canActivate: [ LoginGuardGuard ],
  children: [
    { path: 'choferes', component: ChoferesComponent },    
    { path: 'chofer/:id', component: ChoferNuevoComponent },     
    { path: 'incByChofer', component: IncByChoferComponent },
    { path: 'incidencias', component: IncidenciasComponent },    
    { path: 'vehiculos', component: VehiculosComponent },    
    { path: 'viajesEspeciales', component: ViajesEspListComponent }, 
    { path: 'idaVtaList', component: IdaVtaListComponent },        
    { path: 'wellcome', component: WellcomeComponent },        
    { path: '', pathMatch: 'full', redirectTo: '/wellcome' }
  ]}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);


