import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Servicio, VehiculoServicio } from 'src/app/models/servicio.model';
import { VueltasService } from 'src/app/services/service.index';
import { Vuelta } from 'src/app/models/model.index';
import { GenerarChoferesServicioService } from './generar-choferes-servicio.service';



@Component({
  selector: 'app-view-vuelta-de-vuelta',
  templateUrl: './view-vuelta-de-vuelta.component.html',  
  styleUrls: ['./view-vuelta-de-vuelta.component.css'],
  providers:[ GenerarChoferesServicioService ]

})
export class ViewVueltaDeVueltaComponent implements OnInit {

  @Input() serv: Servicio;
  @Output() onEditable:EventEmitter<boolean> = new EventEmitter();

  servRet: Servicio;
  choferesIda = [];
  choferesVta = [];

  vuelta: Vuelta ;
  vehiculosIda:VehiculoServicio[] = [];
  vehiculosVta:VehiculoServicio[] = [];

   constructor(  public _vs: VueltasService,
                 public _generador: GenerarChoferesServicioService ) {

   }

  ngOnInit() {
      if ( this.serv ) {
        this.choferesIda = this._generador.generarChoferes( this.serv.horarios, this.serv.servicioPK.serEmpCodigo );         
        this.vehiculosIda = this._generador.generarVehiculo( this.serv.horarios, this.serv.servicioPK.serEmpCodigo ); 
        this.vuelta = this._vs.getVuelta( this.serv.servicioPK );
        if (  this.vuelta ) {
          this.servRet = this._vs.getServRetorno( JSON.stringify( this.vuelta.servicioRet.servicioPK )  );
          if ( this.servRet ) {
            this.choferesVta = this._generador.generarChoferes( this.servRet.horarios, this.servRet.servicioPK.serEmpCodigo);            
            this.vehiculosVta = this._generador.generarVehiculo( this.servRet.horarios, this.servRet.servicioPK.serEmpCodigo); 
          }
        }
      }
  }

  editar(){
    this.onEditable.emit(true);
  }

}
