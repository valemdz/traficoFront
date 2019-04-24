import { Injectable } from '@angular/core';
import { VueltasService, DiagrService, UsuarioService } from 'src/app/services/service.index';
import { Servicio, Vuelta } from  '../../../models/model.index';
import { GenerarChoferesServicioService } from './generar-choferes-servicio.service';


@Injectable()
export class VueltaDeVueltaService {

  serv: Servicio;
  empresaIda: string;
  empresaVta: string;

  servRet: Servicio;
  choferesIda = [];  
  choferesVta = []; 
  vehiculosIda = [];
  vehiculosVta = [];

  vuelta: Vuelta = null;

  editable:boolean = false;

  constructor(  public _vs: VueltasService, private _us: UsuarioService,
                public _generados: GenerarChoferesServicioService  ) {}

  OnInit( servIda ){      

      if ( servIda ) {          
          this.serv = servIda;          
          this.empresaIda = this.serv.servicioPK.serEmpCodigo;
          this.choferesIda = this._generados.generarChoferes( this.serv.horarios, this.empresaIda );
          this.vehiculosIda = this._generados.generarVehiculo( this.serv.horarios, this.empresaIda );         
          this.vuelta = this._vs.getVuelta( this.serv.servicioPK );          
      }
  }

  onChangeServRetorno(   idServRetorno ) {
    this.servRet = this._vs.getServRetorno( idServRetorno );
    if ( this.servRet ) {
      this.empresaVta = this.servRet.servicioPK.serEmpCodigo;
      this.choferesVta = this._generados.generarChoferes( this.servRet.horarios, this.empresaVta ); 
      this.vehiculosVta = this._generados.generarVehiculo( this.servRet.horarios, this.empresaVta );         
    }
  }

  generarChoferesYVehiculosIda( horarios ){
    this.choferesIda = this._generados.generarChoferes( horarios, this.empresaIda );   
    this.vehiculosIda = this._generados.generarVehiculo( horarios, this.empresaIda );   
    this.serv.horarios = horarios;      
  }

  generarChoferesYVehiculosVta( horarios ){
    this.choferesVta = this._generados.generarChoferes( horarios, this.empresaVta );         
    this.vehiculosVta = this._generados.generarVehiculo( horarios, this.empresaVta );         
    this.servRet.horarios =  horarios;
  }

  okSaveVuelta( vuelta:Vuelta ){    
    this._vs.llamadaEnParalelo();
  }

  okModificarVuelta( vuelta:Vuelta ){           
    this._vs.llamadaEnParalelo();    
  }

  ocultar(){
    this.editable = false;
  }

  prepararVuelta( form ) {   
    
    return {
          empresa: this._us.usuario.empresa,
          peliIda: form.peliIda,
          videoIda: form.videoIda,
          servIda:this.serv,
          peliVta: form.peliVta,
          videoVta: form.videoVta,
          servRet: this.servRet
    };
    
  }
 

  eliminarVuelta( vuelta: Vuelta ){
    this._vs.removeVuelta( vuelta );
    this.servRet = null;
    this.choferesVta = []; 
    this.vuelta = null;
    this.editable = false;
  }
  
  
}
