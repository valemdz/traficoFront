import { Injectable } from '@angular/core';
import { Servicio } from 'src/app/models/servicio.model';
import { Vuelta } from 'src/app/models/vuelta.model';
import { VueltasService, DiagrService } from 'src/app/services/service.index';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';

@Injectable()
export class VueltaDeVueltaService {

  serv: Servicio;

  servRet: Servicio;
  choferesIda = [];  
  choferesVta = []; 

  vuelta: Vuelta = null;

  editable:boolean = false;

  constructor(  public _vs: VueltasService, private yo: MiUsuarioService ) {}

  OnInit( servIda ){      

      if ( servIda ) {          
          this.serv = servIda;          
          // clona los choferes de otra manera modificarias los del servicio        
          this.choferesIda = this.serv.choferes.slice();      
          this.vuelta = this._vs.getVuelta( this.serv.servicioPK );          
      }
  }

  onChangeServRetorno(   idServRetorno ) {
    this.servRet = this._vs.getServRetorno( idServRetorno );
    if ( this.servRet ) {
      this.choferesVta = this.servRet.choferes.slice();          
    }
  }

  okSaveVuelta( vuelta:Vuelta ){    
    this._vs.addVuelta( vuelta );
    //this.vuelta = this._vs.getVuelta( this.serv.servicioPK );
    this.vuelta = vuelta;
    this.editable = false;  
  }

  okModificarVuelta( vuelta:Vuelta ){       
    this._vs.replaceVuelta( vuelta );    
    //this.vuelta = this._vs.getVuelta( this.serv.servicioPK );
    this.vuelta = vuelta;
    this.editable = false;  
    
  }

  addChoferIda( choferes, choferSel ) {  

    const chofer = this._vs.getChofer( choferSel );    

    const existe = choferes.find( cho => JSON.stringify( cho.choferPK ) == choferSel );
    if ( existe ) {
        swal('Atencion!!!', 'El chofer ' + chofer.nombre + ' ya esta asignado', 'error');
        return; 
    }
   
    const cho = {
      choferPK : chofer.choferPK,
      nombre: chofer.nombre,
      nombreConTipo: chofer.nombreConTipo,
      tipoChofer : chofer.tipoChofer,
      etaDesde: this.serv.etaInicio,
      etaHasta: this.serv.etaFin
    };    

    choferes.push( cho );       
  }  

  addChoferVta( choferes, choferSel ) {
    const chofer = this._vs.getChofer( choferSel );
    const cho = {
      choferPK : chofer.choferPK,
      nombre: chofer.nombre,
      nombreConTipo: chofer.nombreConTipo,
      tipoChofer : chofer.tipoChofer,
      etaDesde: this.servRet.etaInicio,
      etaHasta: this.servRet.etaFin
    };
    choferes.push( cho );   
  }  

  prepararVuelta( form ) {
    //const form = this.formVueltas.getRawValue();
    this.serv.choferes = this.choferesIda;
    this.serv.vehiculos = this.getVehiculoIda( form.internoIda );

    this.servRet.choferes = this.choferesVta;
    this.servRet.vehiculos = this.getVehiculoVta( form.internoVta );
    
    return {
          empresa: this.yo.getEmpresa(),
          peliIda: form.peliIda,
          videoIda: form.videoIda,
          servIda:this.serv,
          peliVta: form.peliVta,
          videoVta: form.videoVta,
          servRet: this.servRet
    };
    
  }

  getVehiculoIda( internoIda ){
    let unidadIda = [];
    unidadIda.push({  vehiculoPK: JSON.parse( internoIda ),   
                      etaDesde: this.serv.etaInicio,
                      etaHasta: this.serv.etaFin  } );
    return unidadIda;
  }

  getVehiculoVta( internoVta ){
    let unidadVta = [];
    unidadVta.push( {  vehiculoPK: JSON.parse( internoVta ),   
                       etaDesde: this.serv.etaInicio,
                       etaHasta: this.serv.etaFin } );
    return unidadVta;
  }

  getVehiculoIdaToForm(){
    const internoIda= (this.serv.vehiculos.length > 0 ) ? JSON.stringify(this.serv.vehiculos[0].vehiculoPK ): null;
    return internoIda;
  }

  getVehiculoVtaToForm(){
    const internoVta= (this.servRet.vehiculos.length>0)? JSON.stringify( this.servRet.vehiculos[0].vehiculoPK ): null ;
    return internoVta;
  }  

  eliminarVuelta( vuelta: Vuelta ){
    this._vs.removeVuelta( vuelta );
    this.servRet = null;
    this.choferesVta = []; 
    this.vuelta = null;
    this.editable = false;
  }
  

}
