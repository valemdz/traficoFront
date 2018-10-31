import { Component, OnInit, Input, OnChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
import {ChoferPK, ViajeEspecial, ChoferPKConDet, VehiculoPK} from '../../domain';
import { ViajeEspServive } from '../viajeEsp.service';
import * as Rx from "rxjs/Rx";
import {Response} from '@angular/http';
import { ErrorService } from '../../_services/error.service';
import { ViajesEspListComponent } from  '../viajes-esp-list/viajes-esp-list.component';
import {LoaderService} from '../../_services/loader.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-diagr-viajes-esp',
  templateUrl: './diagr-viajes-esp.component.html',
  styleUrls: ['./diagr-viajes-esp.component.css']
})
export class DiagrViajesEspComponent implements OnInit , OnChanges, OnDestroy {

  @Input()
  viajeEspecial:ViajeEspecial;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  choferesByViajeForm: FormGroup;
  comboChoferes:any =[];
  todosErrores:any = [];

  chofs:any=[];

  terminoChoByViajes = false;
  terminoChoferes = false;

  constructor(  private fb: FormBuilder,
                private ctrolError: ErrorService,
                private viajeEspServive: ViajeEspServive,
                private parent: ViajesEspListComponent,
                private loaderService: LoaderService ) {
    this.crearForm();
    console.log('constructor');
  }

  crearForm(){

     this.choferesByViajeForm = this.fb.group(
       {
         choferes : this.fb.array([])
       }) ;

       this.choferesByViajeForm.valueChanges
       .subscribe( data => this.checkFormValidity( ) );
  }

  borraForm(){
    this.choferesByViajeForm.setControl('choferes', this.fb.array([]));
  }

  checkFormValidity(){
    for( var i:number=0; i < this.choferes.length; i++ ){
      this.ctrolError.checkFormValidity(<FormGroup>this.choferes.controls[i], this.todosErrores[i],  this.translations );
    }
  }

  get choferes():FormArray{
    return this.choferesByViajeForm.get('choferes') as FormArray;
  }

  ngOnInit() {
    //this.getChoferesCombo();
    console.log('ngOnInit');
  }

  ngOnChanges(){

    console.log('ngOnChanges');
    this.loaderService.display(true);

    this.borraForm();

    if( this.choferesByViajeForm ){

      this.getChoferesByViaje();
      this.getChoferesCombo();
      //this.getChoferesLibresCombo();

    }
  }

  ngOnDestroy(){

  }

  setChoferes(choferes: ChoferPKConDet[]) {
    this.setErrores( choferes.length );
    const choferesFGS = choferes.map( chof => this.crearGroupForm(chof));
    const choferesFormArray = this.fb.array(choferesFGS);
    this.choferesByViajeForm.setControl('choferes', choferesFormArray);
  }

 getChoferesByViaje(){
    let choObservable :Observable<Response> =
    this.viajeEspServive.getChoferesByViaje( this.viajeEspecial.id );
    choObservable.subscribe( data => {
        this.chofs = data;
        this.setChoferes(this.chofs);
        this.terminoChoByViajes = true;
    });

  }

erroresGrales:any=[];


  translations: any = {
    choferPK: {
      required: 'requerido.'
    }
  };


  crearError():any{
    var errMsgs: any = {
      choferPK: []
    };
    return  errMsgs;
  }

  setErrores( cantidad:number ){
    this.todosErrores =[];
    for( let index=0; index < cantidad; index++ ){
      this.todosErrores.push( this.crearError());
    }
  }

 crearGroupForm( chofer: ChoferPKConDet ):FormGroup{

        let choForm = this.fb.group({
          choferPK:[JSON.stringify( chofer.choferPK ), [ Validators.required ]] ,
          nombreChofer: [chofer.nombreChofer],
          detalleCho: [chofer.detalles]
        });

        return choForm;
   }

