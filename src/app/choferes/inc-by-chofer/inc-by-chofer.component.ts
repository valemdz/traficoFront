import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { IncidenciaService } from '../../incidencias/incidencia.service';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {Chofer, ChoferIndicencia, Incidencia, ListaChoferIncidencia} from '../../domain';
import {ChoferService} from '../chofer.service';
import {DatePipe} from '@angular/common';
import { ErrorService } from '../../_services/error.service';
import{ IncChoferValidator } from '../inc-chofer-validator';

import * as moment from 'moment';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-inc-by-chofer',
  templateUrl: './inc-by-chofer.component.html',
  styleUrls: ['./inc-by-chofer.component.css']
})
export class IncByChoferComponent implements OnInit, OnChanges {

  @Input() chofer: Chofer;

  choferIndicencias:any=[];

  incByChoferForm:FormGroup;
  comboTipos:any=[];
  todosErrores:any=[];

  @ViewChild('closeBtn') closeBtn: ElementRef;


  constructor( private incidenciaService:IncidenciaService,
               private fb: FormBuilder,
               private ctrolError: ErrorService,
               private choferService: ChoferService  ){
      this.crearForm();
  }

  crearForm(){

    this.incByChoferForm = this.fb.group({
      incidencias: this.fb.array([])
    });

    this.incByChoferForm.valueChanges
    .subscribe( data => this.checkFormValidity( ) );

   }

   validateAllFormFields(){
    for (var i = 0; i < this.incidencias.controls.length; i++) {
      this.ctrolError.validateAllFormFields( this.incByChoferForm);
    }
  }

   checkFormValidity(){
    for( var i:number=0; i < this.incidencias.length; i++ ){
      this.ctrolError.checkFormValidity(<FormGroup>this.incidencias.controls[i], this.todosErrores[i],  this.translations );
    }
  }


  ngOnInit() {

    let observable: Observable<any> =
              this.incidenciaService.findIncidenciasByEmpyTipo(this.chofer.choferPK.cho_emp_codigo,1);
    observable.subscribe( data => {
        this.comboTipos = data;

     });
  }

  ngOnChanges() {
      if( this.incByChoferForm ){
        this.getIncidenciasByChofer();
      }
  }

  getIncidenciasByChofer(){
    let incObservable :Observable<any> =
    this.choferService.getIncidenciasByChofer(  this.chofer.choferPK.cho_emp_codigo,
                                                this.chofer.choferPK.cho_codigo );
     incObservable.subscribe( data => {
        this.choferIndicencias = data;
        this.setIncidencias(this.choferIndicencias);
    });

  }

  crearGroupForm( choferIndicencia: ChoferIndicencia ):FormGroup{

      let dp = new DatePipe(navigator.language);
      let fInicio = dp.transform( choferIndicencia.inicio, 'yyyy-MM-dd');
      let hInicio = dp.transform( choferIndicencia.inicio, 'HH:mm');
      let fFin = dp.transform( choferIndicencia.fin, 'yyyy-MM-dd');
      let hFin = dp.transform( choferIndicencia.fin, 'HH:mm');

      let incForm = this.fb.group({
        id:[choferIndicencia.id],
        idIncidencia: [ choferIndicencia.idIncidencia , [ Validators.required ]],
        fInicio: [fInicio, [ Validators.required] ],
        hInicio:[hInicio, [ Validators.required ]],
        fFin:[fFin, [ Validators.required ]],
        hFin:[hFin, [ Validators.required ]]
      }, {validator: IncChoferValidator.createValidator( ) });


      return incForm;
   }

   setIncidencias(incidencias: ChoferIndicencia[]) {
      this.setErrores( incidencias.length );
      const incidenciaFGs = incidencias.map(incid => this.crearGroupForm(incid));
      const incidenciaFormArray = this.fb.array(incidenciaFGs);
      this.incByChoferForm.setControl('incidencias', incidenciaFormArray);
   }

  get incidencias(): FormArray {
    return this.incByChoferForm.get('incidencias') as FormArray;
  };


  borrarIncidencia( index:number ){
    if (index > -1) {
      this.todosErrores.splice(index, 1);
    }
    this.incidencias.removeAt(index);
  }

