import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef,
  Inject, LOCALE_ID, OnDestroy  } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import {DatePipe} from '@angular/common';
import { ChoferService } from 'src/app/services/choferes/chofer.service';

import { TabChild } from 'src/app/shared/tabs/tab-child';
import { ErrorService, ModalService } from 'src/app/services/service.index';
import { Chofer, CONSTANTES_CHOFER } from 'src/app/models/model.index';

declare var $: any;


@Component({
  selector: 'app-chofer-nuevo',
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.css']
})


export class ChoferComponent implements OnInit, OnChanges, OnDestroy, TabChild {  

  @Input() data:any;

  chofer: Chofer;
  nuevo:boolean;

  comboDocumentos: any = [];
  comboFuncion: any = [];
  comboEstados: any = [];
  comboSanguineo: any = [];

  choferForm: FormGroup;

  //@ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(  private choferService: ChoferService,
                private  fb: FormBuilder,                
                private ctrolError: ErrorService,
                private _ms: ModalService,
                @Inject(LOCALE_ID) public locale: string ) {
     this.crearForm();
   }


  ngOnInit() {   

    $('#ventana').modal('show'); 

    this.comboDocumentos = CONSTANTES_CHOFER.DOCUMENTOS;
    this.comboFuncion = CONSTANTES_CHOFER.FUNCION;
    this.comboEstados = CONSTANTES_CHOFER.ESTADOS;
    this.comboSanguineo = CONSTANTES_CHOFER.GRUPOS_SANGUINEOS;

    this.chofer = this.data.chofer;
    this.nuevo = this.data.nuevo;

    this. resetForm();

  }

  tabActivated():void{
    console.log("tbn activada");
  }

  tabDisabled():void{
    console.log("tbn activada");
  }

  crearForm(){

    this.choferForm = this.fb.group({
      choferPK: this.fb.group({ empCodigo:['', Validators.required ] }),
      tipoChofer: ['', Validators.required],
      estado:['',Validators.required],
      legajo:['',Validators.required],
      nombre:['',[Validators.required, Validators.maxLength(40)]],
      codigoDoc:['',Validators.required],
      documento: ['',[Validators.required, Validators.maxLength(11)]],
      fechaNacimiento:['',Validators.required],
      grupoSanguineo:[''],
      observaciones:['', Validators.maxLength(255)],
      telefono:['',[Validators.required, Validators.maxLength(50)]],
      telefonoEmergencia: ['',[Validators.required, Validators.maxLength(50)]],
      idAux: ['']
    });

    this.choferForm.valueChanges
    .subscribe( data => this.checkTodoFormValidity( data ) );

  }

  resetForm(){
    let dp = new DatePipe( this.locale );
    let fecha = dp.transform( this.chofer.fechaNacimiento, 'yyyy-MM-dd');

    this.choferForm.reset({
      choferPK:{ empCodigo: this.chofer.choferPK.empCodigo },
      estado: this.chofer.estado,
      tipoChofer: this.chofer.tipoChofer,
      legajo:this.chofer.legajo,
      nombre:this.chofer.nombre,
      codigoDoc:this.chofer.codigoDoc,
      documento: this.chofer.documento,
      fechaNacimiento:fecha,
      grupoSanguineo:this.chofer.grupoSanguineo,
      observaciones:this.chofer.observaciones,
      telefono:this.chofer.telefono,
      telefonoEmergencia:  this.chofer.telefonoEmergencia,
      idAux: this.chofer.idAux
    });
 }

  errMsgsPK: any = {
    empCodigo:[],
  };

  errMsgsResto: any = {
    estado: [],
    tipoChofer: [],
    legajo: [],
    nombre: [],
    codigoDoc: [],
    documento: [],
    fechaNacimiento: [],
    grupoSanguineo:[],
    observaciones:[],
    telefono:[],
    telefonoEmergencia: []
  };

  limpiarMensajes(){

    this.errMsgsResto.estado.length =0;
    this.errMsgsResto.tipoChofer.length =0;
    this.errMsgsResto.legajo.length =0;
    this.errMsgsResto.nombre.length =0;
    this.errMsgsResto.codigoDoc.length =0;
    this.errMsgsResto.documento.length =0;
    this.errMsgsResto.fechaNacimiento.length =0;
    this.errMsgsResto.grupoSanguineo.length =0;
    this.errMsgsResto.observaciones.length =0;
    this.errMsgsResto.telefono.length =0;
    this.errMsgsResto.telefonoEmergencia.length =0;
  }

  translations: any = {
    empCodigo:{ required: 'Por favor especifique una Empresa' },
    tipoChofer: { required: 'Debe escificar la funcion del Personal'},
    estado: { required: 'Por favor especifique una estado'},
    legajo: { required: 'Por favor especifique el legajo' },
    nombre: { required: 'Por favor especifique el nombre'},
    codigoDoc: { required: 'Por favor especifique tipo doc'},
    documento: { required: 'Por favor especifique un documento' },
    fechaNacimiento: { required: 'Por favor especifique Fecha Nac' },
    grupoSanguineo: { required: 'Por favor especifique grupo sanguineo'},
    observaciones:{ required: 'Por favor especifique una observacion.'},
    telefono: { required: 'Por favor especifique un telefono.'},
    telefonoEmergencia: { required: 'Por favor especifique un telefono de emergencia.'},
    gral:{}
  };


   ngOnChanges() {
      this.resetForm();    
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
        .subscribe( this.okChofer.bind( this ), this.errorChofer.bind(this) );
    }else{

        this.choferService.update$(cho)
        .subscribe( this.okChofer.bind( this ), this.errorChofer.bind(this) );

    }

  }

  okChofer( cho) {   
    this._ms.sendRespuesta({ nuevo:this.nuevo, chofer:cho});    
    this.soloCerrar();
  }



  errorChofer( err ) {
    this.limpiarMensajes();
    this.ctrolError.tratarErroresBackEnd(err, this.choferForm, this.errMsgsResto );
  }


  prepararSalvar():Chofer{

        const form = this.choferForm.getRawValue();

        //let fecha = moment(form.cho_fecha_nacimiento, 'DD-MM-YYYY');
        let fecha = moment(form.fechaNacimiento,  'YYYY-MM-DD' );

        let foto = (this.chofer != null)?this.chofer.foto:null;

        const cho: Chofer = {
          choferPK:{  empCodigo:form.choferPK.empCodigo ,
                      codigo:this.chofer.choferPK.codigo},
          estado: form.estado,
          tipoChofer: form.tipoChofer,
          legajo: form.legajo,
          nombre: form.nombre,
          codigoDoc: form.codigoDoc,
          documento: form.documento,
          grupoSanguineo: form.grupoSanguineo,
          observaciones: form.observaciones,
          telefono: form.telefono,
          telefonoEmergencia: form.telefonoEmergencia,
          fechaNacimiento: fecha.format() as any,
          idAux: form.idAux,
          foto: foto
       };


       return cho;
  }

  /*private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }*/

  ngOnDestroy(): void {
   
  }

  soloCerrar(){
    this.ngOnDestroy();
    $('#ventana').modal('hide'); 
  }


}

