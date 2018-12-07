import { Component, OnInit, Input } from '@angular/core';
import { VueltasService } from '../vueltas/vueltas.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';
import { DiagrService } from '../diagr.service';

@Component({
  selector: 'app-vuelta-de-vuelta',
  templateUrl: './vuelta-de-vuelta.component.html',
  styles: []
})
export class VueltaDeVueltaComponent implements OnInit {

  @Input() serv;

  servRet;
  choferesIda = [];  
  choferesVta = []; 

  formVueltas: FormGroup;

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
    });
  }

  ngOnInit() {
    console.log('Paso por ngOnInit');
    if ( this.serv ) {
       // clona los choferes de otra manera modificarias los del servicio
       this.choferesIda = this.serv.choferes.slice();
       console.log( this.serv );
       console.log( this.choferesIda );
    }
  }


  salvarForm( f: NgForm) {    
    if ( this.formVueltas.valid ) {
        //console.log( this.prepararVuelta() );      
        this._ds.saveVuelta$( this.prepararVuelta() )
        .subscribe( this.okSaveVuelta.bind( this) );
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
      console.log( this.choferesVta );
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

}
