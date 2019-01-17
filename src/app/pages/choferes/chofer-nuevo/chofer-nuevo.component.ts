import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef,
  Inject, LOCALE_ID  } from '@angular/core';

import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import {DatePipe} from '@angular/common';
import { DOCUMENTOS, ESTADOS, GRUPOS_SANGUINEOS, FUNCION } from './constantes-chofer';
import { ChoferesComponent } from '../choferes.component';
import { ChoferService } from 'src/app/services/choferes/chofer.service';

import { TabChild } from 'src/app/shared/tabs/tab-child';
import { ErrorService } from 'src/app/services/service.index';
import { Chofer } from 'src/app/models/model.index';



@Component({
  selector: 'app-chofer-nuevo',
  templateUrl: './chofer-nuevo.component.html',
  styleUrls: ['./chofer-nuevo.component.css']
})


export class ChoferNuevoComponent implements OnInit, OnChanges, TabChild {

  @Input() chofer: Chofer;
  @Input()
  nuevo:boolean;

  comboDocumentos: any = [];
  comboFuncion: any = [];
  comboEstados: any = [];
  comboSanguineo: any = [];

  choferForm: FormGroup;

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(  private choferService: ChoferService,
                private  fb: FormBuilder,
                private parent: ChoferesComponent,
                private ctrolError: ErrorService,
                @Inject(LOCALE_ID) public locale: string ) {
     this.crearForm();
   }


  ngOnInit() {
    this.comboDocumentos = DOCUMENTOS;
    this.comboFuncion = FUNCION;
    this.comboEstados = ESTADOS;
    this.comboSanguineo = GRUPOS_SANGUINEOS;
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
      cho_chofer: ['', Validators.required],
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

  errMsgsPK: any = {
    cho_emp_codigo:[],
  };

  errMsgsResto: any = {
    cho_estado: [],
    cho_chofer: [],
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
    this.errMsgsResto.cho_chofer.length =0;
    this.errMsgsResto.cho_legajo.length =0;
    this.errMsgsResto.cho_nombre.length =0;
    this.errMsgsResto.cho_doc_codigo.length =0;
    this.errMsgsResto.cho_documento.length =0;
    this.errMsgsResto.cho_fecha_nacimiento.length =0;
    this.errMsgsResto.cho_grupo_sanguineo.length =0;
    this.errMsgsResto.cho_observaciones.length =0;
    this.errMsgsResto.cho_telefono.length =0;
    this.errMsgsResto.cho_telefono_emergencia.length =0;
  }

  translations: any = {
    cho_emp_codigo:{ required: 'Por favor especifique una Empresa' },
  cho_chofer: { required: 'Debe escificar la funcion del Personal'},
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
        cho_chofer: this.chofer.cho_chofer,
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


  checkTodoFormValidity( data?: any ) {
    let pk:any =  this.choferForm.get('choferPK');
    this.ctrolError.checkFormValidity( pk, this.errMsgsPK,  this.translations );
    this.ctrolError.checkFormValidity( this.choferForm, this.errMsgsResto,  this.translations );
  }

  salvarChofer() {

    this.ctrolError.validateAllFormFields( this.choferForm) ;
    this.checkTodoFormValidity();

    if( this.choferForm.valid ) {
        this. salvar();
    }

  }

  salvar() {
    // this.create(chofer);

    const cho: Chofer = this.prepararSalvar();

    if( this.nuevo ){
        this.choferService.create$(cho)
        .subscribe( this.okChoferSave.bind( this ), this.errorChofer.bind(this) );
    }else{

        this.choferService.update$(cho)
        .subscribe( this.okChoferUpdate.bind( this ), this.errorChofer.bind(this) );

    }

  }

  okChoferSave( ) {
    this.parent.mostrarDetalle();    
    this.closeModal();
  }

  okChoferUpdate() {
    this.parent.mostrarDetalle();    
    this.closeModal();
  }

  errorChofer( err ) {
    this.limpiarMensajes();
    this.ctrolError.tratarErroresBackEnd(err, this.choferForm, this.errMsgsResto );
  }


  prepararSalvar():Chofer{

        const form = this.choferForm.getRawValue();

        //let fecha = moment(form.cho_fecha_nacimiento, 'DD-MM-YYYY');
        let fecha = moment(form.cho_fecha_nacimiento,  'YYYY-MM-DD' );

        const cho: Chofer = {
          choferPK:{  cho_emp_codigo:form.choferPK.cho_emp_codigo ,
                      cho_codigo:this.chofer.choferPK.cho_codigo},
          cho_estado: form.cho_estado,
          cho_chofer: form.cho_chofer,
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

