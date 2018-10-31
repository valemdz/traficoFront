import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import * as Rx from "rxjs/Rx";
import { ViajeEspServive } from '../viajeEsp.service';
import {Response} from '@angular/http';
import { MiUsuarioService } from '../../_services/mi.usuario.service';
import { Table } from '../../shared/table';
import { ViajeEspecial, ViajeEspecialList, VehiculoPK, ChoferPK } from '../../domain';
import { PaginationPage, PaginationPropertySort } from '../../shared/pagination';
import { AlertService } from '../../_services/alert.service';
import { ModalService } from '../../ventanas-modales/modal.service';
import { Observable} from 'rxjs';
import { DiagrChoferesComponent } from '../diagr-choferes/diagr-choferes.component';
import { VentanasModalesModule } from '../../ventanas-modales/ventanas-modales.module';




@Component({
  selector: 'app-viajes-esp-list',
  templateUrl: './viajes-esp-list.component.html',
  styleUrls: ['./viajes-esp-list.component.css']
})
export class ViajesEspListComponent implements OnInit {

  viajePage: PaginationPage<ViajeEspecialList>;
  self: Table<ViajeEspecialList>;
  viajeForm:FormGroup;

  comboVehiculos:any=[];

  viajeNuevo:ViajeEspecial;



  constructor(  private fb: FormBuilder,
                private viajeServ: ViajeEspServive,
                private alertService: AlertService,
                private yo:MiUsuarioService,
                private modalService: ModalService  ) {
      this.crearForm();
  }


  crearForm(){
   /* this.viajeForm = this.fb.group({
      fInicio: [null,  [ Validators.required ]],
      hInicio:[null,  [ Validators.required ]],
      fFin:[null, [ Validators.required ]],
      hFin:[null , [ Validators.required ] ] }) ;*/


      this.viajeForm = this.fb.group({
        fInicio: ['2017-12-01',  [ Validators.required ]],
        fFin:['2017-12-31', [ Validators.required ]] });

   };

  ngOnInit() {

  }


  buscarViajesEspeciales(){

    this.mostrarDetalle();

    //this.getViajesEspeciales( this.yo.getEmpresa(), this.getInicio(), this.getFin() );

  }

  getInicio():any{
    const formModel = this.viajeForm.value;
    return  formModel.fInicio;
  }

  getFin():any{
    const formModel = this.viajeForm.value;
    return  formModel.fFin;
  }

  getViajesEspeciales( empresa:String, inicio:any, fin:any ){

    let observable: Observable<Response> =
    this.viajeServ.getViajesEspeciales( empresa, this.getInicio(),  this.getFin() );
      observable.subscribe( data => {
      //this.comboEscalasDestino = data;

    });
  }

  mostrarDetalle():void{
    let observable: Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);

    observable.subscribe( result => {

    }, err => {
      //this.ctrolError.tratarErrores(err, this.incidenciaForm, this.erroresGrales, this.translations['gral']);
      //this.ctrolError.checkFormValidity(this.incidenciaForm, this.errMsgs,  this.translations );
    } );

    this.self = this;
}





fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Observable<PaginationPage<ViajeEspecialList>> {
    let observable: Observable<PaginationPage<ViajeEspecialList>> =
    this.viajeServ.findViajes(pageNumber, pageSize, sort, this.yo.getEmpresa(), this.getInicio(), this.getFin() );
    observable.subscribe(viajePage => this.viajePage = viajePage);
    return observable;
}


delete( viaje: ViajeEspecial){

  this.viajeServ.deleteViaje( viaje.id ).subscribe( data => {

    this.mostrarDetalle();
    this.success('El Viaje se elimino con exito!!!');

  }, err => {
    //this.ctrolError.tratarErrores(err, this.choferForm, this.erroresGrales, this.translations['gral']);
    //this.checkTodoFormValidity();
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

crearNuevo(){
  this.clearAlert();
  this.viajeNuevo = {
    id: null,
    agenciaContratante: null,
    fechaHoraSalida: null,
    origen: null,
    destino: null,
    fechaHoraRegreso: null,
    observaciones:null,
    empCodigo:null

   }

}

openModalChoferes( viajeEspecial:ViajeEspecial ){

   let modal$ = this.modalService.create( VentanasModalesModule,
                                          DiagrChoferesComponent,
                                          {"viajeEspecial": viajeEspecial,
                                            ok:() => {
                                              this.mostrarDetalle();
                                            } } ) ;

    /*modal$.subscribe((ref) => {
      setTimeout(() => {
        // close the modal after 5 seconds
        //ref.destroy();
      }, 500000000000000)
    })*/
}

}
