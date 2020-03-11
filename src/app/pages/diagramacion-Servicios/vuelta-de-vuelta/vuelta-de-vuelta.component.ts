import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { VueltasService, DiagrService, ModalSiNoService, UsuarioService } from 'src/app/services/service.index';
import { Subscription } from 'rxjs';
import { VueltaDeVueltaService } from './vuelta-de-vuelta.service';
import { ChoferesConEstadoPipe } from 'src/app/pipes/choferes-con-estado.pipe';
import { Servicio, Vuelta, ModalSiNo  } from '../../../models/model.index';
import { ChofereEtapasComponent } from '../chofere-etapas/chofere-etapas.component';

import { GenerarChoferesServicioService } from './generar-choferes-servicio.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { MatDialog } from '@angular/material/dialog';

const swal: SweetAlert = _swal as any;



@Component({
  selector: 'app-vuelta-de-vuelta',
  templateUrl: './vuelta-de-vuelta.component.html',  
  providers:[ VueltaDeVueltaService, ChoferesConEstadoPipe, GenerarChoferesServicioService],
  styleUrls: ['./vuelta-de-vuelta.component.css']
})
export class VueltaDeVueltaComponent implements OnInit, OnDestroy {
 
  @Input("servInput") servInput: Servicio; 
  
  formVueltas: FormGroup;

  checkVtaSubsc: Subscription;
  saveVtaSubsc: Subscription;
  updateVtaSubsc: Subscription;
  deleteVtaSubsc: Subscription;    

  
  constructor(  public _vv: VueltaDeVueltaService,
                public _vs: VueltasService,
                private _us: UsuarioService,
                private fb: FormBuilder,
                private _ds: DiagrService,                
                public _ms: ModalSiNoService,
                public dialog: MatDialog  ) {
      this.crearForm();
  }

  crearForm() {
    this.formVueltas = this.fb.group({
      peliIda: [ null, [ Validators.required ]],
      videoIda: [ null, [ Validators.required ]],      
      peliVta: [ null, [ Validators.required ]],
      videoVta: [ null, [ Validators.required ]],      
      servRetorno: [ null, [Validators.required]]
    });
  }

  ngOnInit() {     
    this._vv.OnInit( this.servInput );        
    this.resetVuelta();  
  }

  modificarChoferesEtapasIda( serv: any ){                                 
    
      const dialogRef = this.dialog.open( ChofereEtapasComponent, {
        width: '1400px',
        data:{ servicio: serv }      
      });
  
      dialogRef.afterClosed().subscribe( horarios => {        
          if( horarios ){
              this._vv.generarChoferesYVehiculosIda( horarios );
          }
      } );
       
  } 

  modificarChoferesEtapasVta( serv: any ){                                 
    
    const dialogRef = this.dialog.open( ChofereEtapasComponent, {
      width: '1400px',
      data:{ servicio: serv }      
    });

    dialogRef.afterClosed().subscribe( horarios => {        
        if( horarios ){
            this._vv.generarChoferesYVehiculosVta( horarios );
        }
    } );
     
} 
  
  resetVuelta() {
    if ( this._vv.vuelta ) {         
      //Traer el retorno 
      this.onChangeServRetorno( JSON.stringify( this._vv.vuelta.servicioRet.servicioPK ) ); 
      this.formVueltas.reset({
        peliIda: this._vv.vuelta.peliIda,
        videoIda: this._vv.vuelta.videoIda,       
        peliVta: this._vv.vuelta.peliVta,
        videoVta: this._vv.vuelta.videoVta,                
        servRetorno: this._vv.servRet.servicioPKStr
      });
    }
  }


  salvarForm() {    
    if ( this.formVueltas.valid ) {
        let idLlamada ='nuevo'; 
        let id = -1;
        const vuelta = this._vs.getVuelta( this._vv.serv.servicioPK ); 
        if( vuelta ){
          id = vuelta.id;          
        }
        const form = this.formVueltas.getRawValue();
        this.checkVueltas( this._vv.prepararVuelta( form ), id );                
    }    
  } 
  
  checkVueltas(  vuelta, id: number  ) {
    this._ds.checkVueltas$( vuelta ).subscribe( ( resp:any)  =>{
        let mensajes = []    ;
        for ( let clave in resp ) {           
            mensajes.push( clave + ":");
            for( let mje of resp[ clave] ){
                mensajes.push( `     ${mje}` );
            }
        }
        
        if ( mensajes.length > 0   ){
            let mensaje: ModalSiNo = {           
              title:"Conflicto con Choferes y Vehiculos",      
              messages:mensajes,      
            };
    
            this._ms.mostraModal( mensaje ); 
            
            if( this.checkVtaSubsc ){ this.checkVtaSubsc.unsubscribe(); }
            this.checkVtaSubsc = this._ms.notificacionSiNO.subscribe( resultado => {            
              if( resultado.acepto ) {
                  this.salvar(  vuelta, id );
              }  
            });
        }else{
             this.salvar(  vuelta, id );
        }     
        
    });
  }
  
  salvar( vuelta, id: number ) {    
    if ( id < 0 ){
        this.saveVtaSubsc= this._ds.saveVuelta$( vuelta )
          .subscribe( ( resp: any)  =>  this._vv.okSaveVuelta( resp ) );
    }else{
        this.updateVtaSubsc = this._ds.updateVuelta$( id, vuelta )
        .subscribe( ( resp: any)  => this._vv.okModificarVuelta( resp ) );
    }
  }   
  

  onChangeServRetorno(   idServRetorno ) {
    this._vv.onChangeServRetorno(  idServRetorno );    
  }    

  eliminarVta(){
    if( this._vv.vuelta ){

      swal({
        title: "Eliminación",
        text: "Esta seguro que desea eliminar la vuelta?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.deleteVtaSubsc = this._ds.deleteVuelta$( this._vv.vuelta.id )
          .subscribe( ( resp: any) => this.okEliminarVta( resp )  );
        }
      });        
    }    
  }

  okEliminarVta( vuelta: Vuelta ) {

    this._vv.eliminarVuelta( vuelta );

    this.formVueltas.patchValue({
      peliIda: null,
      videoIda: null,      
      peliVta: null,
      videoVta: null,      
      servRetorno: null
    });

  }

  cambiarEditable( event:boolean ){
    this._vv.editable = event;
  }

  cancelarEdicion(){
    this._vv.editable = false;
  }


  ngOnDestroy(): void {
    if( this.deleteVtaSubsc ){ this.deleteVtaSubsc.unsubscribe(); }     
    if( this.saveVtaSubsc ){ this.saveVtaSubsc.unsubscribe(); }
    if( this.updateVtaSubsc ){ this.updateVtaSubsc.unsubscribe(); }    
    if( this.checkVtaSubsc ){ this.checkVtaSubsc.unsubscribe(); }        
  }

}
