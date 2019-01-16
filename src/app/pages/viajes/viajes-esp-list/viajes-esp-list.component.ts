import { DiagrAuxiliaresComponent } from './../diagr-auxiliares/diagr-auxiliares.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
// import * as Rx from "rxjs/Rx";
import { ViajeEspServive } from '../viajeEsp.service';
import { Table } from '../../shared/table';
import { ViajeEspecial, ViajeEspecialList, VehiculoPK, ChoferPK } from '../../domain';
import { PaginationPage, PaginationPropertySort } from '../../shared/pagination';
import { ModalService } from '../../ventanas-modales/modal.service';
import { Subscription } from 'rxjs';
import { DiagrChoferesComponent } from '../diagr-choferes/diagr-choferes.component';
import { VentanasModalesModule } from '../../ventanas-modales/ventanas-modales.module';
import { AlertService, UsuarioService } from 'src/app/services/service.index';




@Component({
  selector: 'app-viajes-esp-list',
  templateUrl: './viajes-esp-list.component.html',
  styleUrls: ['./viajes-esp-list.component.css']
})
export class ViajesEspListComponent implements OnInit, OnDestroy {


  viajePage: PaginationPage<any>;
  self: Table<any>;
  viajeForm: FormGroup;
  comboVehiculos: any = [];
  viajeNuevo: ViajeEspecial;

  listadoSubs: Subscription;

  viajeComent;
  viajeInterno;
  currentViaje;

  constructor(  private fb: FormBuilder,
                private viajeServ: ViajeEspServive,
                private alertService: AlertService,
                private _us: UsuarioService,
                private modalService: ModalService  ) {
      this.crearForm();
  }


  crearForm() {
   /* this.viajeForm = this.fb.group({
      fInicio: [null,  [ Validators.required ]],
      hInicio:[null,  [ Validators.required ]],
      fFin:[null, [ Validators.required ]],
      hFin:[null , [ Validators.required ] ] }) ;*/

      this.viajeForm = this.fb.group({
        fInicio: ['2017-12-01',  [ Validators.required ]],
        fFin: ['2017-12-31', [ Validators.required ]] });

   }

  ngOnInit() {

  }

  ngOnDestroy(): void {
      if ( this.listadoSubs ) { this.listadoSubs.unsubscribe(); }
  }


  buscarViajesEspeciales() {
    this.mostrarDetalle();
  }

  getInicio(): any {
    const formModel = this.viajeForm.value;
    return  formModel.fInicio;
  }

  getFin(): any {
    const formModel = this.viajeForm.value;
    return  formModel.fFin;
  }

  /*getViajesEspeciales( empresa:String, inicio:any, fin:any ){

    let observable: Observable<Response> =
    this.viajeServ.getViajesEspeciales( empresa, this.getInicio(),  this.getFin() );
      observable.subscribe( data => {
      //this.comboEscalasDestino = data;

    });
  }*/

  mostrarDetalle(): void {
    this.fetchPage(0, 10, null);
  }


fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort) {
    this.listadoSubs =
    this.viajeServ.findViajes(pageNumber, pageSize, sort, this._us.usuario.empresa, 
                              this.getInicio(), this.getFin() )
    .subscribe( this.okViajesEsp.bind( this ), this.errorViajeEsp.bind( this ) );
    this.self = this;
}

okViajesEsp( viajePage ) {
  this.viajePage = viajePage;
}

errorViajeEsp( err ) {

}

delete( viaje: ViajeEspecial) {

  this.viajeServ.deleteViaje( viaje.id ).subscribe( data => {

    this.mostrarDetalle();
    this.success('El Viaje se elimino con exito!!!');

  }, err => {
    // this.ctrolError.tratarErrores(err, this.choferForm, this.erroresGrales, this.translations['gral']);
    // this.checkTodoFormValidity();
  } );

}


success(message: string) {
  this.alertService.success(message);
}

error(message: string) {
  this.alertService.error(message);
}

clearAlert() {
  this.alertService.clear();
}

crearNuevo() {
  this.clearAlert();
  this.viajeNuevo = {
    id: null,
    agenciaContratante: null,
    fechaHoraSalida: null,
    origen: null,
    destino: null,
    fechaHoraRegreso: null,
    observaciones: null,
    empCodigo: null

   };

}

openModalChoferes( viajeEspecial: ViajeEspecial ) {

   let modal$ = this.modalService.create( VentanasModalesModule,
                                          DiagrChoferesComponent,
                                          {'viajeEspecial': viajeEspecial,
                                            ok: () => {
                                              this.mostrarDetalle();
                                            } } ) ;

}

openModalAuxiliares(viajeEspecial: ViajeEspecial) {
  let modal$ = this.modalService.create(
                                        VentanasModalesModule,
                                        DiagrAuxiliaresComponent,
                                        {'viajeEspecial': viajeEspecial,
                                      ok: () => { this.mostrarDetalle();
                                      } } ) ;
}

}
