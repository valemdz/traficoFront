import { DiagrChoferesComponent } from '../../viajes/diagr-choferes/diagr-choferes.component';
import { AlertService } from '../../_services/alert.service';
import { PaginationPage, PaginationPropertySort } from '../../shared/pagination';
 import { Servicios, ServicioPK } from '../../domain';
import { Table } from '../../shared/table';
import { Component, OnInit, Injectable, Injector, ReflectiveInjector } from '@angular/core';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';
import {MiUsuarioService} from '../../_services/mi.usuario.service';

import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ModalService } from '../../ventanas-modales/modal.service';
import { Observable } from 'rxjs';
import { MyCustomModalComponent } from '../../my-custom-modal/my-custom-modal.component';
import { VentanasModalesModule } from '../../ventanas-modales/ventanas-modales.module';
import { ModalConDetalleComponent } from '../modal-con-detalle/modal-con-detalle.component';
import { ComboInyector } from '../ComboInjector';
import { AdService } from '../ad.service';
import { ComponenteItem } from '../../shared/componente-item';
import { DiagrService } from 'src/app/services/service.index';


@Component({
  selector: 'app-diagramacion',
  templateUrl: './diagramacion-list.component.html',
  styleUrls: ['./diagramacion-list.component.css']
})
export class DiagramacionListComponent implements OnInit {

  servPage: PaginationPage<Servicios>;
  self: Table <Servicios>;
  formDiag: FormGroup;
  combitoMio: any = [
                    { codigo: '1', descripcion: 'Cerrado' },
                    { codigo: '2', descripcion: 'Abierto' },
                    { codigo: '3', descripcion: 'Suspendido' }
                    ];
  comboLineas: any= [];
  ads: ComponenteItem[];


  constructor(  private fb: FormBuilder,
                private diagrService: DiagrService,
                private alertService: AlertService,
                private yo: MiUsuarioService,
                private modalService: ModalService,
                private injector: Injector,
                private adService: AdService
               ) {
        this.crearForm();
    }

    crearForm() {
      this.formDiag = this.fb.group(
        { lineaId: ['', [  Validators.required ]],
          fInicio: [(new Date().toISOString().split('T')[0]) ,  [ Validators.required ]],
          fFin: [(new Date().toISOString().split('T')[0]) , [ Validators.required ]],
          estadoId: ['', [  Validators.required ]],
        });
   }

  ngOnInit() {
    this.getLIneas();
    this.getEstadoS();
  }

  getLIneas() {
    let observable: Observable<Response> =
    this.diagrService.findLineasByEmp$(this.yo.getEmpresa());
      observable.subscribe( data => {
      this.comboLineas = data;
    });
  }

  buscarServicios() {
    this.mostrarDetalle();
  }

  mostrarDetalle(): void {
    let observable: Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);
    observable.subscribe( result => { }, err => { } );
    this.self = this;
}


success(message: string) {
  this.alertService.success(message);
}

fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort):
  Observable<PaginationPage<Servicios>> {
  let observable: Observable<PaginationPage<Servicios>> =
  this.diagrService.findServiciosByLineaYfecha$(pageNumber, pageSize, sort,
    this.yo.getEmpresa(), this.getLinea(), this.getInicio(), this.getFin() );
  observable.subscribe(servPage => this.servPage = servPage);
  return observable;
}


getInicio(): any {
  const formModel = this.formDiag.value;
  return  formModel.fInicio;
}

getFin(): any {
  const formModel = this.formDiag.value;
  return  formModel.fFin;
}
getLinea(): any {
  const formModel = this.formDiag.value;
  return  formModel.lineaId;
}

getEstadoS(): any {
  const formModel = this.formDiag.value;
  return  formModel.estadoId;
}
clearAlert() {
  this.alertService.clear();
}

openModalChoferes( servicio: Servicios ) {
  let modal$ = this.modalService.create( VentanasModalesModule,
                                         DiagrChoferesComponent,
                                         {'servicio': servicio,
                                           ok: () => {
                                             this.mostrarDetalle();
                                           } } ) ;

   /*modal$.subscribe((ref) => {
     setTimeout(() => {
       // close the modal after 5 seconds
       //ref.destroy();
     }, 500000000000000)
   })*/
}







/*
  openModal(): void{


       let choferNuevo = {
          choferPK: { cho_emp_codigo:this.yo.user.empresa, cho_codigo:0},
          cho_estado: null,
          cho_legajo: null,
          cho_nombre: null,
          cho_doc_codigo: null,
          cho_documento: null,
          cho_grupo_sanguineo: null,
          cho_observaciones: null,
          cho_telefono: null,
          cho_telefono_emergencia: null,
          cho_fecha_nacimiento: null
      };



    console.log('openModal');

    let modal$ = this.modalService.create( VentanasModalesModule, MyCustomModalComponent, {foo: choferNuevo, nuevo:false } ) ;

    modal$.subscribe((ref) => {
      setTimeout(() => {
        // close the modal after 5 seconds
        // ref.destroy();
      }, 500000000000000)
        })
  }

  openUno(){
    console.log();
    this.ads = this.adService.getComponenteUno();

  }

  openDos(){
    console.log();
    this.ads = this.adService.getComponenteDos();
  }*/


}
