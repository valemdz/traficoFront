import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { ViajeEspServive } from '../viajeEsp.service';
import * as Rx from "rxjs/Rx";
import { ViajeEspecial } from '../../domain';
import * as moment from 'moment';
import { ViajesEspListComponent } from  '../viajes-esp-list/viajes-esp-list.component';
import { Observable } from 'rxjs';
import { UsuarioService, ErrorService } from 'src/app/services/service.index';




@Component({
  selector: 'app-viaje-edicion',
  templateUrl: './viaje-edicion.component.html',
  styleUrls: ['./viaje-edicion.component.css']
})
export class ViajeEdicionComponent implements OnInit {

  @Input()
  viajeEspecial:ViajeEspecial;

  viajeForm: FormGroup;
  comboEscalasOrigen:any = [];
  comboEscalasDestino:any = [];
  comboProvincias:any = [];


  @ViewChild('closeBtn') closeBtn: ElementRef;


  constructor(  private fb: FormBuilder,
                private viajeServ: ViajeEspServive,
                private _us: UsuarioService,
                private ctrolError: ErrorService,
                private parent: ViajesEspListComponent ) {
    this.crearForm();
  }

  crearForm(){

     this.viajeForm = this.fb.group(
       {
         id:[null],
         agenciaContratante:[ null, Validators.required],
         origen:[null, [Validators.required]],
         destino:[null,[Validators.required]],
         fSalida:[null,[Validators.required]],
         fRegreso:[null,[Validators.required]],
         observaciones:[null ],
         empCodigo: [this._us.usuario.empresa, [Validators.required]],
       }
     );

     this.viajeForm.valueChanges
     .subscribe( data => this.checkTodoFormValidity( data ) );
  }

  ngOnChanges() {

    let fechaHoraSalida = moment(new Date( this.viajeEspecial.fechaHoraSalida )).format('DD/MM/YYYY HH:mm');
    let fechaHoraRegreso = moment(new Date( this.viajeEspecial.fechaHoraRegreso )).format('DD/MM/YYYY HH:mm');

    this.viajeForm.reset({
      id: this.viajeEspecial.id,
      agenciaContratante: this.viajeEspecial.agenciaContratante,
      origen: this.viajeEspecial.origen,
      destino:this.viajeEspecial.destino,
      fSalida: fechaHoraSalida,
      fRegreso:fechaHoraRegreso,
      observaciones: this.viajeEspecial.observaciones,
      empCodigo:this._us.usuario.empresa
    });
 }


  checkTodoFormValidity( data?: any ){
    this.ctrolError.checkFormValidity( this.viajeForm, this.errMsgs,  this.translations );
  }

  erroresGrales:any=[];


   translations: any = {
     agenciaContratante: {
       required: 'requerido.'
     },
     origen: {
       required: 'requerido.'
     },
     destino: {
       required: 'requerido.'
     },
     fSalida: {
      required: 'requerido.'
    },
    fRegreso: {
      required: 'requerido.'
    },
    observaciones: {
      required: 'requerido.'
    },
    gral:{}
   };


   errMsgs: any = {
    id:[],
    agenciaContratante: [],
    origen: [],
    destino: [],
    fSalida: [],
    fRegreso:[],
    observaciones:[]
  };

  ngOnInit() {

  }

  getProvincias(){
    let observable: Observable<any> =
    this.viajeServ.getProvincias();
      observable.subscribe( data => {
      this.comboProvincias = data;

    });
  }

  createViaje(){

        this.ctrolError.validateAllFormFields( this.viajeForm) ;
        this.checkTodoFormValidity();

        if( this.viajeForm.valid ){
            this.salvarComentariosViaje();
        }
  }


  salvarComentariosViaje(){

      const formModel = this.viajeForm.value;
      this.viajeEspecial.observaciones =  formModel.observaciones;

      this.viajeServ.saveComentariosViajeEspecial(this.viajeEspecial.id, this.viajeEspecial ).subscribe( result => {
             //this.parent.mostrarDetalle();
             this.parent.success('Las observaciones se agregaron con exito!!!')
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
