import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import * as moment from 'moment';
import {DatePipe} from '@angular/common';
import { UsuarioService, ErrorService, VehiculoService, ModalService } from 'src/app/services/service.index';
import { Vehiculo, CONSTANTES_VEHICULOS } from 'src/app/models/model.index';
import { ComponenteBaseComponent } from 'src/app/shared/modal/modal.index';
import { Subscription } from 'rxjs';
import { VehiculoCodigoValidator } from 'src/app/validators/vehiculoCodigo-validator';

declare var $: any

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: []
})
export class VehiculoComponent implements ComponenteBaseComponent, OnChanges, OnInit, OnDestroy {
 
  @Input() data:any;
  vehiculo: Vehiculo;
  vehiculoForm: FormGroup;
  comboEstados:any=[];
  comboVeh:any=[]; 

  comboSubs: Subscription;
  addSubs: Subscription;
  updateSubs: Subscription;

  //@ViewChild('closeBtn') closeBtn: ElementRef;  

  constructor( private vehiculoService:VehiculoService,
               private fb: FormBuilder,
               private _us: UsuarioService,               
               private ctrolError: ErrorService,
               private _ms: ModalService
               ) {
      this.createForm();
  }

  ngOnInit() {    
    
    this.crearComboEstados();
    this.getComboOpcionesVeh();
    this.vehiculo = this.data.vehiculo;    
    if( this.nuevo ){        
        this.vehiculoForm.get('vehiculoPK').setValue( this.vehiculo.vehiculoPK );
    }else{
        this.cargarFromVehiculo();         
    }
    $('#ventana').modal('show'); 

  }

  get nuevo():boolean{
    return this.vehiculo.vehiculoPK.vehInterno <= 0;
  }

