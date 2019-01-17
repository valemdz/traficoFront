import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Servicio } from 'src/app/models/servicio.model';

import { VueltasService } from 'src/app/services/service.index';
import { Vuelta } from 'src/app/models/model.index';


@Component({
  selector: 'app-view-vuelta-de-vuelta',
  templateUrl: './view-vuelta-de-vuelta.component.html',
  styleUrls: []
})
export class ViewVueltaDeVueltaComponent implements OnInit {

  @Input() serv: Servicio;

  @Output() onEditable:EventEmitter<boolean> = new EventEmitter();

  servRet: Servicio;
  choferesIda = [];
  choferesVta = [];

  vuelta: Vuelta ;
  internoIda: any;
  internoVta: any;

   constructor(  public _vs: VueltasService ) { }

  ngOnInit() {
      if ( this.serv ) {
        this.choferesIda = this.serv.choferes.slice();
        this.internoIda = (this.serv.vehiculos.length > 0 ) ? JSON.stringify(this.serv.vehiculos[0].vehiculoPK.vehInterno ) : null;     
        this.vuelta = this._vs.getVuelta( this.serv.servicioPK );
        if (  this.vuelta ) {
          this.servRet = this._vs.getServRetorno( JSON.stringify( this.vuelta.servicioRet.servicioPK )  );
          if ( this.servRet ) {
            this.choferesVta = this.servRet.choferes.slice();
            this.internoVta = (this.servRet.vehiculos.length > 0) ? JSON.stringify( this.servRet.vehiculos[0].vehiculoPK.vehInterno ) : null; 
    
          }
        }
      }
  }

  editar(){
    this.onEditable.emit(true);
  }

}
