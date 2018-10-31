import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef,
  Inject, LOCALE_ID  } from '@angular/core';
import {Chofer, OpcCombo, Carnet} from '../../domain';
import {Tabs} from '../../shared/tabs/tabs';
import {Tab} from '../../shared/tabs/tab';
import {TabChild} from '../../shared/tabs/tab-child';
import {ChoferService} from '../chofer.service';
import * as Rx from "rxjs/Rx";

import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ChoferListComponent} from '../chofer-list/chofer-list.component';
import { ErrorService } from '../../_services/error.service';

import * as moment from 'moment';  
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-chofer-nuevo',
  templateUrl: './chofer-nuevo.component.html',
  styleUrls: ['./chofer-nuevo.component.css']
})


export class ChoferNuevoComponent implements OnInit, OnChanges, TabChild {

  @Input() chofer: Chofer; 
  @Input()
  nuevo:boolean;

  comboDocumentos:any=[];
  comboEstados:any=[];
  comboSanguineo:any=[];

  choferForm: FormGroup;

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(  private choferService: ChoferService, 
                private  fb: FormBuilder,
                private parent: ChoferListComponent,
                private ctrolError: ErrorService,
                @Inject(LOCALE_ID) public locale: string ) { 
     this.crearForm();
   } 


  ngOnInit() {   
    this.crearComboDocumentos();
    this.crearComboEstados();
    this.crearComboSanguineo();
  }

  tabActivated():void{
    console.log("tbn activada");
  }

  tabDisabled():void{
    console.log("tbn activada");
  }

  crearForm(){
    
    this.choferForm = this.fb.group({
      choferPK: this.fb.group({ cho_emp_codigo:['', Validators.required ] }),
      cho_estado:['',Validators.required],
      cho_legajo:['',Validators.required],
      cho_nombre:['',[Validators.required, Validators.maxLength(40)]],
      cho_doc_codigo:['',Validators.required],
      cho_documento: ['',[Validators.required, Validators.maxLength(11)]],
      cho_fecha_nacimiento:['',Validators.required],
      cho_grupo_sanguineo:['',Validators.required],
      cho_observaciones:['', Validators.maxLength(255)],
      cho_telefono:['',[Validators.required, Validators.maxLength(50)]],
      cho_telefono_emergencia: ['',[Validators.required, Validators.maxLength(50)]]
    });

    this.choferForm.valueChanges
    .subscribe( data => this.checkTodoFormValidity( data ) );
    
  }  

  erroresGrales:any=[];
  
  errMsgsPK: any = {  
    cho_emp_codigo:[],    
  };

  errMsgsResto: any = {      
    cho_estado: [],
    cho_legajo: [],             
    cho_nombre: [],              
    cho_doc_codigo: [],            
    cho_documento: [],
    cho_fecha_nacimiento: [],                           
    cho_grupo_sanguineo:[], 
    cho_observaciones:[],
    cho_telefono:[],
    cho_telefono_emergencia: []      
  };

  limpiarMensajes(){   

    this.errMsgsResto.cho_estado.length =0;
    this.errMsgsResto.cho_legajo.length =0;
    this.errMsgsResto.cho_nombre.length =0;
    this.errMsgsResto.cho_doc_codigo.length =0;
    this.errMsgsResto.cho_documento.length =0;
    this.errMsgsResto.cho_fecha_nacimiento.length =0;
    this.errMsgsResto.cho_grupo_sanguineo.length =0;
    this.errMsgsResto.cho_observaciones.length =0;
    this.errMsgsResto.cho_telefono.length =0;
    this.errMsgsResto.cho_telefono_emergencia.length =0;

    this.erroresGrales.length=0;
  }

  translations: any = {    
    cho_emp_codigo:{ required: 'Por favor especifique una Empresa' },    
    cho_estado: { required: 'Por favor especifique una estado'},
    cho_legajo: { required: 'Por favor especifique el legajo' },              
    cho_nombre: { required: 'Por favor especifique el nombre'},              
    cho_doc_codigo: { required: 'Por favor especifique tipo doc'},              
    cho_documento: { required: 'Por favor especifique un documento' }, 
    cho_fecha_nacimiento: { required: 'Por favor especifique Fecha Nac' },                            
    cho_grupo_sanguineo: { required: 'Por favor especifique grupo sanguineo'},                  
    cho_observaciones:{ required: 'Por favor especifique una observacion.'},
    cho_telefono: { required: 'Por favor especifique un telefono.'},
    cho_telefono_emergencia: { required: 'Por favor especifique un telefono de emergencia.'},                 
    gral:{}                              
  };


   ngOnChanges() {     

      let dp = new DatePipe( this.locale );
      let fecha = dp.transform( this.chofer.cho_fecha_nacimiento, 'yyyy-MM-dd');

      this.choferForm.reset({
        choferPK:{ cho_emp_codigo: this.chofer.choferPK.cho_emp_codigo },
        cho_estado: this.chofer.cho_estado,
        cho_legajo:this.chofer.cho_legajo,
        cho_nombre:this.chofer.cho_nombre,
        cho_doc_codigo:this.chofer.cho_doc_codigo,
        cho_documento: this.chofer.cho_documento,
        cho_fecha_nacimiento:fecha,
        cho_grupo_sanguineo:this.chofer.cho_grupo_sanguineo,
        cho_observaciones:this.chofer.cho_observaciones,
        cho_telefono:this.chofer.cho_telefono,
        cho_telefono_emergencia:  this.chofer.cho_telefono_emergencia
      });


   }  

