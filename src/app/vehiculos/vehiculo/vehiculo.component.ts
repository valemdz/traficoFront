import { Component, Input, Output,
  OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

import * as Rx from 'rxjs/Rx';

import {VehiculoService} from '../vehiculo.service';
import {Vehiculo} from '../../domain';
import {VehiculoOp, VehiculosArray} from '../../domain';
import {VehiculoListComponent} from '../vehiculo-list/vehiculo-list.component';
import { ErrorService } from '../../_services/error.service';
import * as moment from 'moment';
import {MiUsuarioService} from '../../_services/mi.usuario.service';
import {DatePipe} from '@angular/common';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnChanges, OnInit {

  @Input()
  vehiculo: Vehiculo;
  vehiculoForm: FormGroup;
  comboEstados:any=[];
  comboVeh:any=[];
  @Input()
  nuevo:boolean;

  @ViewChild('closeBtn') closeBtn: ElementRef;

  //private _miFecha='01-01-2017';

  constructor( private vehiculoService:VehiculoService,
               private fb: FormBuilder,
               private me: MiUsuarioService,
               private parent: VehiculoListComponent,
               private ctrolError: ErrorService
               ) {
      this.createForm();
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
    });

    this.vehiculoForm.valueChanges
    .subscribe( data => this.checkTodoFormValidity( data ) );

  }


  crearComboEstados(){
    this.comboEstados.push({codigo:0, descripcion:'HABILITADO'});
    this.comboEstados.push({codigo:1, descripcion:'DESHABILITADO'});
  }

  erroresGrales:any=[];

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
                  maxlength:'La longitud maxima de interno es 4'},
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


  ngOnInit() {
    this.crearComboEstados();
    this.getComboOpcionesVeh();
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
      this.vehiculoService.create$(vehi).subscribe(result => {
          this.parent.mostrarDetalle();
          this.parent.success('El vehiculo se agrego con exito');
          this.closeModal();

        }, err => {

          //this.limpiarMensajes();
          this.ctrolError.tratarErroresBackEnd(err, this.vehiculoForm, this.erroresGrales, this.errMsgs );

        }
      );
    }else{

        this.vehiculoService.update$( vehi ).subscribe( result => {
            this.parent.mostrarDetalle();
            this.parent.success('El vehiculo se actualizo con exito');
            this.closeModal();
          }, err => {

            //this.limpiarMensajes();
            this.ctrolError.tratarErroresBackEnd(err, this.vehiculoForm, this.erroresGrales, this.errMsgs );

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

    let opcionesVehArray:VehiculosArray;
    let observable: Observable<VehiculosArray>
            = this.vehiculoService.getOpcionesVeh$( this.me.user.empresa);

    observable.subscribe( data => {
        opcionesVehArray =  data;
        for (var _i = 0; _i < opcionesVehArray.comboMapas.length; _i++) {
          this.comboVeh.push(opcionesVehArray.comboMapas[_i]);
        }
     });

  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }


}

