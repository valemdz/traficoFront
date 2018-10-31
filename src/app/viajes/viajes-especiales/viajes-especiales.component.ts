import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { ViajeEspServive } from '../viajeEsp.service';
import { ViajeEspecial, VehiculoPK } from '../../domain';
import * as moment from 'moment';
import { MiUsuarioService } from '../../_services/mi.usuario.service';
import { ErrorService } from '../../_services/error.service';
import { ViajesEspListComponent } from '../viajes-esp-list/viajes-esp-list.component';




@Component({
  selector: 'app-viajes-especiales',
  templateUrl: './viajes-especiales.component.html',
  styleUrls: ['./viajes-especiales.component.css']
})
export class ViajesEspecialesComponent implements OnInit, OnChanges {

  @Input()
  viajeEspecial:ViajeEspecial;

  viajeForm: FormGroup;
  comboEscalasOrigen:any = [];
  comboEscalasDestino:any = [];
  comboProvincias:any = [];


  @ViewChild('closeBtn') closeBtn: ElementRef;


  constructor(  private fb: FormBuilder,
                private viajeServ: ViajeEspServive,
                private yo:MiUsuarioService,
                private ctrolError: ErrorService,
                private parent: ViajesEspListComponent ) {
    this.crearForm();
  }

  crearForm(){

     this.viajeForm = this.fb.group(
       {
         agenciaContratante:[ null, Validators.required],
         provOrigen: [ null, [Validators.required] ],
         origen:[null, [Validators.required]],
         provDestino: [ null, [Validators.required]],
         destino:[null,[Validators.required]],
         fSalida:[null,[Validators.required]],
         hSalida:[null, [Validators.required]],
         fRegreso:[null,[Validators.required]],
         hRegreso:[null,[Validators.required]],
         observaciones:[null ],
         empCodigo: [this.yo.user.empresa, [Validators.required]],
       }
     );

     this.viajeForm.valueChanges
     .subscribe( data => this.checkTodoFormValidity( data ) );
  }

  ngOnChanges() {
    this.viajeForm.reset({
      agenciaContratante: null,
      provOrigen:  null,
      origen: null,
      provDestino: null,
      destino:null,
      fSalida:null,
      hSalida:null,
      fRegreso:null,
      hRegreso:null,
      observaciones:null,
      empCodigo:this.yo.getEmpresa()
    });
 }


  checkTodoFormValidity( data?: any ){
    this.ctrolError.checkFormValidity( this.viajeForm, this.errMsgs,  this.translations );
  }

  erroresGrales:any=[];


   translations: any = {
     agenciaContratante: {  required: 'requerido.' },
     origen: { required: 'requerido.'  },
     destino: { required: 'requerido.' },
     fSalida: { required: 'requerido.' },
    hSalida: {  required: 'requerido.' },
    fRegreso: { required: 'requerido.' },
    hRegreso: { required: 'requerido.' },
    observaciones: { required: 'requerido.' },
    gral:{}
   };

   errMsgs: any = {
    agenciaContratante: [],
    origen: [],
    destino: [],
    fSalida: [],
    hSalida:[],
    fRegreso:[],
    hRegreso:[],
    observaciones:[]
  };

  ngOnInit() {
    //const MENDOZA='12';
    this. getProvincias();
    //this.getEscalasOrigen( MENDOZA );
    //this.getEscalasDestino( MENDOZA );
    //this.getVehiculos( this.yo.getEmpresa());

  }

  getEscalasOrigen( provincia:String ){
      this.viajeServ.getEscalasByProvincia( provincia)
        .subscribe( data => {
        this.comboEscalasOrigen = data;

    });
  }

  getEscalasDestino( provincia:String ){
    this.viajeServ.getEscalasByProvincia( provincia)
      .subscribe( data => {
      this.comboEscalasDestino = data;

    });
  }

  getProvincias(){
    this.viajeServ.getProvincias()
      .subscribe( data => {
      this.comboProvincias = data;
    });
  }



  onChangeProvOrigen( provOrigen:String ){
      this.getEscalasOrigen( provOrigen );
  }

  onChangeProvDestino( provOrigen:String ){
    this.getEscalasDestino( provOrigen );
  }



  createViaje(){

        this.ctrolError.validateAllFormFields( this.viajeForm) ;
        this.checkTodoFormValidity();

        if( this.viajeForm.valid ){
            this. salvarViaje();
        }

  }


  salvarViaje(){

      const formModel = this.viajeForm.value;

      let fechaHoraSalida = moment(formModel.fSalida + ' ' + formModel.hSalida, 'YYYY-MM-DD HH:mm');
      let fechaHoraRegreso = moment(formModel.fRegreso + ' ' + formModel.hRegreso, 'YYYY-MM-DD HH:mm');

      const viaje:ViajeEspecial = {
        id: 0,
        agenciaContratante: formModel.agenciaContratante ,
        fechaHoraSalida: fechaHoraSalida.format() as any,
        origen: formModel.origen,
        destino: formModel.destino,
        fechaHoraRegreso: fechaHoraRegreso.format() as any,
        observaciones: formModel.observaciones,
        empCodigo: formModel.empCodigo,
      };


      this.viajeServ.saveViajeEspecial( viaje ).subscribe( result => {
             this.parent.mostrarDetalle();
             this.parent.success('El Viaje Especial se agrego con exito!!!')
             this.closeModal();
          }, err => {
             this.ctrolError.tratarErrores(err, this.viajeForm, this.erroresGrales, this.translations['gral']);
             this.checkTodoFormValidity();
          } );

  }


  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }


}
