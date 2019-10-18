import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ErrorService, IncidenciaService, VehiculoService } from 'src/app/services/service.index';
import { Vehiculo, VehiculoIndicencia, ListaVehiculoIncidencia } from 'src/app/models/model.index';
import { ComponenteBaseComponent } from 'src/app/shared/modal/modal.index';

declare var $;

@Component({
  selector: 'app-inc-by-vehi',
  templateUrl: './incidencia-by-vehiculo.component.html',
  styleUrls: ['./incidencia-by-vehiculo.component.css']
})
export class IncidenciaByVehiculoComponent implements ComponenteBaseComponent, OnInit,
                                           OnChanges, OnDestroy {  
  
  data: any;
  vehiculo:Vehiculo;  
  incByVehiculoForm: FormGroup;
  tiposIncidencia;
  vehiculoIndicencias:any=[];
  todosErrores:any=[];


  constructor(  private fb:FormBuilder,
                private incidenciaService:IncidenciaService,
                private ctrolError: ErrorService,
                private vehiculoService: VehiculoService   ){
    this.crearForm();
  }

  crearForm(){    

    this.incByVehiculoForm = this.fb.group({
      incidencias: this.fb.array([])
    });

    this.incByVehiculoForm.valueChanges
    .subscribe( data => this.checkFormValidity( ) );
  }


  ngOnInit() {

    $('#ventana').modal('show'); 

    const TIPO_INCIDENCIA_VEHICULO: number = 0;
    this.vehiculo = this.data.vehiculo;

    setTimeout( ()=> {
      this.incidenciaService.findIncidenciasByEmpyTipo$(this.vehiculo.vehiculoPK.vehEmpCodigo,
        TIPO_INCIDENCIA_VEHICULO)
        .subscribe( data => {
        this.tiposIncidencia = data;
        });

        this.getIncidenciasByVehiculo();
    });    
  }

  isNuevo( index:number ):boolean{
    const formModel = this.incByVehiculoForm.value;
    return formModel.incidencias[ index ].id == 0;
  }

  getDescripcion( index:number){

    const formModel = this.incByVehiculoForm.value;
    const idInc = formModel.incidencias[ index ].idIncidencia;

    const incidencia = this.tiposIncidencia.find( i => i.id === idInc);
    return ( incidencia != null) ? incidencia.descripcion:'Sin Definir';
 }

  getIncidenciasByVehiculo(){
        let incObservable :Observable<any> =
        this.vehiculoService.getIncidenciasByVehiculo$( this.vehiculo.vehiculoPK.vehEmpCodigo ,
                                                       this.vehiculo.vehiculoPK.vehInterno );
         incObservable.subscribe( data => {
            this.vehiculoIndicencias = data;
            this.setIncidencias(this.vehiculoIndicencias);
        });

  }

  ngOnChanges() {
    if( this.incByVehiculoForm ){
      this.getIncidenciasByVehiculo();
    }
  }

  setIncidencias( incidencias: VehiculoIndicencia[] ){
    this.setErrores( incidencias.length );
    const incidenciaFGs = incidencias.map(incid => this.crearGroupForm(incid));
    const incidenciaFormArray = this.fb.array(incidenciaFGs);
    this.incByVehiculoForm.setControl('incidencias', incidenciaFormArray);
  }

  crearGroupForm( vehiIndicencia: VehiculoIndicencia ):FormGroup{

          let dp = new DatePipe(navigator.language);
          let fInicio = dp.transform( vehiIndicencia.inicio, 'yyyy-MM-dd');
          let hInicio = dp.transform( vehiIndicencia.inicio, 'HH:mm');
          let fFin = dp.transform( vehiIndicencia.fin, 'yyyy-MM-dd');
          let hFin = dp.transform( vehiIndicencia.fin, 'HH:mm');

          let incForm = this.fb.group({
              id: [ vehiIndicencia.id ],
              idIncidencia: [ vehiIndicencia.idIncidencia , [ Validators.required ]],
              fInicio: [fInicio, [ Validators.required] ],
              hInicio:[hInicio, [ Validators.required ]],
              fFin:[fFin, [ Validators.required ]],
              hFin:[hFin, [ Validators.required ]]
          });

          return incForm;
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
        required: 'requerido.'
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


  get incidencias():FormArray{
      return this.incByVehiculoForm.get('incidencias') as FormArray;
  }

  addNuevaIncid(){

    this.todosErrores.push( this.crearError());

    this.incidencias.push( this.fb.group({
      id:[0],
      idIncidencia: [ null,  [ Validators.required ] ],
      fInicio: [null,  [ Validators.required ]],
      hInicio:[null,  [ Validators.required ]],
      fFin:[null, [ Validators.required ]],
      hFin:[null , [ Validators.required ] ] }) );


  }

  tipoByIndex( index:number ):any{
    const formModel = this.incByVehiculoForm.value;
    return formModel.incidencias[ index ].idIncidencia;
  }

  borrarIncidencia(index:number){
    if (index > -1) {
      this.todosErrores.splice(index, 1);
    }

    this.incidencias.removeAt(index);
  }

  salvarVehiculoIncidencias(){

    this.validateAllFormFields();
    this.checkFormValidity();

    //if( this.incByVehiculoForm.valid ){
      this.salvar();
    //}

  }

  validateAllFormFields(){
    for (var i = 0; i < this.incidencias.controls.length; i++) {
      this.ctrolError.validateAllFormFields( this.incByVehiculoForm);
    }
  }

  checkFormValidity(){
      for( var i:number=0; i < this.incidencias.length; i++ ){
        this.ctrolError.checkFormValidity(<FormGroup>this.incidencias.controls[i], this.todosErrores[i],  this.translations );
      }
  }

  salvar(){

     let lista:ListaVehiculoIncidencia={
        incidencias: this. prepararSalvarVehiIncid()
     }

      let incidenciasDeepCopy:any =

      this.vehiculoService.saveIncidenciasByVehiculo$(  this.vehiculo.vehiculoPK.vehEmpCodigo ,
                                                   this.vehiculo.vehiculoPK.vehInterno,
                                                   lista ).subscribe(result => {
        this.soloCerrar();

      }, err => {

        this.erroresGrales.length =0;
        const data = err.json();

        this.ctrolError.tratarErroresBackEndLista(err, this.erroresGrales);

        if( err.status == 400 ){
          if( !data['errorCode'] ){

              const serverErrors = data['incidencias'];
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

  prepararSalvarVehiIncid():any {

      const formModel = this.incByVehiculoForm.value;
      // deep copy of form model incidencias
      let incidenciasDeepCopy:any = [];

      for (var i = 0; i < formModel.incidencias.length; i++) {

          let fInicio = moment(formModel.incidencias[i].fInicio + ' ' + formModel.incidencias[i].hInicio, 'YYYY-MM-DD HH:mm');
          let fFin = moment(formModel.incidencias[i].fFin + ' ' + formModel.incidencias[i].hFin, 'YYYY-MM-DD HH:mm');

          const vehiIncid: VehiculoIndicencia= {
              id: formModel.incidencias[i].id,
              idIncidencia:formModel.incidencias[i].idIncidencia,
              inicio:fInicio.format() as any,
              fin:fFin.format() as any
          }

          incidenciasDeepCopy.push(vehiIncid);
      }
      return incidenciasDeepCopy;
  }




  soloCerrar(){
    this.ngOnDestroy();
    $('#ventana').modal('hide'); 
  }

  ngOnDestroy(): void {
   
  }

}
