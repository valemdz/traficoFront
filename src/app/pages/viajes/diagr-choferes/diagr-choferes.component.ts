import { Component, OnInit, Input, OnChanges, OnDestroy, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {Response} from '@angular/http';
import { Observable} from 'rxjs';
import { ErrorService, LoaderService, ViajeEspServive } from 'src/app/services/service.index';
import { ViajeEspecial, ChoferPKConDet, ListaChoferPK, ChoferPK } from 'src/app/models/model.index';


@Component({
  selector: 'app-diagr-choferes',
  templateUrl: './diagr-choferes.component.html',
  styleUrls: ['./diagr-choferes.component.css']
})
export class DiagrChoferesComponent implements OnInit, OnChanges, OnDestroy,
AfterContentChecked {

  ok: Function;
  destroy: Function;
  closeModal: Function;

  @Input()
  viajeEspecial: ViajeEspecial;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  choferesByViajeForm: FormGroup;
  comboChoferes: any = [];
  todosErrores: any = [];

  chofs: any = [];

  terminoChoByViajes = false;
  terminoChoferes = false;

  showLoader = false;

  constructor(  private fb: FormBuilder,
                private ctrolError: ErrorService,
                private viajeEspServive: ViajeEspServive,
                private loaderService: LoaderService ) {
    this.crearForm();
  }

  erroresGrales: any = [];


  translations: any = {
    choferPK: {
      required: 'requerido.'
    }
  };

  crearForm() {

     this.choferesByViajeForm = this.fb.group(
       {
         choferes : this.fb.array([])
       }) ;

       this.choferesByViajeForm.valueChanges
       .subscribe( data => this.checkFormValidity( ) );
  }

  checkFormValidity() {
    for ( let i = 0; i < this.choferes.length; i++ ) {
      this.ctrolError.checkFormValidity(<FormGroup>this.choferes.controls[i], this.todosErrores[i],  this.translations );
    }
  }

  get choferes(): FormArray {
    return this.choferesByViajeForm.get('choferes') as FormArray;
  }

  ngOnInit() {

    this.showLoader = true;

    if ( this.choferesByViajeForm ) {

      /*let timeoutId = setTimeout(() => {
        this.getChoferesByViaje();
      }, 5000);*/

      this.getChoferesByViaje();
      this.getChoferesCombo();

      // this.getChoferesLibresCombo();
    }
  }

  ngOnChanges() {
    console.log('ngOnChanges k');
  }

  ngOnDestroy() {

  }

  setChoferes(choferes: ChoferPKConDet[]) {
    this.setErrores( choferes.length );
    const choferesFGS = choferes.map( chof => this.crearGroupForm(chof));
    const choferesFormArray = this.fb.array(choferesFGS);
    this.choferesByViajeForm.setControl('choferes', choferesFormArray);
  }

 getChoferesByViaje() {
    const choObservable: Observable<Response> =
    this.viajeEspServive.getChoferesByViaje( this.viajeEspecial.id );
    choObservable.subscribe( data => {
        this.chofs = data;
        this.setChoferes(this.chofs);
        this.terminoChoByViajes = true;
    });

  }


  crearError(): any {
    const errMsgs: any = {
      choferPK: []
    };
    return  errMsgs;
  }

  setErrores( cantidad: number ) {
    this.todosErrores = [];
    for ( let index = 0; index < cantidad; index++ ) {
      this.todosErrores.push( this.crearError());
    }
  }

 crearGroupForm( chofer: ChoferPKConDet ): FormGroup {

  const choForm = this.fb.group({
          choferPK: [JSON.stringify( chofer.choferPK ), [ Validators.required ]] ,
          nombreChofer: [chofer.nombreChofer],
          detalleCho: [chofer.detalles]
        });

        return choForm;
   }

  getChoferesCombo() {
    const observable: Observable<Response> = this.viajeEspServive.getChoferes( this.viajeEspecial.empCodigo );
    observable.subscribe( data => {
          this.comboChoferes = data;
          // Serializo el objeto clave
          // tslint:disable-next-line:no-shadowed-variable
          for ( let i = 0; i < this.comboChoferes.length; i++ ) {
            this.comboChoferes[i].choferPK = JSON.stringify( this.comboChoferes[i].choferPK );
            this.terminoChoferes =  true;
          }
      });
  }

   getChoferesLibresCombo() {
    const observable: Observable<Response> = this.viajeEspServive.getChoferesLibres( this.viajeEspecial.id );
    observable.subscribe( data => {
          this.comboChoferes = data;
          // Serializo el objeto clave
          for ( let i = 0; i < this.comboChoferes.length; i++ ) {
            this.comboChoferes[i].choferPK = JSON.stringify( this.comboChoferes[i].choferPK );
            this.terminoChoferes =  true;
          }

      });
  }

  addNuevoChofer() {

    this.todosErrores.push( this.crearError());

    this.choferes.push( this.fb.group({
      choferPK: [null, [ Validators.required ]],
      nombreChofer: [null],
      detalleCho: [null]
    } ) );

  }


  tipoByIndex( index: number ): any {
    const formModel = this.choferesByViajeForm.value;
    return formModel.choferes[ index ].choferPK;
  }

  tieneDetalleByIndex( index: number ): any {
    const formModel = this.choferesByViajeForm.value;
    return formModel.choferes[ index ].detalleCho != null && formModel.choferes[ index ].detalleCho.length > 0;
  }

  detalleByIndex( index: number ): any {
    const formModel = this.choferesByViajeForm.value;
    return formModel.choferes[ index ].detalleCho;
  }

  nombreChoferByIndex( index: number ): any {
    const formModel = this.choferesByViajeForm.value;
    return formModel.choferes[ index ].nombreChofer;
  }

  borrarChofer( index: number) {
    if (index > -1) {
      this.todosErrores.splice(index, 1);
    }
    this.choferes.removeAt(index);
  }


  getIndexFromArray( formA: FormArray, campo, valorCampo): number {
      let indice;
      formA.controls.forEach((item, index) => {
        if ( item.get(campo).value === valorCampo) {
          indice = index;
        }
      });
      return indice;
  }


  onOk() {
      this.validateAllFormFields();
      this.checkFormValidity();
      if ( this.choferesByViajeForm.valid ) {
          this.salvar();
      }
  }

  salvar() {

    this.showLoader = true;
    let listaChoferPK:ListaChoferPK = {
        choferesPK: this.prepararSalvarChoferes()
    };

    let observable : Observable<Response> = this.viajeEspServive.saveChoferes( this.viajeEspecial.id , listaChoferPK);

    observable.subscribe( data =>{
      this.ok();
      this.cerrarModal();
      this.closeModal();
      this.destroy();

    }, err => {

        const data = err.json();

        let mensajeMostrar = '';

        if ( err.status === 500 ) {
          mensajeMostrar = ' Error interno 500 comuniquese con el administrador! ';
        } else if ( err.status === 0) {
          mensajeMostrar = ' NO es posible comunicarse con el back end! ';
        } else if (  err.status === 401 ) {
          mensajeMostrar = ' Usuario o contraseña incorrecta ';
        } else if ( err.status === 409 ) {
          const data = err.json();

          for (let fieldName in data) {
            const serverErrors = data[fieldName];
            serverErrors.forEach((item, index) => {

              if( item.cho_codigo.length != 0){
                this.todosErrores[index].choferPK.push( item.cho_codigo );
              }
              if( item.cho_emp_codigo.length !=0 ){
                this.todosErrores[index].choferPK.push( item.cho_emp_codigo );
              }

            });
          }

        } else {
          mensajeMostrar = ' Error Desconocido comuniquese con el administrador!';
        }

        return mensajeMostrar;



      },
      () => { this.showLoader = false; } );


  }

  /*onOk(): void{
    this.cerrarModal();
    this.closeModal();
    this.destroy();
    //this.ok(this.snacks);
  } */


  prepararSalvarChoferes(): any {
    const formModel = this.choferesByViajeForm.value;
    // deep copy of form model incidencias
    const choferesDeepCopy: any = [];

    for (let i = 0; i < formModel.choferes.length; i++) {
        const choferPk: ChoferPK = JSON.parse(  formModel.choferes[i].choferPK);
        choferesDeepCopy.push(choferPk);
    }
    return choferesDeepCopy;

  }

  validateAllFormFields() {
    for (let i = 0; i < this.choferes.controls.length; i++) {
      this.ctrolError.validateAllFormFields( this.choferesByViajeForm);
    }
  }

  onCancel(): void {
    this.cerrarModal();
    this.closeModal();
    this.destroy();
  }


  cerrarModal() {
      this.closeBtn.nativeElement.click();
  }


  ngAfterContentChecked() {

    if ( this.terminoChoByViajes
        && this.terminoChoferes ) {
          this.showLoader = false;
          this.terminoChoByViajes = false;
          this.terminoChoferes = false;
    }

  }

  onChangeChofer( value, indice ) {
    this.erroresGrales.length = 0;
    const formModel = this.choferesByViajeForm.value;

    for ( let i = 0; i < this.choferes.length; i++ ) {
      if ( formModel.choferes[ i ].choferPK === value
          && indice !== i ) {
          this.erroresGrales.push('No pueden existir conductores repetidos');
      }
    }

   }


}
