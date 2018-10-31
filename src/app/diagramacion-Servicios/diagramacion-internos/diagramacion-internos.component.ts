import { DiagrService } from './../diagr.service';
import { ViajeEspServive } from './../../viajes/viajeEsp.service';
import { Servicios, VehiculoPK, VehiculoPKConDet, ViajeEspecial } from './../../domain';
import { OnInit, Component, ViewChild, Input, ElementRef, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MiUsuarioService } from '../../_services/mi.usuario.service';
import { ErrorService } from '../../_services/error.service';
import { DiagramacionListComponent } from '../diagramacion-list/diagramacion-list.component';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-diagramacion-internos',
  templateUrl: './diagramacion-internos.component.html',
  styleUrls: ['./diagramacion-internos.component.css']
})
export class DiagramacionInternosComponent implements OnInit, OnChanges {

  viajeEspecial: ViajeEspecial;
  @Input()
  servicio: Servicios;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  internoByViajeForm: FormGroup;
  comboVehiculos: any = [];
  erroresGrales: any = [];
  errMsgs: any = {
    vehiculoPK: []
  };
  translations: any = {
    vehiculoPK: {
      required: 'Por favor especifique un interno.'
    },
    gral: {
      codigoTomado: 'gral sin especificar'
    }
  };


  constructor(private fb: FormBuilder,
    private viajeServ: DiagrService,
    private viajeEspecialServ: ViajeEspServive,
    private yo: MiUsuarioService,
    private ctrolError: ErrorService,
    private parent: DiagramacionListComponent) {

    this.crearForm();

  }

  crearForm() {
    this.internoByViajeForm = this.fb.group({
      vehiculoPK: [null, [Validators.required]],
      interno: [null],
      detalleVehi: [null]
    });

    this.internoByViajeForm.valueChanges
      .subscribe(data => this.ctrolError.checkFormValidity(this.internoByViajeForm, this.errMsgs, this.translations, data));

  }

  ngOnInit() { }

 ngOnChanges(): void {
    this.borrarForm();
  //  this.getVehiculoByViaje();
   // this.getVehiculosLibresViajesEspec();
   // this.getVehiculosLibresServicios();
  }

  /*getVehiculoByViaje() {
    let vehiculoConDet;
    this.erroresGrales = [];

    if (this.internoByViajeForm) {
      let observable: Observable<Response> =
        this.viajeEspecialServ.getVehiculoByViaje(this.viajeEspecial.id);

      observable.subscribe(data => {
        vehiculoConDet = data;
        this.resetForm(vehiculoConDet);

      }, err => {
        if (err.status === 404) {
        }
      });
    }
  }*/

  resetForm(vehiculoConDet: VehiculoPKConDet) {
    this.internoByViajeForm.reset({
      vehiculoPK: JSON.stringify(vehiculoConDet.vehiculoPK),
      interno: vehiculoConDet.interno,
      detalleVehi: vehiculoConDet.detalles
    });

  }

  /*   getVehiculos( empCodigo: String ) {

         let observable: Observable<Response> =
         this.viajeServ.getVehiculos( this.viajeEspecial.id );

         observable.subscribe( data => {
           this.comboVehiculos = data;
           //Serializo el objeto clave
            for ( var i = 0; i < this.comboVehiculos.length; i++ ) {
             this.comboVehiculos[i].vehiculoPK = JSON.stringify( this.comboVehiculos[i].vehiculoPK );
            }

         }, err => {} );
     }*/

  // solo vehiculos libres de viajes especiales, hay q
  // hacer lo mismo en servicios y revisar en ambos lugares
    getVehiculosLibresViajesEspec() {

      let observable: Observable<any> =
      this.viajeEspecialServ.getVehiculosLibres( this.viajeEspecial.id );

      observable.subscribe( data => {
        this.comboVehiculos = data;
        //Serializo el objeto clave
         for ( let i = 0; i < this.comboVehiculos.length; i++ ) {
            this.comboVehiculos[i].vehiculoPK = JSON.stringify( this.comboVehiculos[i].vehiculoPK );
         }
      }, err => {} );

    }

  salvarInternoByViaje() {

    this.ctrolError.validateAllFormFields(this.internoByViajeForm);
    this.ctrolError.checkFormValidity(this.internoByViajeForm, this.errMsgs, this.translations);

    /*if (this.internoByViajeForm.valid ) {
      this.salvarInterno();
    }*/

  }
  // ver setVehiculo() en viajeEspecial
  /* salvarInterno() {
         const nuevoVehi = this.getVehiculoSalvar();
         this.servicio.setVehiculo( this.servicio.servicioPK,  nuevoVehi ).subscribe(result => {
           this.parent.mostrarDetalle();
           this.parent.success('El interno se asigno con exito!!!')
           this.closeModal();
         }, err => {

           const data = err.json();
           for ( let errorM of data ){
             this.errMsgs.vehiculoPK.push(errorM.mensajes);
           };
         } );
   }*/

  getVehiculoSalvar(): VehiculoPK {
    let formModel = this.internoByViajeForm.value;
    const vehiculoPK: VehiculoPK = JSON.parse(formModel.vehiculoPK);
    return vehiculoPK;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  tieneDetalle(): any {
    const formModel = this.internoByViajeForm.value;
    return formModel.detalleVehi != null && formModel.detalleVehi.length > 0;
  }

  detalleByIndex(): any {
    const formModel = this.internoByViajeForm.value;
    return formModel.detalleVehi;
  }

  detalleInterno(): any {
    const formModel = this.internoByViajeForm.value;
    return formModel.interno;
  }

  borrarForm() {

    this.internoByViajeForm.reset({
      vehiculoPK: null,
      interno: null,
      detalleVehi: null
    });
  }

}
