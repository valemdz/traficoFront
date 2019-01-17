import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
import {Response} from '@angular/http';
import { Observable} from 'rxjs';
import { ViajesEspListComponent } from  '../viajes-esp-list/viajes-esp-list.component';
import { UsuarioService, ErrorService, ViajeEspServive } from 'src/app/services/service.index';
import { ViajeEspecial, VehiculoPK, VehiculoPKConDet } from 'src/app/models/model.index';



@Component({
  selector: 'app-diagr-interno',
  templateUrl: './diagr-interno.component.html',
  styleUrls: ['./diagr-interno.component.css']
})
export class DiagrInternoComponent implements OnInit {

  @Input()
  viajeEspecial:ViajeEspecial;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  internoByViajeForm: FormGroup;
  comboVehiculos:any=[];


  constructor(   private fb: FormBuilder,
    private viajeServ: ViajeEspServive,
    private _us: UsuarioService,
    private ctrolError: ErrorService,
    private parent: ViajesEspListComponent ) {

      this.crearForm();

    }

  crearForm(){
    this.internoByViajeForm = this.fb.group({
      vehiculoPK : [null, [ Validators.required ]],
      interno:[null],
      detalleVehi: [null]
    })

    this.internoByViajeForm.valueChanges
    .subscribe( data => this.ctrolError.checkFormValidity(this.internoByViajeForm, this.errMsgs,  this.translations, data ) );

  }

  ngOnInit() {
    //this.getVehiculos( this.yo.getEmpresa() );
  }

  erroresGrales:any=[];

  errMsgs: any = {
    vehiculoPK: []
  };

  translations: any = {
    vehiculoPK:{
      required: 'Por favor especifique un interno.'
    },
    gral: {
      codigoTomado: 'gral sin especificar'
    }
  };

  ngOnChanges(){
        this.borrarForm();
         //this.getVehiculos( this.yo.getEmpresa());
        this.getVehiculoByViaje();
        this.getVehiculosLibres();

  }

  getVehiculoByViaje(){
      let vehiculoConDet;
      this.erroresGrales = [];

      if( this.internoByViajeForm ){
          let observable: Observable<Response> =
          this.viajeServ.getVehiculoByViaje( this.viajeEspecial.id );

          observable.subscribe( data => {
            vehiculoConDet = data;
            this.resetForm(vehiculoConDet);

          }, err => {
              if ( err.status == 404 ) {
              }
          });
      }
  }

  resetForm( vehiculoConDet: VehiculoPKConDet ){
    this.internoByViajeForm.reset({
      vehiculoPK: JSON.stringify( vehiculoConDet.vehiculoPK),
      interno: vehiculoConDet.interno,
      detalleVehi:  vehiculoConDet.detalles
    });

  }

  getVehiculos( empCodigo: String ) {

      let observable: Observable<Response> =
      this.viajeServ.getVehiculos( this.viajeEspecial.id );

      observable.subscribe( data => {
        this.comboVehiculos = data;
        //Serializo el objeto clave
         for( var i:number=0; i < this.comboVehiculos.length; i++ ){
          this.comboVehiculos[i].vehiculoPK = JSON.stringify( this.comboVehiculos[i].vehiculoPK );
         }

      }, err => {
        //this.ctrolError.tratarErrores(err, this.choferForm, this.erroresGrales, this.translations['gral']);
        //this.checkTodoFormValidity();
      } );
  }

  getVehiculosLibres(){

    let observable: Observable<Response> =
    this.viajeServ.getVehiculosLibres( this.viajeEspecial.id );

    observable.subscribe( data => {
      this.comboVehiculos = data;
      //Serializo el objeto clave
       for( var i:number=0; i < this.comboVehiculos.length; i++ ){
          this.comboVehiculos[i].vehiculoPK = JSON.stringify( this.comboVehiculos[i].vehiculoPK );
       }
    }, err => {
      //this.ctrolError.tratarErrores(err, this.choferForm, this.erroresGrales, this.translations['gral']);
      //this.checkTodoFormValidity();
    } );

  }

  salvarInternoByViaje(){

    this.ctrolError.validateAllFormFields( this.internoByViajeForm) ;
    this.ctrolError.checkFormValidity(this.internoByViajeForm, this.errMsgs,  this.translations);

    if (this.internoByViajeForm.valid ) {
      this.salvarInterno();
    }

  }

  salvarInterno(){
        const nuevoVehi = this.getVehiculoSalvar();
        this.viajeServ.setVehiculo( this.viajeEspecial.id,  nuevoVehi ).subscribe(result => {
          this.parent.mostrarDetalle();
          this.parent.success('El interno se asigno con exito!!!')
          this.closeModal();
        }, err => {

          const data = err.json();
          for( let errorM of data ){
            this.errMsgs.vehiculoPK.push(errorM.mensajes);
          };

          //this.ctrolError.tratarErrores(err, this.internoByViajeForm, this.erroresGrales, this.translations['gral']);
          //this.checkTodoFormValidity();
        } );
  }

  getVehiculoSalvar(): VehiculoPK{
    let formModel = this.internoByViajeForm.value;
    const vehiculoPK: VehiculoPK = JSON.parse(  formModel.vehiculoPK);
    return vehiculoPK;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  tieneDetalle():any{
    const formModel = this.internoByViajeForm.value;
    return formModel.detalleVehi != null && formModel.detalleVehi.length > 0;
  }

  detalleByIndex( ):any{
    const formModel = this.internoByViajeForm.value;
    return formModel.detalleVehi;
  }

  detalleInterno():any{
    const formModel = this.internoByViajeForm.value;
    return formModel.interno;
  }

  borrarForm(){

    this.internoByViajeForm.reset({
      vehiculoPK: null,
      interno: null,
      detalleVehi: null
    });

  }



}
