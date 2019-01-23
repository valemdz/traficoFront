import { Component, Input, OnInit, OnChanges, OnDestroy,
  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { ErrorService, IncidenciaService, ModalService, UsuarioService } from 'src/app/services/service.index';
import { Incidencia, Constantes } from 'src/app/models/model.index';
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
  }
 

  get nuevo():boolean{
     return this.incidencia && ( this.incidencia.id || -1 ) < 0;
  }  

  getDescripcion(){

    const tipoObject = this.comboTipos.find( ( tipo:any ) => 
                                               tipo.codigo == this.incidencia.in_tipo );
    return  tipoObject? tipoObject.descripcion:'';                                         
  }

   crearComboTipos(){
     this.comboTipos = Constantes.TIPOS_INCIDENCIA;
   }


  crearForm(){

    this.incidenciaForm = this.fb.group({
       codigo: [ '', [ Validators.required,  Validators.maxLength(10)]],
       in_descripcion: ['', [ Validators.required,  Validators.maxLength(60) ] ],
       in_tipo:[ '', [ Validators.required, Validators.maxLength(1) ] ], /*0 unidades , 1 personal */
       in_color:[''],
       in_empresa: ['', [Validators.required, Validators.maxLength(4) ]]
     }, {validator: IncidenciaValidator.createValidator( this.incidenciaService, this ) });

     this.incidenciaForm.controls.in_empresa.disabled;

     this.incidenciaForm.valueChanges
         .subscribe( data => this.checkFormValidity() );

  }

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
 }

 
 ngOnChanges() {    
    this.limpiarMensajes();
    this.incidencia = this.data.incidencia;    

    this.incidenciaForm.reset({
       codigo: this.incidencia.codigo,
       in_descripcion: this.incidencia.in_descripcion,
       in_tipo: this.incidencia.in_tipo,
       in_color: this.incidencia.in_color,
       in_empresa: this.incidencia.in_empresa  || this._us.usuario.empresa
    });  
 }

 cargarValores() {

   this.incidenciaForm.reset({
     codigo: this.incidencia.codigo,
     in_descripcion: this.incidencia.in_descripcion,
     in_tipo: this.incidencia.in_tipo,
     in_color: this.incidencia.in_color,
     in_empresa: this.incidencia.in_empresa || this._us.usuario.empresa

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
           this.closeModalYMostrarGrilla();
       }, err => {

         this.limpiarMensajes();
         this.ctrolError.tratarErroresBackEnd(err, this.incidenciaForm, this.errMsgs );

       } );

    } else {
       this.incidenciaService.update$(incid).subscribe( result => {          
           this.closeModalYMostrarGrilla();
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
     in_descripcion: form.in_descripcion,
     in_tipo: form.in_tipo,
     in_color: form.in_color,
     in_empresa: form.in_empresa,
   }

   return incid;

 }
 
 closeModalYMostrarGrilla(){
     this._ms.sendRespuesta(true);
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

