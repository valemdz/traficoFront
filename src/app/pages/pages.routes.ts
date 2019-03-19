import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { ChoferesComponent } from './choferes/choferes.component';
import { LoginGuardGuard } from '../services/service.index';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ViajesEspListComponent } from './viajes/viajes-esp-list/viajes-esp-list.component';
import { IdaVtaListComponent } from './diagramacion-Servicios/ida-vta-list/ida-vta-list.component';
import { DiagramacionComponent } from './diagramacion-Servicios/diagramacion.component';
import { VueltasComponent } from './diagramacion-Servicios/vueltas/vueltas.component';
import { IncidenciaByChoferComponent } from './choferes/incidencia-by-chofer/incidencia-by-chofer.component';
import { ChoferComponent } from './choferes/chofer/chofer.component';
import { VencimientosComponent } from './vencimientos/vencimientos.component';
import { ConfVencimientoComponent } from './vencimientos/conf-vencimiento/conf-vencimiento.component';
import { ErrorAppComponent } from './error-app/error-app.component';
import { GruposComponent } from './permisos/grupos/grupos.component';
import { UsuariosComponent } from './permisos/usuarios.component';



const pagesRoutes: Routes = [
  { path: '',
    component: PagesComponent,  
    canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'choferes', component: ChoferesComponent },    
      { path: 'chofer/:id', component: ChoferComponent },     
      { path: 'incByChofer', component: IncidenciaByChoferComponent  },
      { path: 'incidencias', component: IncidenciasComponent },    
      { path: 'vehiculos', component: VehiculosComponent },    
      { path: 'viajesEspeciales', component: ViajesEspListComponent },     
      { path: 'welcome', component: WellcomeComponent },      
      { path: 'confVencimiento', component:ConfVencimientoComponent },  
      { path: 'grupos', component:GruposComponent },  
      { path: 'usuarios', component:UsuariosComponent },  
      { path: 'vencimientos', component:VencimientosComponent },  
      { path: '', pathMatch: 'full', redirectTo: '/welcome' },    
      { 
        path:'diagr',
        component: DiagramacionComponent,
        children: [
          { path: 'idaVtaList', component: IdaVtaListComponent },        
          { path: 'vuelta/:idLinIda/:idLinVta', component: VueltasComponent },
          { path: '', pathMatch: 'full', redirectTo: '/idaVtaList' },
        ]
      },
      { path:'errorApp', component: ErrorAppComponent }
    ]
  },
  
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);


