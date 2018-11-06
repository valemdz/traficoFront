import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, Inject, LOCALE_ID  } from '@angular/core';
import {Chofer, Carnet, ListaCarnet} from '../../domain';
import { FormArray , FormBuilder, FormGroup, Validators, FormGroupName, FormControl} from '@angular/forms';
import {ChoferService} from '../chofer.service';
import * as moment from 'moment';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';
import { ErrorService } from '../../_services/error.service';
import { Observable } from 'rxjs';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';


@Component({
  selector: 'app-carnet-list',
  templateUrl: './carnet-list.component.html'
})
export class CarnetListComponent implements OnInit, OnChanges {

   @Input() chofer: Chofer;
   formCarnet: FormGroup;
   carnetsChofer: any = [];
   comboTipos: any = [];
   todosErrores: any = [];


   @ViewChild('closeBtn') closeBtn: ElementRef;


  constructor(  private choferService: ChoferService,
                private ctrolError: ErrorService,
                private  fb: FormBuilder,
                @Inject(LOCALE_ID) public locale: string  ) {
    this.crearForm();
  }


  ngOnInit() {
    this.crearComboTipo();
  }


  crearForm(){
    this.formCarnet = this.fb.group({
      carnets: this.fb.array([])
    });

    this.formCarnet.valueChanges
    .subscribe( data => this.checkFormValidity( ) );

  }

  validateAllFormFields(){
    for (let i = 0; i < this.carnets.controls.length; i++) {
      this.ctrolError.validateAllFormFields( this.formCarnet);
    }
  }

   checkFormValidity(){
    for( let i:number=0; i < this.carnets.length; i++ ){
      this.ctrolError.checkFormValidity(<FormGroup>this.carnets.controls[i], this.todosErrores[i],  this.translations );
    }
  }


  crearComboTipo(){
    this.comboTipos.push({codigo:1, descripcion:'NACIONAL CNRT'});
    this.comboTipos.push({codigo:2, descripcion:'PROVINCIAL'});
  }

  tipoByIndex( index:number ):any{
    const formModel = this.formCarnet.value;
    return formModel.carnets[ index ].tipo;
  }

  isNuevo( index:number ):boolean{
    const formModel = this.formCarnet.value;
    return formModel.carnets[ index ].id == 0;
  }

  getDescripcion( index:number){

    const formModel = this.formCarnet.value;
    const tipo = formModel.carnets[ index ].tipo;

    let object:any;
    for (let i = 0; i <  this.comboTipos.length; i++) {
      object = this.comboTipos[i];
      if( object.codigo == tipo){
        return  object.descripcion;
      }
    }
 }
  erroresGrales:any=[];

    translations: any = {
      tipo: {
        required: 'requerido.'
      },
      fechaEmision: {
        required: 'requerido.'
      },
      fechaVenc: {
       required: 'requerido.',
       noMayor:'La F Venc debe ser Mayor que F Emision'
     },
     numeroCarnet: {
       required: 'requerido.'
     },
     observaciones: {
      required: 'requerido.'
    },

    };

    crearError():any{
      var errMsgs: any = {
        tipo: [],
        fechaEmision: [],
        fechaVenc: [],
        numeroCarnet:[],
        observaciones:[]
      };
      return  errMsgs;
    }

    setErrores( cantidad:number ){
      this.todosErrores =[];
      for( let index=0; index < cantidad; index++ ){
        this.todosErrores.push( this.crearError());
      }
    }

  setCarnets(carnets: Carnet[]) {
    this.setErrores( carnets.length );
    const carnetFGs = carnets.map(carnet => this.crearGroupForm(carnet));
    const carnetFormArray = this.fb.array(carnetFGs);
    this.formCarnet.setControl('carnets', carnetFormArray);
  }

  crearGroupForm( carnet: Carnet ): FormGroup {

    const fEmi = FuncionesGrales.formatearFecha( this.locale, carnet.fechaEmision, 'yyyy-MM-dd' );
    const fVenc = FuncionesGrales.formatearFecha( this.locale, carnet.fechaVenc, 'yyyy-MM-dd');

    let carnetForm: FormGroup = this.fb.group({
      id: [ carnet.id ] ,
      tipo:[ carnet.tipo , Validators.required],
      fechaEmision: [fEmi, Validators.required],
      fechaVenc: [ fVenc ] ,
      numeroCarnet: [ carnet.numeroCarnet, [ Validators.required, Validators.maxLength(40)] ],
      observaciones: [ carnet.observaciones ]
    });

    let noMayorFn = ( control: FormControl ) => this.noMayor( control, carnetForm );

    carnetForm.controls['fechaVenc'].setValidators([
      Validators.required, noMayorFn
    ]);

    return carnetForm;
  }

