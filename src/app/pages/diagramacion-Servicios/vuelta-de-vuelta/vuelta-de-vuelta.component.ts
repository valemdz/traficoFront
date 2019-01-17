import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { VueltasService, DiagrService, ModalSiNoService, UsuarioService } from 'src/app/services/service.index';
import { Subscription, Observable } from 'rxjs';
import { VueltaDeVueltaService } from './vuelta-de-vuelta.service';
import { startWith, map } from 'rxjs/operators';
import { ChoferesConEstadoPipe } from 'src/app/pipes/choferes-con-estado.pipe';
import { Servicio, ComboCho, Vuelta, ModalSiNo  } from '../../../models/model.index';



@Component({
  selector: 'app-vuelta-de-vuelta',
  templateUrl: './vuelta-de-vuelta.component.html',  
  providers:[VueltaDeVueltaService, ChoferesConEstadoPipe],
  styleUrls: ['./vuelta-de-vuelta.component.css']
})
export class VueltaDeVueltaComponent implements OnInit, OnDestroy {
 
  @Input("servInput") servInput: Servicio; 
  
  formVueltas: FormGroup;

  checkVtaSubsc: Subscription;
  saveVtaSubsc: Subscription;
  updateVtaSubsc: Subscription;
  deleteVtaSubsc: Subscription;    

  ////////////////////////  
  choOcupIdaCombo=[]; 
  choOcupVtaCombo=[]; 

  filteredChoferesIda: Observable<ComboCho[]>;
  filteredChoferesVta: Observable<ComboCho[]>;
  ////////////////////////

  constructor(  public _vv: VueltaDeVueltaService,
                public _vs: VueltasService,
                private _us: UsuarioService,
                private fb: FormBuilder,
                private _ds: DiagrService,
                private pipeChofer: ChoferesConEstadoPipe,
                public _ms: ModalSiNoService   ) {
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

    /////////////////////////

    this.choOcupIdaCombo = this.pipeChofer.transform( this._vs.choferesOcupacion,
                                                      this._vv.serv.fechaHoraSalida,
                                                      this._vv.serv.fechaHoraLlegada );
    
    this.escucharChoferesIda();   
    //////////////////////////////////////    

  }

  

  private escucharChoferesIda(){
    this.filteredChoferesIda =  this.formVueltas.get('choferIda').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterChoferesIda(value))
    );     
  }

  private _filterChoferesIda(value: string): ComboCho[]{   
    const filterValue = value.toLowerCase();
    return this.choOcupIdaCombo.filter( ( option:any ) => option.nombreConTipo.toLowerCase().includes(filterValue));
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
    if ( this._vv.servRet ) { 

      this.formVueltas.get('internoVta').setValue(this._vv.getVehiculoVtaToForm() );         
      this.choOcupVtaCombo = this.pipeChofer.transform( this._vs.choferesOcupacion,
                                                        this._vv.serv.fechaHoraSalida,
                                                        this._vv.serv.fechaHoraLlegada );    
      this.escucharChoferesVta();
    }
  }

  private escucharChoferesVta(){
    this.filteredChoferesVta =  this.formVueltas.get('choferVta').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterChoferesVta(value))
    );     
  }

  private _filterChoferesVta(value: string): ComboCho[]{   
    const filterValue = value.toLowerCase();
    return this.choOcupVtaCombo.filter( ( option:any ) => option.nombreConTipo.toLowerCase().includes(filterValue));
  }  

  addChoferIda( choferes, choferSel ) {    
    this._vv.addChoferIda( choferes, choferSel )
    //Lo pongo a '' para que siga seleccionando
    this.resetComboChofer( 'choferIda' );    
  }  

  addChoferVta( choferes, choferSel ) {

    this._vv.addChoferVta( choferes, choferSel );
    //Lo pongo a null para que siga seleccionando
    this.resetComboChofer( 'choferVta' );   
  }  
  
  resetComboChofer( nombre ){
    this.formVueltas.get(nombre).setValue('');
  }

  removeChofer( choferes, index ) {
    choferes.splice(index, 1);
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