  createForm(){
    this.vehiculoForm = this.fb.group({
      vehiculoPK: this.fb.group({ vehEmpCodigo: [ '', [Validators.required, Validators.maxLength(4)] ],
                                  vehInterno: ['', [Validators.required, Validators.maxLength(4)] ]
                                 }),
      vehEstado :  ['',[Validators.required ]],
      vehPatente: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(10)] ],
      vehMotor: ['',[Validators.required, Validators.maxLength(18)] ],
      vehChasis: ['',[Validators.required, Validators.maxLength(18)]],
      vehCarroceria: ['',[Validators.required, Validators.maxLength(20)]],
      vehMovilGps: [''],
      vehMpaCodigo: ['',[Validators.required, Validators.maxLength(3)]],
      vehVerificacionTecnica: ['',Validators.required]
    }, { validator: VehiculoCodigoValidator.createValidator( this.vehiculoService, this ) } );

    this.vehiculoForm.valueChanges
    .subscribe( data => this.checkTodoFormValidity( data ) );
  }

  crearComboEstados(){
    this.comboEstados = CONSTANTES_VEHICULOS.ESTADOS_VEHICULO;
  }

  errMsgsPK: any = {
    vehEmpCodigo:[],
    vehInterno:[]
  };

  errMsgs: any = {
    vehEstado:[],
    vehPatente: [],
    vehMotor: [],
    vehChasis: [],
    vehCarroceria: [],
    vehMovilGps: [],
    vehMpaCodigo: [],
    vehVerificacionTecnica:[]
  };

  translations: any = {
    vehEmpCodigo:{ required: 'Por favor especifique una Empresa.',
                  maxlength:'La longitud maxima de la empresa es 4'},
    vehInterno: { required: 'Por favor especifique un interno.',
                  maxlength:'La longitud maxima de interno es 4',
                  codigoTomado:'El interno ya esta ocupado'},                  
    vehEstado: { required: 'Por favor especifique un estado.',
                  maxlength:'La longitud maxima de interno es 4'},
    vehPatente: { required: 'Por favor especifique una patente.',
                  maxlength:'La longitud maxima de la patente es 10',
                  minlength:'La longitud minima de la patente es 6'},
    vehMotor: { required: 'Por favor especifique el motor.',
                  maxlength:'La longitud maxima del motor es 18'},
    vehChasis: { required: 'Por favor especifique el chasis.',
                  maxlength:'La longitud maxima de del chases es 18'},
    vehCarroceria: { required: 'Por favor especifique una carroceria.',
                  maxlength:'La longitud maxima de la carroceria es 20'},
    vehMovilGps: { required: 'Por favor especifique un interno.',
                  maxlength:'La longitud maxima de interno es 4'},
    vehMpaCodigo: { required: 'Por favor especifique un diseño de coche.',
                  maxlength:'La longitud maxima del diseño de coche es 3'},
    vehVerificacionTecnica: { required: 'Por favor especifique fecha de verificacion tecnica.',
                  maxlength:'La longitud maxima de fecha es 4'} ,
    gral:{internoTomado:'El interno ya ha sido utilizado'}
  };


  checkTodoFormValidity( data?: any ){
    let pk:any =  this.vehiculoForm.get('vehiculoPK');
    this.ctrolError.checkFormValidity( pk, this.errMsgsPK,  this.translations );
    this.ctrolError.checkFormValidity( this.vehiculoForm, this.errMsgs,  this.translations );

  }


  ngOnChanges() {
    this.cargarFromVehiculo();     
  }  

  cargarFromVehiculo(){

    let dp = new DatePipe(navigator.language);
    let fecha = dp.transform( this.vehiculo.vehVerificacionTecnica, 'yyyy-MM-dd');
    this.vehiculoForm.reset({
      vehiculoPK: this.vehiculo.vehiculoPK,
      vehEstado: this.vehiculo.vehEstado,
      vehPatente: this.vehiculo.vehPatente,
      vehMotor: this.vehiculo.vehMotor,
      vehChasis: this.vehiculo.vehChasis,
      vehCarroceria: this.vehiculo.vehCarroceria,
      vehMovilGps: this.vehiculo.vehMovilGps,
      vehMpaCodigo: this.vehiculo.vehMpaCodigo,
      vehVerificacionTecnica: fecha
    });

  }

  salvarVehiculo(){

    this.ctrolError.validateAllFormFields( this.vehiculoForm) ;
    this.checkTodoFormValidity();

    if( this.vehiculoForm.valid ){
      this.salvar();
    }

  }

  salvar(){

    const vehi:Vehiculo = this.prepararSaveVehiculo();

    if( this.nuevo ){
        this.addSubs = this.vehiculoService.create$(vehi).subscribe(result => {          
          this.closeModalYMostrarGrilla();
        }, err => {          
          this.ctrolError.tratarErroresBackEnd(err, this.vehiculoForm, this.errMsgs );
        }
      );
    }else{

         this.updateSubs = this.vehiculoService.update$( vehi ).subscribe( result => {            
            this.closeModalYMostrarGrilla();
          }, err => {            
            this.ctrolError.tratarErroresBackEnd(err, this.vehiculoForm, this.errMsgs );
          }
        );
    }

  }

  prepararSaveVehiculo(): Vehiculo {

    const formModel = this.vehiculoForm.getRawValue();
    //let fecha = moment(formModel.vehVerificacionTecnica, 'DD/MM/YYYY');
    let fecha = moment(formModel.vehVerificacionTecnica, 'YYYY-MM-DD');

    const vehi:Vehiculo ={
      vehiculoPK: formModel.vehiculoPK,
      vehEstado: formModel.vehEstado,
      vehPatente: formModel.vehPatente,
      vehMotor: formModel.vehMotor,
      vehChasis: formModel.vehChasis,
      vehCarroceria: formModel.vehCarroceria,
      vehMovilGps: formModel.vehMovilGps,
      vehMpaCodigo: formModel.vehMpaCodigo,
      vehVerificacionTecnica: fecha.format() as any
    }

    return vehi;
  }

  getComboOpcionesVeh(): void {   
    
    setTimeout( ()=>
      {
        this.comboSubs = this.vehiculoService
                          .getOpcionesVeh$( this._us.usuario.empresa)
                          .subscribe( data => {
                                                  this.comboVeh =  data;
                          });    
                            });                    
    
  }

  closeModalYMostrarGrilla(){
    this._ms.sendRespuesta(true);   
    this.soloCerrar();
  }

  soloCerrar(){
    this.ngOnDestroy();
    $('#ventana').modal('hide'); 
  }

  ngOnDestroy(): void {
      if( this.comboSubs ){ this.comboSubs.unsubscribe(); }
      if( this.addSubs ){ this.addSubs.unsubscribe(); }
      if( this.updateSubs ) { this.updateSubs.unsubscribe(); }  
  }


}

