import { Component, OnInit,  Input, OnChanges } from '@angular/core';
import { UsuarioService, VehiculoService } from 'src/app/services/service.index';
import { VencimientosVehiculo } from 'src/app/models/model.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';


@Component({
  selector: 'app-vehiculo-vencimiento',
  templateUrl: './vehiculo-vencimiento.component.html',
  styles: []
})
export class VehiculoVencimientoComponent implements OnInit, OnChanges {  
 
 @Input()vencimientosVeh : VencimientosVehiculo[]=[]; 
  

  constructor( public _us: UsuarioService,
               public _vs: VehiculoService ) { }

  ngOnInit() {   
    this.mostrarVencimientos();      
  }  

  ngOnChanges(){       
    this.mostrarVencimientos();   
  } 

  mostrarVencimientos(){      
      for( let venc of this.vencimientosVeh ){
        FuncionesGrales.ordenamientoDescendente(venc.vehiculos, 'vehVerificacionTecnicaVto' );
        venc.vehiculos.forEach( veh => {
            let hoy = new Date();    
            veh.vehVencido = veh.vehVerificacionTecnicaVto.getTime() <= hoy.getTime();               
        });
      }          
  } 

}
