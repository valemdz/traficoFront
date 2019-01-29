import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService, VehiculoService } from 'src/app/services/service.index';
import { Subscription } from 'rxjs';
import {  CONSTANTES_VEHICULOS, Vehiculo } from 'src/app/models/model.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';


@Component({
  selector: 'app-vehiculo-vencimiento',
  templateUrl: './vehiculo-vencimiento.component.html',
  styles: []
})
export class VehiculoVencimientoComponent implements OnInit, OnDestroy {

  vehiculos: Vehiculo[]=[];
  vencimientosSubs: Subscription; 

  constructor( public _us: UsuarioService,
               public _vs: VehiculoService ) { }

  ngOnInit() {

    this.vencimientosSubs = this._vs.getVencimientos$('IMQ', CONSTANTES_VEHICULOS.HABILITADO )
                                .subscribe( this.okVencimientos.bind( this ) );

  }

  okVencimientos( respuesta ){        
    this.vehiculos = respuesta;
    FuncionesGrales.ordenamientoDescendente(this.vehiculos, 'vehVerificacionTecnica' );
    
    this.vehiculos.forEach( veh => {
      let hoy = new Date();    
      veh.vehVencido = veh.vehVerificacionTecnica.getTime() <= hoy.getTime();      
    });
  }

  ngOnDestroy(): void {
    if ( this.vencimientosSubs ) { this.vencimientosSubs.unsubscribe(); }   
  }

  estaVencido( v: Vehiculo ){
    
  }

}
