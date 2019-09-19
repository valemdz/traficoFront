import { Component, Input, OnInit, OnChanges, OnDestroy,
  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { ErrorService, IncidenciaService, ModalService, UsuarioService } from 'src/app/services/service.index';
import { Incidencia, ConstantesGrales } from 'src/app/models/model.index';
import { ComponenteBaseComponent } from 'src/app/shared/modal/componente.base.component';
import { IncidenciaValidator } from 'src/app/validators/incidencia-validator';


@Component({
 selector: 'app-incidencia',
 templateUrl: './incidencia.component.html',
 styleUrls: []
})
export class IncidenciaComponent implements  ComponenteBaseComponent, OnInit,  OnChanges, OnDestroy {

 @Input() data:any;

 incidencia: Incidencia; 
 incidenciaForm; FormGroup;
 comboTipos: any=[];
 comboEstados: any = [];

 @ViewChild('closeBtn') closeBtn: ElementRef;

 constructor( private incidenciaService:IncidenciaService,
              private fb: FormBuilder,
              private ctrolError: ErrorService,              
              private _ms: ModalService,
              private _us: UsuarioService ) {
     this.crearForm();
  }

  ngOnInit() {
    this.incidencia = this.data.incidencia;    
    this.crearComboTipos();
    this.cargarValores();  
    this.comboEstados = ConstantesGrales.ESTADOS_BOOLEANOS;   
  }
 

  get nuevo():boolean{
     return this.incidencia && ( this.incidencia.id || -1 ) < 0;
  }  

  getDescripcion(){

    const tipoObject = this.comboTipos.find( ( tipo:any ) => 
                                               tipo.codigo == this.incidencia.tipo );
    return  tipoObject? tipoObject.descripcion:'';                                         
  }

   crearComboTipos(){
     this.comboTipos = ConstantesGrales.TIPOS_INCIDENCIA;
   }


  crearForm(){

    this.incidenciaForm = this.fb.group({
       codigo: [ '', [ Validators.required,  Validators.maxLength(10)]],
       descripcion: ['', [ Validators.required,  Validators.maxLength(60) ] ],
       tipo:[ '', [ Validators.required, Validators.maxLength(1) ] ], /*0 unidades , 1 personal */
       color:[''],
       activo:[''],
       empresa: ['', [Validators.required, Validators.maxLength(4) ]]
     }, {validator: IncidenciaValidator.createValidator( this.incidenciaService, this ) });

     this.incidenciaForm.controls.empresa.disabled;

     this.incidenciaForm.valueChanges
         .subscribe( data => this.checkFormValidity() );

  }

 errMsgs: any = {
   codigo: [],
   descripcion: [],
   tipo: [],
   color: [],
   empresa:[],
   activo:[]
 };

 translations: any = {
   codigo:{
     required: 'Por favor especifique un codigo.',
     maxlength:'La longitud maxima del campo es 10',
     codigoTomado: 'El codigo especificado ya ha sido ocupado'
   },
   descripcion: {
     required: 'Por favor especifique una descripcion.'
   },
   tipo: {
     required: 'Por favor seleccione un tipo.'
   },
   color: {
     required: 'Por favor seleccione un color.'
   },
   empresa:{
     required: 'Por favor especifique la empresa.',
     maxlength:'La longitud maxima del campo es 4'
   },
   gral: {
     codigoTomado: 'el codigo especificado ya ha sido ocupado'
   }
 };

 limpiarMensajes(){

   this.errMsgs.codigo.length =0;
   this.errMsgs.descripcion.length =0;
   this.errMsgs.tipo.length =0;
   this.errMsgs.color.length =0;
   this.errMsgs.empresa.length =0;
 }

 
 ngOnChanges() {    
    this.limpiarMensajes();
    this.incidencia = this.data.incidencia;    

    this.incidenciaForm.reset({
       codigo: this.incidencia.codigo,
       descripcion: this.incidencia.descripcion,
       tipo: this.incidencia.tipo,
       color: this.incidencia.color,
       activo: this.incidencia.activo,
       empresa: this.incidencia.empresa  || this._us.usuario.empresa
    });  
 }

 cargarValores() {

   this.incidenciaForm.reset({
     codigo: this.incidencia.codigo,
     descripcion: this.incidencia.descripcion,
     tipo: this.incidencia.tipo,
     color: this.incidencia.color,
     activo: this.incidencia.activo,
     empresa: this.incidencia.empresa || this._us.usuario.empresa

   });

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

    const  incid: Incidencia = this.prepararSaveIncidencia();   

    if ( !incid.id ) {
       this.incidenciaService.create$(incid).subscribe( result => {           
           this.closeModalYMostrarGrilla( result );
       }, err => {

         this.limpiarMensajes();
         this.ctrolError.tratarErroresBackEnd(err, this.incidenciaForm, this.errMsgs );

       } );

    } else {
       this.incidenciaService.update$(incid).subscribe( result => {          
           this.closeModalYMostrarGrilla( result );
         }, err => {
           this.limpiarMensajes();
           this.ctrolError.tratarErroresBackEnd(err, this.incidenciaForm, this.errMsgs );

         }
      );
    }

 }

 prepararSaveIncidencia(): Incidencia{

   //const form = this.incidenciaForm.value;
   const form = this.incidenciaForm.getRawValue();
   const incid: Incidencia = {
     id: this.incidencia.id  || 0,
     codigo: form.codigo,
     descripcion: form.descripcion,
     tipo: form.tipo,
     color: form.color,
     empresa: form.empresa,
     activo: form.activo
   }

   return incid;

 }
 
 closeModalYMostrarGrilla( incid: Incidencia ){
     this._ms.sendRespuesta({nuevo:this.nuevo,incidencia:incid});
     this.ngOnDestroy();
     this.closeBtn.nativeElement.click();
 }

 soloCerrar(){
   this.ngOnDestroy();
   this.closeBtn.nativeElement.click();
 }

 ngOnDestroy() {   
 }


}

