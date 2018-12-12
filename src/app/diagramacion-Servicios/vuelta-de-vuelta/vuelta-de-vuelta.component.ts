import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';

import { Vuelta } from 'src/app/models/vuelta.model';
import { Servicio } from 'src/app/models/servicio.model';
import { VueltasService, DiagrService } from 'src/app/services/service.index';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-vuelta-de-vuelta',
  templateUrl: './vuelta-de-vuelta.component.html',
  styles: []
})
export class VueltaDeVueltaComponent implements OnInit, OnDestroy {
 

  @Input() serv: Servicio;

  servRet: Servicio;
  choferesIda = [];  
  choferesVta = []; 

  vuelta: Vuelta;

  formVueltas: FormGroup;

  saveVtaSubsc: Subscription;
  updateVtaSubsc: Subscription;
  deleteVtaSubsc: Subscription;

  constructor(  public _vs: VueltasService,
                private yo: MiUsuarioService,
                private fb: FormBuilder,
                private _ds: DiagrService  ) {
      this.crearForm();
  }

  crearForm() {
    this.formVueltas = this.fb.group({
      peliIda: [ null, [ Validators.required ]],
      videoIda: [ null, [ Validators.required ]],
      choferIda: [ null],
      internoIda: [ null, [ Validators.required ]],
      peliVta: [ null, [ Validators.required ]],
      videoVta: [ null, [ Validators.required ]],
      choferVta: [ null],
      internoVta: [ null, [ Validators.required ]],
      servRetorno: [ null, [Validators.required]]
    });
  }

  ngOnInit() {      
    if ( this.serv ) {
       // clona los choferes de otra manera modificarias los del servicio
       console.log('Paso por ngOnInit');
       this.choferesIda = this.serv.choferes.slice();  
        //Solo reseteo el valor de su internoIda
      const internoIda= (this.serv.vehiculos.length > 0 ) ? JSON.stringify(this.serv.vehiculos[0].vehiculoPK ): null;
      this.formVueltas.get('internoIda').setValue(internoIda);  
   
       this.vuelta = this._vs.getVuelta( this.serv.servicioPK );
       this.resetVuelta();
       console.log('vuelta ', this.vuelta );
       console.log( 'Fin ngOnInit'); 
    }
  }

  resetVuelta() {

    if ( this.vuelta ) {         
      //Traer el retorno 
      this.onChangeServRetorno( JSON.stringify( this.vuelta.servicioRet.servicioPK ) );      

      this.formVueltas.reset({
        peliIda: this.vuelta.peliIda,
        videoIda: this.vuelta.videoIda,
        //choferIda:  null,
        internoIda: (this.serv.vehiculos.length>0 )? JSON.stringify(this.serv.vehiculos[0].vehiculoPK ):null,
        peliVta: this.vuelta.peliVta,
        videoVta: this.vuelta.videoVta,
        //choferVta: null ,
        internoVta: (this.servRet.vehiculos.length>0)? JSON.stringify( this.servRet.vehiculos[0].vehiculoPK ): null ,
        servRetorno: this.servRet.servicioPKStr
      });
    }
  }


  salvarForm( f: NgForm) {    
    if ( this.formVueltas.valid ) {
        let id = -1;
        const vuelta = this._vs.getVuelta( this.serv.servicioPK ); 
        if( vuelta ){
          id = vuelta.id;
        }
        if (  id < 0 ) {
            this.saveVtaSubsc= this._ds.saveVuelta$( this.prepararVuelta() )
            .subscribe( ( vuelta: Vuelta) =>  this._vs.addVuelta( vuelta ) );
        } else {
            this.updateVtaSubsc = this._ds.updateVuelta$( id, this.prepararVuelta() )
            .subscribe( ( vuelta: Vuelta) =>  this._vs.replaceVuelta( vuelta ) );
        }       
    }    
  }

  okSaveVuelta(){
    console.log('OK guardamos vuelta ');    
  }

  prepararVuelta() {

    const form = this.formVueltas.getRawValue();

    this.serv.choferes = this.choferesIda;
    this.serv.vehiculos = this.getVehiculoIda();

    this.servRet.choferes = this.choferesVta;
    this.servRet.vehiculos = this.getVehiculoVta();
    
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

  getVehiculoIda(){
    let unidadIda = [];
    unidadIda.push({  vehiculoPK: JSON.parse( this.formVueltas.getRawValue().internoIda ),   
                      etaDesde: this.serv.etaInicio,
                      etaHasta: this.serv.etaFin  } );
    return unidadIda;
  }

  getVehiculoVta(){
    let unidadVta = [];
    unidadVta.push( {  vehiculoPK: JSON.parse( this.formVueltas.getRawValue().internoVta ),   
                       etaDesde: this.serv.etaInicio,
                       etaHasta: this.serv.etaFin } );
    return unidadVta;
  }

  onChangeServRetorno(   idServRetorno ) {
    this.servRet = this._vs.getServRetorno( idServRetorno );
    if ( this.servRet ) {
      this.choferesVta = this.servRet.choferes.slice();
      const internoVta = (this.servRet.vehiculos.length>0)? JSON.stringify( this.servRet.vehiculos[0].vehiculoPK ): null; 
      this.formVueltas.get('internoVta').setValue(internoVta );
      console.log('chovuelta', this.choferesVta );
    }
  }

  addChoferIda( choferes, choferSel ) {

    const chofer = this._vs.getChofer( choferSel );   

    const cho = {
      choferPK : chofer.choferPK,
      nombre: chofer.nombre,
      nombreConTipo: chofer.nombreConTipo,
      tipoChofer : chofer.tipoChofer,
      etaDesde: this.serv.etaInicio,
      etaHasta: this.serv.etaFin
    };    

    choferes.push( cho );
    //Lo pongo a null para que siga seleccionando
    this.resetComboChofer( 'choferIda' );    
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
    //Lo pongo a null para que siga seleccionando
    this.resetComboChofer( 'choferVta' );   
  }  
  
  resetComboChofer( nombre ){
     this.formVueltas.get(nombre).setValue(null);
  }

  removeChofer( choferes, index ) {
    choferes.splice(index, 1);
  }

  eliminarVta(){
    if( this.vuelta ){
         this.deleteVtaSubsc = this._ds.deleteVuelta$( this.vuelta.id )
        .subscribe( ( vuelta: Vuelta) =>  this._vs.removeVuelta( vuelta ) );
    }
    console.log('Eliminar Vuelta');
  }

  ngOnDestroy(): void {
    if( this.deleteVtaSubsc ){ this.deleteVtaSubsc.unsubscribe(); }     
    if( this.saveVtaSubsc ){ this.saveVtaSubsc.unsubscribe(); }
    if( this.updateVtaSubsc ){ this.updateVtaSubsc.unsubscribe(); }
  }

}
