import { Component, Input, OnInit, Output, OnChanges, OnDestroy,
  ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {IncidenciaService} from '../incidencia.service';
import {Incidencia, OpcCombo} from '../../domain';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import {showLoading, hideLoading, doNothing} from '../../shared/commons';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { ErrorService } from '../../_services/error.service';
import { IncidenciaValidator } from '../incidencia-validator';
import { IncidenciaInyector } from '../IncidenciaInyector';
import { ComponenteBaseComponent } from '../../shared/componente.base.component';

import { AlertService } from '../../_services/alert.service';
import { RespuestaModalService } from '../../_services/respuesta.modal.service';

@Component({
 selector: 'app-incidencia',
 templateUrl: './incidencia.component.html',
 styleUrls: ['./incidencia.component.css']  
})
export class IncidenciaComponent implements  ComponenteBaseComponent, OnInit,  OnChanges, OnDestroy {

 @Input() data:any;  

 incidencia: Incidencia;
 nuevo:boolean;
 incidenciaForm; FormGroup;    
 comboTipos: any=[]; 

 @ViewChild('closeBtn') closeBtn: ElementRef;

 

 constructor( private incidenciaService:IncidenciaService,
              private fb: FormBuilder,               
              private ctrolError: ErrorService,
              private alertService: AlertService, 
              private respuestaModalService: RespuestaModalService ) {           
     this.crearForm();                 
     console.log('constructor Incid' );	      
  }

  isNuevo():boolean{
     return this.data && this.data.nuevo==true;
  }

  isViejo():boolean{
     return this.data && this.data.nuevo==false;
  }

  getDescripcion(){
     let object:any;      
     for (var i = 0; i <  this.comboTipos.length; i++) {  
       object = this.comboTipos[i];
       if( object.codigo == this.incidencia.in_tipo){
         return  object.descripcion;
       }
     }   
  }

   crearComboTipos(){
     this.comboTipos.push({ codigo:0, descripcion:'Unidades'});
     this.comboTipos.push({ codigo:1, descripcion: 'Choferes'});      
   } 


  crearForm(){ 
   
    this.incidenciaForm = this.fb.group({  
       codigo: [ '', [ Validators.required,  Validators.maxLength(10)]],      
       in_descripcion: ['', [ Validators.required,  Validators.maxLength(60) ] ],
       in_tipo:[ '', [ Validators.required, Validators.maxLength(1) ] ], /*0 unidades , 1 choferes */
       in_color:['', [Validators.required, Validators.maxLength(60)]],
       in_empresa: ['', [Validators.required, Validators.maxLength(4) ]]
     }, {validator: IncidenciaValidator.createValidator( this.incidenciaService, this ) });

     this.incidenciaForm.controls.in_empresa.disabled;

     this.incidenciaForm.valueChanges
         .subscribe( data => this.checkFormValidity() );         

  } 

 erroresGrales:any=[];

 errMsgs: any = {  
   codigo: [],   
   in_descripcion: [],
   in_tipo: [],
   in_color: [],
   in_empresa:[]
 };

 translations: any = { 
   codigo:{
     required: 'Por favor especifique un codigo.',
     maxlength:'La longitud maxima del campo es 10',
     codigoTomado: 'El codigo especificado ya ha sido ocupado'       
   },  
   in_descripcion: {
     required: 'Por favor especifique una descripcion.'
   },
   in_tipo: {
     required: 'Por favor seleccione un tipo.'
   },
   in_color: {
     required: 'Por favor seleccione un color.'
   },
   in_empresa:{
     required: 'Por favor especifique la empresa.',
     maxlength:'La longitud maxima del campo es 4'
   },
   gral: {
     codigoTomado: 'el codigo especificado ya ha sido ocupado'
   }
 };
 
 limpiarMensajes(){   

   this.errMsgs.codigo.length =0;
   this.errMsgs.in_descripcion.length =0;
   this.errMsgs.in_tipo.length =0;
   this.errMsgs.in_color.length =0;
   this.errMsgs.in_empresa.length =0;
   this.erroresGrales.length=0;
 }

 ngOnInit() {
   this.incidencia = this.data.incidencia;
   this.nuevo = this.data.nuevo;    
   this.crearComboTipos();        
   console.log('ngOnInit****************** Inci ' );  
   this.cargarValores();
   
 } 

 ngOnChanges() {           

    console.log('ngOnChanges');	 
    this.limpiarMensajes();     

    this.incidencia = this.data.incidencia;
    this.nuevo = this.data.nuevo;    

    this.incidenciaForm.reset({ 
       codigo: this.incidencia.codigo,       
       in_descripcion: this.incidencia.in_descripcion,
       in_tipo: this.incidencia.in_tipo,
       in_color: this.incidencia.in_color,
       in_empresa: this.incidencia.in_empresa

    }) 
    
    //mejor lo manejamos con el [readonly]="!nuevo"
    /*const method = this.nuevo ? 'enable':'disable';
    this.incidenciaForm.controls['codigo'][method]();*/
    
 }  

 cargarValores(){   

   this.incidenciaForm.reset({ 
     codigo: this.incidencia.codigo,       
     in_descripcion: this.incidencia.in_descripcion,
     in_tipo: this.incidencia.in_tipo,
     in_color: this.incidencia.in_color,
     in_empresa: this.incidencia.in_empresa

   }) 

 }

 checkFormValidity(){
   this.ctrolError.checkFormValidity(this.incidenciaForm, this.errMsgs,  this.translations);
 }

 createIncidencia(){         

     this.ctrolError.validateAllFormFields( this.incidenciaForm) ;
     this.checkFormValidity();

     if (this.incidenciaForm.valid ) {
       this.salvarIncidencia();
     }      
 } 

 salvarIncidencia(){      
    this.erroresGrales = [];
    const  incid: Incidencia = this.prepararSaveIncidencia();     

    if( this.nuevo ){        
       this.incidenciaService.create(incid).subscribe( result => {
           //this.parent.mostrarDetalle();
           //this.parent.success('La incidencia se agrego con exito!!!')
           this.alertService.success('La incidencia se agrego con exito!!!');
           this.closeModalYMostrarGrilla();
       }, err => {
         
         this.limpiarMensajes(); 
         this.ctrolError.tratarErroresBackEnd(err, this.incidenciaForm, this.erroresGrales, this.errMsgs );
         
       } );

    } else{
       this.incidenciaService.update(incid).subscribe( result => {
           //this.parent.mostrarDetalle();
           //this.parent.success('La incidencia se actualizo con exito!!!')
           this.alertService.success('La incidencia se actualizo con exito!!!');
           this.closeModalYMostrarGrilla();
         }, err => {
           this.limpiarMensajes(); 
           this.ctrolError.tratarErroresBackEnd(err, this.incidenciaForm, this.erroresGrales, this.errMsgs );
           
         }
      );
    }  

 }

 prepararSaveIncidencia(): Incidencia{   

   //const form = this.incidenciaForm.value;
   const form = this.incidenciaForm.getRawValue();  
   
   const incid: Incidencia = {
     id: this.incidencia.id,
     codigo: form.codigo,
     in_descripcion: form.in_descripcion,
     in_tipo: form.in_tipo,
     in_color: form.in_color,
     in_empresa: form.in_empresa,
   }    

   return incid;

 }

 sendMessage( mostrar:boolean): void {
   // send message to subscribers via observable subject
   //this.respuestaModalService.clearMessage();
   this.respuestaModalService.sendMessage(mostrar);
 }

 closeModalYMostrarGrilla(){
     
     this.sendMessage(true);
     this.ngOnDestroy();         
     this.closeBtn.nativeElement.click();    
 }    

 soloCerrar(){    
   this.ngOnDestroy();
   this.closeBtn.nativeElement.click();  
 }

 ngOnDestroy() { 
   console.log('ngOnDestroy Incid');	
 }

 

ngAfterContentInit(){
   //console.log('ngAfterContentInit Incid');
   //this.cargarValores();

}

ngAfterContentChecked(){
   //console.log('ngAfterContentChecked Incid');
}


ngAfterViewInit(){
   //console.log('ngAfterViewInit Incid');			
}

ngAfterViewChecked(){
   //console.log('ngAfterViewChecked Incid');	
}



}