  getChoferesCombo(){
    let observable: Observable<Response> = this.viajeEspServive.getChoferes( this.viajeEspecial.empCodigo );
    observable.subscribe( data => {
          this.comboChoferes = data;
          //Serializo el objeto clave
          for( var i:number=0; i < this.comboChoferes.length; i++ ){
            this.comboChoferes[i].choferPK = JSON.stringify( this.comboChoferes[i].choferPK );
          }
      });
  }

  getChoferesLibresCombo(){
    let observable: Observable<Response> = this.viajeEspServive.getChoferesLibres( this.viajeEspecial.id );
    observable.subscribe( data => {
          this.comboChoferes = data;
          //Serializo el objeto clave
          for( var i:number=0; i < this.comboChoferes.length; i++ ){
            this.comboChoferes[i].choferPK = JSON.stringify( this.comboChoferes[i].choferPK );
            this.terminoChoferes =  true;
          }

      });
  }

  addNuevoChofer(){

    this.todosErrores.push( this.crearError());

    this.choferes.push( this.fb.group({
      choferPK:[null, [ Validators.required ]],
      nombreChofer:[null],
      detalleCho:[null]
    } ) );

  }


  tipoByIndex( index:number ):any{
    const formModel = this.choferesByViajeForm.value;
    return formModel.choferes[ index ].choferPK;
  }

  tieneDetalleByIndex( index:number ):any{
    const formModel = this.choferesByViajeForm.value;
    return formModel.choferes[ index ].detalleCho != null && formModel.choferes[ index ].detalleCho.length > 0;
  }

  detalleByIndex( index:number ):any{
    const formModel = this.choferesByViajeForm.value;
    return formModel.choferes[ index ].detalleCho;
  }

  nombreChoferByIndex( index:number ):any{
    const formModel = this.choferesByViajeForm.value;
    return formModel.choferes[ index ].nombreChofer;
  }

  borrarChofer( index:number){
    if (index > -1) {
      this.todosErrores.splice(index, 1);
    }
    this.choferes.removeAt(index);
  }


  getIndexFromArray( formA: FormArray, campo, valorCampo):number{
      let indice;
      formA.controls.forEach((item, index) => {
        if ( item.get(campo).value == valorCampo){
          indice = index;
        }
      });
      return indice;
  }


  salvarChoferesByViaje(){
      this.validateAllFormFields();
      this.checkFormValidity();
      if( this.choferesByViajeForm.valid ){
        this.salvar();
      }
  }


  salvar(){

    let choferesDeepCopy = this.prepararSalvarChoferes();

    let observable : Observable<Response> = this.viajeEspServive.saveChoferes( this.viajeEspecial.id , choferesDeepCopy);

    observable.subscribe( data =>{
      this.parent.mostrarDetalle();
      this.closeModal();

    }, err => {

        const data = err.json();
        for( let errorM of data ){
              let index = this.getIndexFromArray( this.choferes, errorM.campo,  JSON.stringify( errorM.valor ) );
              //this.todosErrores[index][errorM.campo].push('hubo lio');
              this.todosErrores[index][errorM.campo] = errorM.mensajes;
        }

      }  );

  }

  prepararSalvarChoferes():any{
    const formModel = this.choferesByViajeForm.value;
    // deep copy of form model incidencias
    let choferesDeepCopy:any = [];

    for (var i = 0; i < formModel.choferes.length; i++) {
        const choferPk: ChoferPK = JSON.parse(  formModel.choferes[i].choferPK);
        choferesDeepCopy.push(choferPk);
    }
    return choferesDeepCopy;

  }

  validateAllFormFields(){
    for (var i = 0; i < this.choferes.controls.length; i++) {
      this.ctrolError.validateAllFormFields( this.choferesByViajeForm);
    }
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }



  /*******/


  ngAfterContentInit(){
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(){
    console.log('ngAfterContentChecked');
  }


  ngAfterViewInit(){
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(){
    if( this.terminoChoByViajes && this.terminoChoferes ){
      this.loaderService.display(false);
    }
  }


}