  crearComboDocumentos(){
    this.comboDocumentos.push({ codigo:1, descripcion:'Dni'});
    this.comboDocumentos.push({ codigo:2, descripcion:'Cedula Federal'})
    this.comboDocumentos.push({ codigo:3, descripcion:'Cedula Provincial'});
    this.comboDocumentos.push({ codigo:4, descripcion:'Pasaporte'});
    this.comboDocumentos.push({ codigo:5, descripcion:'Cedula de Extranjeria'});
    this.comboDocumentos.push({ codigo:6, descripcion:'Libreta Enrolamiento'});
    this.comboDocumentos.push({ codigo:7, descripcion:'Documento Unico'});
    this.comboDocumentos.push({ codigo:8, descripcion:'Cedula de Chile'});
    this.comboDocumentos.push({ codigo:9, descripcion:'Salvoconducto'});
    this.comboDocumentos.push({ codigo:10, descripcion:'Cedula de Identidad'});
    this.comboDocumentos.push({ codigo:11, descripcion:'Sin Doc'});
    this.comboDocumentos.push({ codigo:12, descripcion:'Libreta Civica<'});
    this.comboDocumentos.push({ codigo:13, descripcion:'Cedula de Identidad Uruguaya'});
    this.comboDocumentos.push({ codigo:14, descripcion:'Carnet de Conducir'});
  }

  crearComboEstados(){
    this.comboEstados.push({codigo:0, descripcion:'HABILITADO'});
    this.comboEstados.push({codigo:1, descripcion:'DESHABILITADO'});    
  }

  crearComboSanguineo(){
    this.comboSanguineo.push({codigo:1, descripcion:'A+'});
    this.comboSanguineo.push({codigo:2, descripcion:'A-'});
    this.comboSanguineo.push({codigo:3, descripcion:'B+'});
    this.comboSanguineo.push({codigo:4, descripcion:'B-'});
    this.comboSanguineo.push({codigo:5, descripcion:'AB+'});
    this.comboSanguineo.push({codigo:6, descripcion:'AB-'});
    this.comboSanguineo.push({codigo:7, descripcion:'0+'});
    this.comboSanguineo.push({codigo:8, descripcion:'0-'});
  }

 

  checkTodoFormValidity( data?: any ){    
    let pk:any =  this.choferForm.get('choferPK');
    this.ctrolError.checkFormValidity( pk, this.errMsgsPK,  this.translations ); 
    this.ctrolError.checkFormValidity( this.choferForm, this.errMsgsResto,  this.translations );     
  }
    
  salvarChofer(){

    this.ctrolError.validateAllFormFields( this.choferForm) ;
    this.checkTodoFormValidity();

    if( this.choferForm.valid ){ 
        this. salvar();
    }

  }  

  salvar(){
    // this.create(chofer);   

    const cho:Chofer = this.prepararSalvar();
    
    if( this.nuevo ){

        this.choferService.create(cho).subscribe(result => {
          this.parent.mostrarDetalle();
          this.parent.success('El chofer se agrego con exito!!!')
          this.closeModal();

        }, err => {           
          this.limpiarMensajes(); 
          this.ctrolError.tratarErroresBackEnd(err, this.choferForm, this.erroresGrales, this.errMsgsResto );
          //this.checkTodoFormValidity(); 
        } ); 


    }else{

        this.choferService.update(cho).subscribe(result => {
          this.parent.mostrarDetalle();
          this.parent.success('El chofer se actualizo con exito!!!')
          this.closeModal();

        }, err => {          
          this.limpiarMensajes(); 
          this.ctrolError.tratarErroresBackEnd(err, this.choferForm, this.erroresGrales, this.errMsgsResto );
          //this.checkTodoFormValidity();
        } ); 

    } 
     
  }
  

  prepararSalvar():Chofer{
  
        const form = this.choferForm.getRawValue();
        
        //let fecha = moment(form.cho_fecha_nacimiento, 'DD-MM-YYYY');        
        let fecha = moment(form.cho_fecha_nacimiento,  'YYYY-MM-DD' );         
  
        const cho: Chofer = { 
          choferPK:{  cho_emp_codigo:form.choferPK.cho_emp_codigo ,   
                      cho_codigo:this.chofer.choferPK.cho_codigo}, 
          cho_estado: form.cho_estado,
          cho_legajo: form.cho_legajo,
          cho_nombre: form.cho_nombre,
          cho_doc_codigo: form.cho_doc_codigo,
          cho_documento: form.cho_documento,    
          cho_grupo_sanguineo: form.cho_grupo_sanguineo,
          cho_observaciones: form.cho_observaciones,
          cho_telefono: form.cho_telefono,
          cho_telefono_emergencia: form.cho_telefono_emergencia,
          cho_fecha_nacimiento: fecha.format() as any                                              
       };     

       
       return cho;  
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

}

