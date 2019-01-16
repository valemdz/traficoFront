import { Component, OnInit, Input, OnChanges, OnDestroy, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ChoferPK, ViajeEspecial, ChoferPKConDet, VehiculoPK, ListaChoferPK } from '../../domain';
import { ViajeEspServive } from '../viajeEsp.service';
import {Response} from '@angular/http';
import { Observable} from 'rxjs';
import {Modal} from '../../ventanas-modales/modal.utilidades';
import { ErrorService, LoaderService } from 'src/app/services/service.index';


@Component({
  selector: 'app-diagr-auxiliares',
  templateUrl: './diagr-auxiliares.component.html'
})
@Modal()
export class DiagrAuxiliaresComponent implements OnInit, OnChanges, OnDestroy,
AfterContentChecked {

  ok: Function;
  destroy: Function;
  closeModal: Function;

  @Input()
  viajeEspecial: ViajeEspecial;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  auxiliaresByViajeForm: FormGroup;
  comboAuxiliares: any = [];
  todosErrores: any = [];

  auxs: any = [];

  terminoAuxByViajes = false;
  terminoAuxiliares = false;

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

     this.auxiliaresByViajeForm = this.fb.group(
       {
        auxiliares : this.fb.array([])
       }) ;

       this.auxiliaresByViajeForm.valueChanges
       .subscribe( data => this.checkFormValidity( ) );
  }

  checkFormValidity() {
    for ( let i = 0; i < this.auxiliares.length; i++ ) {
      this.ctrolError.checkFormValidity(<FormGroup>this.auxiliares.controls[i], this.todosErrores[i],  this.translations );
    }
  }

  get auxiliares(): FormArray {
    return this.auxiliaresByViajeForm.get('auxiliares') as FormArray;
  }

  ngOnInit() {

    this.showLoader = true;

    if ( this.auxiliaresByViajeForm ) {
      this.getAuxiliaresByViaje();
      this.getAuxiliaresCombo();
    }
  }

  ngOnChanges() {
    console.log('ngOnChanges auxiliares');
  }

  ngOnDestroy() {

  }

  setAuxiliares(auxiliares: ChoferPKConDet[]) {
    this.setErrores( auxiliares.length );
    const choferesFGS = auxiliares.map( auxs => this.crearGroupForm(auxs));
    const choferesFormArray = this.fb.array(choferesFGS);
    this.auxiliaresByViajeForm.setControl('auxiliares', choferesFormArray);
  }

  getAuxiliaresByViaje() {
    const auxObservable: Observable<Response> =
    this.viajeEspServive.getAuxiliaresByViaje( this.viajeEspecial.id );
    auxObservable.subscribe( data => {
        this.auxs = data;
        this.setAuxiliares(this.auxs);
        this.terminoAuxByViajes = true;
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


  getAuxiliaresCombo() {
    const observable: Observable<Response> = this.viajeEspServive.getAuxiliares( this.viajeEspecial.empCodigo );
    observable.subscribe( data => {
          this.comboAuxiliares = data;
          // Serializo el objeto clave
          for ( let i = 0; i < this.comboAuxiliares.length; i++ ) {
            this.comboAuxiliares[i].choferPK = JSON.stringify( this.comboAuxiliares[i].choferPK );
            this.terminoAuxiliares =  true;
          }
      });
  }


  getAuxiliaresLibresCombo() {
    const observable: Observable<Response> = this.viajeEspServive.getAuxiliaresLibres( this.viajeEspecial.id );
    observable.subscribe( data => {
          this.comboAuxiliares = data;
          // Serializo el objeto clave
          for ( let i = 0; i < this.comboAuxiliares.length; i++ ) {
            this.comboAuxiliares[i].choferPK = JSON.stringify( this.comboAuxiliares[i].choferPK );
            this.terminoAuxiliares =  true;
          }

      });
  }

  addNuevoChofer() {

    this.todosErrores.push( this.crearError());
    this.auxiliares.push( this.fb.group({
      choferPK: [null, [ Validators.required ]],
      nombreChofer: [null],
      detalleCho: [null]
    }));
  }


  tipoByIndex( index: number ): any {
    const formModel = this.auxiliaresByViajeForm.value;
    return formModel.auxiliares[ index ].choferPK;
  }

  tieneDetalleByIndex( index: number ): any {
    const formModel = this.auxiliaresByViajeForm.value;
    return formModel.auxiliares[ index ].detalleCho != null &&
     formModel.auxiliares[ index ].detalleCho.length > 0;
  }

  detalleByIndex( index: number ): any {
    const formModel = this.auxiliaresByViajeForm.value;
    return formModel.choferes[ index ].detalleCho;
  }

  nombreChoferByIndex( index: number ): any {
    const formModel = this.auxiliaresByViajeForm.value;
    return formModel.choferes[ index ].nombreChofer;
  }

  borrarAuxiliar( index: number) {
    if (index > -1) {
      this.todosErrores.splice(index, 1);
    }
    this.auxiliares.removeAt(index);
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
      if ( this.auxiliaresByViajeForm.valid ) {
          this.salvar();
      }
  }

  salvar() {

    this.showLoader = true;
    let listaAuxPK: ListaChoferPK = {
      choferesPK: this.prepararSalvarAuxiliares()
    };

    const observable: Observable<Response> = this.viajeEspServive.saveAuxiliares( this.viajeEspecial.id , listaAuxPK);

    observable.subscribe( result => {
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
         // const data = err.json();

          for (const fieldName in data) {
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

  prepararSalvarAuxiliares(): any {
    const formModel = this.auxiliaresByViajeForm.value;
    // deep copy of form model incidencias
    const auxiliaresDeepCopy: any = [];

    for (let i = 0; i < formModel.auxiliares.length; i++) {
        const choferPk: ChoferPK = JSON.parse(  formModel.auxiliares[i].choferPK);
        auxiliaresDeepCopy.push(choferPk);
    }
    return auxiliaresDeepCopy;

  }

  validateAllFormFields() {
    for (let i = 0; i < this.auxiliares.controls.length; i++) {
      this.ctrolError.validateAllFormFields( this.auxiliaresByViajeForm);
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


  ngAfterContentChecked(): void {

    if ( this.terminoAuxByViajes
        && this.terminoAuxiliares ) {
          this.showLoader = false;
          this.terminoAuxByViajes = false;
          this.terminoAuxiliares = false;
    }

  }

  onChangeAuxiliar( value, indice ) {
    this.erroresGrales.length = 0;
    const formModel = this.auxiliaresByViajeForm.value;

    for ( let i = 0; i < this.auxiliares.length; i++ ) {
      if ( formModel.auxiliares[ i ].choferPK === value
          && indice !== i ) {
          this.erroresGrales.push('No pueden existir auxiliares repetidos');
      }
    }

   }


}
