import { Component, OnInit, OnDestroy } from '@angular/core';
import { VencimientoService } from 'src/app/services/vencimientos/vencimiento.service';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/service.index';
import { Vencimiento, TipoVencimiento, ConstantesGrales } from 'src/app/models/model.index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var swal;

@Component({
  selector: 'app-conf-vencimiento',
  templateUrl: './conf-vencimiento.component.html',
  styleUrls: []
})
export class ConfVencimientoComponent implements OnInit, OnDestroy {

  vencimientosForm:FormGroup;
  allVencimientos:Vencimiento[]=[];     
  tiposVencimientos: TipoVencimiento[] =[];

  vencimientosSubs: Subscription;
  deleteVencimientoSubs: Subscription;
  
  vencimientosLoaded=false;

  constructor( public _vs: VencimientoService,
               public _us: UsuarioService,
               public fb: FormBuilder,
               public router: Router ) { 
      this.crearForm();      
  }

  crearForm(){
    this.vencimientosForm = this.fb.group({ 
      id: 0,
      empresa: this._us.usuario.empresa,
      tipoVencimiento: [null, [Validators.required]],
      activo: [ false, [Validators.required] ],
      cantidadAnticipacion: [ null, [Validators.required]],      
    });
  }     
  
  limpiar(){
    this.vencimientosForm.reset({
      id: 0,
      empresa: this._us.usuario.empresa,
      tipoVencimiento: null,
      activo:  false,
      cantidadAnticipacion:  null,      
    });     
  }

  ngOnInit() {
      this.getVencimientos();
  } 
  
  getVencimientos(){
    this.vencimientosSubs = this._vs.getVencimientos$( this._us.usuario.empresa)
    .subscribe( this.okVencimientos.bind( this ), );
  }

  okVencimientos( resp ){
    this.allVencimientos = resp.vencimientos; 
    this.tiposVencimientos = resp.tiposVencimientos;                   
    this.vencimientosLoaded = true;
  }

  errorVencimientos( err ){
    this.vencimientosLoaded = true;
  }

  toEstado():boolean{  
    return ( this.vencimientosForm.controls.activo.value === ConstantesGrales.HABILITADO_BOOLEAN )?true:false;
  }
  cambiarEstado(){
    
    if( this.vencimientosForm.controls.activo.value === ConstantesGrales.HABILITADO_BOOLEAN ){
      this.vencimientosForm.get('activo').setValue( ConstantesGrales.DESHABILITADO_BOOLEAN );
    }else{
      this.vencimientosForm.get('activo').setValue( ConstantesGrales.HABILITADO_BOOLEAN );
    }
  }

  guardarVencimiento(){
    if( this.vencimientosForm.valid ){
      this._vs.saveVencimiento$( this.prepararVencimiento() )
          .subscribe( () =>  { 
                                  this.limpiar();
                                  this.getVencimientos();                                                                    
                                });
    }    
  }

  onCancel(){
    this.router.navigate(['wellcome']);
  }

  prepararVencimiento(){
    let form = this.vencimientosForm.getRawValue(); 

    const venc: Vencimiento = {
      activo: form.activo,
      cantidadAnticipacion: form.cantidadAnticipacion,      
      empresa: form.empresa,
      id:form.id,
      tipoVencimiento: this.findTipoVencimiento( form.tipoVencimiento )
    }   
    return venc;
  }

  findTipoVencimiento( id: number ){        
    return this.tiposVencimientos.find( v => v.id == id);  
  }

  deleteVencimiento( vencimiento: Vencimiento ){
    swal({
      title: "Eliminación",
      text: "Esta seguro que desea eliminar el vencimiento: " 
              + vencimiento.tipoVencimiento.nombreEntidad 
              + " => " + vencimiento.tipoVencimiento.descNombreCampo,
      icon: "warning",
      buttons: true,
      dangerMode: true,
      })
      .then( willDelete => {
          if (willDelete) {
              this.deleteVencimientoSubs = this._vs.deleteVencimiento$( vencimiento.id )
                  .subscribe( () => this.getVencimientos() );   
          }
      });              
  }

  editarVencimiento( vencimiento: Vencimiento ){
    this.setVencimientoToForm( vencimiento );
  }

  setVencimientoToForm( vencimiento: Vencimiento ){
    this.vencimientosForm.reset({
      id: vencimiento.id,
      empresa: vencimiento.empresa,
      tipoVencimiento: vencimiento.tipoVencimiento.id,
      activo:  vencimiento.activo,
      cantidadAnticipacion:  vencimiento.cantidadAnticipacion,
     });     
  }

  ngOnDestroy(): void {
    if( this.vencimientosSubs )  { this.vencimientosSubs.unsubscribe(); }  
    if( this.deleteVencimientoSubs )  { this.deleteVencimientoSubs.unsubscribe();}
  }  

}