  noMayor( formControl: FormControl, form: FormGroup ): { [ s: string ]: boolean } {
    if (  formControl.value &&  form.controls['fechaEmision']  ) {
      const fechaE =  moment( form.controls['fechaEmision'].value, 'YYYY-MM-DD');
      const fechaV = moment(formControl.value, 'YYYY-MM-DD');
      if ( fechaE > fechaV ) {
          return { noMayor: true};
      }
    }
    return null;
  }


  get carnets(): FormArray {
    return this.formCarnet.get('carnets') as FormArray;
  };

  ngOnChanges() {

    if( this.formCarnet ){
      this.getCarnetsByChofer( this.chofer.choferPK.cho_emp_codigo,
                               this.chofer.choferPK.cho_codigo );
    }
  }

  getCarnetsByChofer( cho_emp_codigo:String, cho_codigo: number ){

    let incObservable:Observable<Response> =
    this.choferService.getCarnetsByChofer$( cho_emp_codigo, cho_codigo);

    incObservable.subscribe( data =>{
      this.carnetsChofer = data;
      this.setCarnets( this.carnetsChofer );
    });

  }

  addNuevoCarnet() {

    this.todosErrores.push( this.crearError());

    let carnetForm = this.fb.group({
      id:[0] ,
      tipo:[ null ,Validators.required],
      fechaEmision: [ null ,Validators.required],
      fechaVenc:[ null ],
      numeroCarnet:[ null ,[Validators.required, Validators.maxLength(40)]],
      observaciones:[ null ]
    });

    let noMayorFn = ( control: FormControl ) => this.noMayor( control, carnetForm );

    carnetForm.controls['fechaVenc'].setValidators([
      Validators.required, noMayorFn
    ]);

    this.carnets.push( carnetForm );


  }


  prepararSalvarCarnet():any {

    const formModel = this.formCarnet.value;
    // deep copy of form model lairs
    let carnetsDeepCopy:any = [];

    for (var i = 0; i < formModel.carnets.length; i++) {

            let fechaE = moment(formModel.carnets[i].fechaEmision, 'YYYY-MM-DD');
            let fechaV = moment(formModel.carnets[i].fechaVenc, 'YYYY-MM-DD');

            const unCarnet:Carnet={
                id : formModel.carnets[i].id,
                tipo: formModel.carnets[i].tipo,
                fechaEmision: fechaE.format() as any,
                fechaVenc: fechaV.format() as any,
                numeroCarnet: formModel.carnets[i].numeroCarnet,
                observaciones: formModel.carnets[i].observaciones
            };

            carnetsDeepCopy.push(unCarnet);
    }
    return carnetsDeepCopy;

  }



  salvarCarnet() {

    this.validateAllFormFields();
    this.checkFormValidity();

    if ( this.formCarnet.valid ) {
      this.salvar();
    }

  }


  salvar(){

        this.erroresGrales = [];
        let listaCarnet:ListaCarnet = {
          carnets: this.prepararSalvarCarnet()
        }

        this.choferService.saveCarnetsByChofer$( this.chofer.choferPK.cho_emp_codigo,
                                                this.chofer.choferPK.cho_codigo,  listaCarnet )
        .subscribe(result => {
          //this.parent.mostrarDetalle();
          this.closeModal();

        }, err => {

          this.erroresGrales.length =0;
          const data = err.json();

          this.ctrolError.tratarErroresBackEndLista(err, this.erroresGrales);

          if( err.status == 400 ){
            if( !data['errorCode'] ){

                const serverErrors = data['carnets'];
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



  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  borrarCarnet( index:number ) {
    if (index > -1) {
      this.todosErrores.splice(index, 1);
    }
    this.carnets.removeAt(index);
  }


  onChangeTipo( value, indice ){
      this.erroresGrales.length = 0;
      const formModel = this.formCarnet.value;

      for( let i: number= 0; i < this.carnets.length; i++ ){
        if( formModel.carnets[ i ].tipo == value
            && indice != i ) {
            this.erroresGrales.push('No pueden existir choferes repetidos');
        }
      }

   }

}
