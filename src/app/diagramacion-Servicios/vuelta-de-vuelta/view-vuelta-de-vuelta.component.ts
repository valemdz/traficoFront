import { Component, OnInit, Input } from '@angular/core';
import { Servicio } from 'src/app/models/servicio.model';
import { Vuelta } from 'src/app/models/vuelta.model';
import { VueltasService } from '../vueltas/vueltas.service';

@Component({
  selector: 'app-view-vuelta-de-vuelta',
  templateUrl: './view-vuelta-de-vuelta.component.html',
  styleUrls: []
})
export class ViewVueltaDeVueltaComponent implements OnInit {

  @Input() serv: Servicio;

  servRet: Servicio;
  choferesIda = [];  
  choferesVta = []; 

  vuelta: Vuelta;
  

  constructor( public _vs: VueltasService ) { }

  ngOnInit() {

    console.log('view');

    if ( this.serv ) {

      this.choferesIda = this.serv.choferes.slice();        
      const internoIda= (this.serv.vehiculos.length > 0 ) ? JSON.stringify(this.serv.vehiculos[0].vehiculoPK ): null;     
  
      this.vuelta = this._vs.getVuelta( this.serv.servicioPK );

      if(  this.vuelta ){
      
          console.log('vuelta', this.vuelta);
          this.servRet = this._vs.getServRetorno( JSON.stringify( this.vuelta.servicioRet.servicioPK )  );
        if ( this.servRet ) {
          this.choferesVta = this.servRet.choferes.slice();
          const internoVta = (this.servRet.vehiculos.length>0)? JSON.stringify( this.servRet.vehiculos[0].vehiculoPK ): null; 
          
          console.log('chovuelta', this.choferesVta );
        }

      }
      

      

   }


  }

}
