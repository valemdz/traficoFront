import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';

import { Vuelta } from 'src/app/models/vuelta.model';
import { Servicio } from 'src/app/models/servicio.model';
import { VueltasService, DiagrService } from 'src/app/services/service.index';
import { Subscription } from 'rxjs';
import { VueltaDeVueltaService } from './vuelta-de-vuelta.service';


@Component({
  selector: 'app-vuelta-de-vuelta',
  templateUrl: './vuelta-de-vuelta.component.html',
  styles: [],
  providers:[VueltaDeVueltaService]
})
export class VueltaDeVueltaComponent implements OnInit, OnDestroy {
 
  @Input("servInput") servInput: Servicio; 

  formVueltas: FormGroup;

  saveVtaSubsc: Subscription;
  updateVtaSubsc: Subscription;
  deleteVtaSubsc: Subscription;  

  constructor(  public _vv: VueltaDeVueltaService,
                public _vs: VueltasService,
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
    this._vv.OnInit( this.servInput );    
    this.resetInternoServicioIda(); 
    this.resetVuelta();  
  }

  resetInternoServicioIda(){
    //Solo reseteo el valor de su internoIda    
    this.formVueltas.get('internoIda').setValue( this._vv.getVehiculoIdaToForm() );      
  }

  resetVuelta() {

    if ( this._vv.vuelta ) {         
      //Traer el retorno 
      this.onChangeServRetorno( JSON.stringify( this._vv.vuelta.servicioRet.servicioPK ) ); 
      this.formVueltas.reset({
        peliIda: this._vv.vuelta.peliIda,
        videoIda: this._vv.vuelta.videoIda,
        //choferIda:  null,
        internoIda: this._vv.getVehiculoIdaToForm(),
        peliVta: this._vv.vuelta.peliVta,
        videoVta: this._vv.vuelta.videoVta,
        //choferVta: null ,
        internoVta: this._vv.getVehiculoVtaToForm(),
        servRetorno: this._vv.servRet.servicioPKStr
      });
    }
  }


  salvarForm( f: NgForm) {    
    if ( this.formVueltas.valid ) {
        let id = -1;
        const vuelta = this._vs.getVuelta( this._vv.serv.servicioPK ); 
        if( vuelta ){
          id = vuelta.id;
        }

        const form = this.formVueltas.getRawValue()

        if (  id < 0 ) {
            this.saveVtaSubsc= this._ds.saveVuelta$( this._vv.prepararVuelta( form ) )
            .subscribe( ( resp: any)  =>  this._vv.okSaveVuelta( resp ) );
        } else {
            this.updateVtaSubsc = this._ds.updateVuelta$( id, this._vv.prepararVuelta( form ) )
            .subscribe( ( resp: any)  => this._vv.okModificarVuelta( resp ) );
        }       
    }    
  }  
  
  

  onChangeServRetorno(   idServRetorno ) {
    this._vv.onChangeServRetorno(  idServRetorno );
    if ( this._vv.servRet ) {            
      this.formVueltas.get('internoVta').setValue(this._vv.getVehiculoVtaToForm() );      
    }
  }

  addChoferIda( choferes, choferSel ) {    
    this._vv.addChoferIda( choferes, choferSel )
    //Lo pongo a null para que siga seleccionando
    this.resetComboChofer( 'choferIda' );    
  }  

  addChoferVta( choferes, choferSel ) {

    this._vv.addChoferVta( choferes, choferSel );
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
    if( this._vv.vuelta ){
         this.deleteVtaSubsc = this._ds.deleteVuelta$( this._vv.vuelta.id )
        .subscribe( ( resp: any) => this.okEliminarVta( resp )  );
    }    
  }

  okEliminarVta( vuelta: Vuelta ) {

    this._vv.eliminarVuelta( vuelta );

    this.formVueltas.patchValue({
      peliIda: null,
      videoIda: null,
      //choferIda:  null,
      internoIda: this._vv.getVehiculoIdaToForm(),
      peliVta: null,
      videoVta: null,
      //choferVta: null ,
      internoVta: null,
      servRetorno: null
    });

  }

  cambiarEditable( event:boolean ){
    this._vv.editable = event;
  }

  ngOnDestroy(): void {
    if( this.deleteVtaSubsc ){ this.deleteVtaSubsc.unsubscribe(); }     
    if( this.saveVtaSubsc ){ this.saveVtaSubsc.unsubscribe(); }
    if( this.updateVtaSubsc ){ this.updateVtaSubsc.unsubscribe(); }
  }

}