  tipoByIndex( index:number ):any{
    const formModel = this.incByChoferForm.value;
    return formModel.incidencias[ index ].idIncidencia;
  }

  isNuevo( index:number ):boolean{
    const formModel = this.incByChoferForm.value;
    return formModel.incidencias[ index ].id == 0;
  }

  getDescripcion( index:number){

    const formModel = this.incByChoferForm.value;
    const idInc = formModel.incidencias[ index ].idIncidencia;

    let object:any;
    for (var i = 0; i <  this.comboTipos.length; i++) {
      object = this.comboTipos[i];
      if( object.codigo == idInc){
        return  object.descripcion;
      }
    }
 }

  erroresGrales:any=[];


    translations: any = {
      idIncidencia: {
        required: 'requerido.'
      },
      fInicio: {
        required: 'requerido.'
      },
      hInicio: {
        required: 'requerido.'
      },
      fFin: {
       required: 'requerido.',
       fechaInc: 'La Fecha-Hora fin deba ser mayor que la Fecha-Hora Inicio'
     },
     hFin: {
       required: 'requerido.'
     }
    };


    crearError():any{
      var errMsgs: any = {
        idIncidencia: [],
        fInicio: [],
        hInicio: [],
        fFin: [],
        hFin:[]
      };
      return  errMsgs;
    }

    setErrores( cantidad:number ){
      this.todosErrores =[];
      for( let index=0; index < cantidad; index++ ){
        this.todosErrores.push( this.crearError());
      }
    }


  addNuevaIncid(){

    this.todosErrores.push( this.crearError());

    this.incidencias.push( this.fb.group({
      id: [ 0 ],
      idIncidencia: [  null,  [ Validators.required ] ],
      fInicio: [null,  [ Validators.required ]],
      hInicio:[null,  [ Validators.required ]],
      fFin:[null, [ Validators.required ]],
      hFin:[null , [ Validators.required ] ] }
      , {validator: IncChoferValidator.createValidator(  ) }) );
  }




  salvarChofer(){

    this.validateAllFormFields();
    this.checkFormValidity();

    if( this.incByChoferForm.valid ){
      this.salvar();
    }

  }

  salvar(){

    let lista:ListaChoferIncidencia={
      choferIncidencias: this. prepararSalvarChoferIncid()
    }

    this.choferService.saveIncidenciasByChofer(  this.chofer.choferPK.cho_emp_codigo,
                                                 this.chofer.choferPK.cho_codigo,
                                                 lista).subscribe(result => {
      //this.parent.mostrarDetalle();
      this.closeModal();

    }, err => {

          this.erroresGrales.length =0;
          const data = err.json();

          this.ctrolError.tratarErroresBackEndLista(err, this.erroresGrales);

          if( err.status == 400 ){
            if( !data['errorCode'] ){

                const serverErrors = data['choferIncidencias'];
                if( serverErrors ){
                  serverErrors.forEach((item, index) => {
                    Object.keys( this.todosErrores[index] ).forEach(field => {
                      if( item[field].length != 0){
                        this.todosErrores[index][field].push( item[field] );
                      }
                    });
                  });
                }

                const erroresGrales =  data['errores'];
                if( erroresGrales && erroresGrales.length != 0 ){
                  this.erroresGrales.push( erroresGrales );
                }
            }

          }

    } );

}

prepararSalvarChoferIncid():any {

    const formModel = this.incByChoferForm.value;
    // deep copy of form model incidencias
    let incidenciasDeepCopy:any = [];

    for (var i = 0; i < formModel.incidencias.length; i++) {

        let fInicio = moment(formModel.incidencias[i].fInicio + ' ' + formModel.incidencias[i].hInicio, 'YYYY-MM-DD HH:mm');
        let fFin = moment(formModel.incidencias[i].fFin + ' ' + formModel.incidencias[i].hFin, 'YYYY-MM-DD HH:mm');

        const choIncid: ChoferIndicencia= {
            id: formModel.incidencias[i].id,
            idIncidencia:formModel.incidencias[i].idIncidencia,
            inicio:fInicio.format() as any,
            fin:fFin.format() as any
        }

        incidenciasDeepCopy.push(choIncid);
    }
    return incidenciasDeepCopy;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }


}
