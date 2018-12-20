import { Component, OnInit, Inject, LOCALE_ID, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FECHA_PATTERN } from 'src/app/utiles/const-data-model';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { ErrorService } from 'src/app/_services/error.service';

@Component({
  selector: 'app-search-by-fecha',
  templateUrl: './search-by-fecha.component.html',
  styles: []
})
export class SearchByFechaComponent implements OnInit {

  @Input() fechaInicio;
  @Input() fechaFin;
  @Output() buscarByFecha: EventEmitter<any> = new EventEmitter();


  searchForm: FormGroup;
  fInicio;
  fFin;

  constructor(  private fb: FormBuilder,
                @Inject(LOCALE_ID) public locale,
                private ctrolError: ErrorService ) {
    this.crearForm();
  }

  crearForm() {
    this.searchForm = this.fb.group({
      fInicio: [ 'null', Validators.required ],
      fFin: ['null', Validators.required ]
    });

    this.searchForm.valueChanges
    .subscribe( data => this.checkFormValidity() );
  }

  checkFormValidity() {
    this.ctrolError.checkFormValidity(this.searchForm, this.errMsgs,  this.translations);
  }

  ngOnInit() {


    // =====Sacar =============
    // this.fInicio = FuncionesGrales.formatearFecha( this.locale, '2018/11/30', FECHA_PATTERN ),
    // this.fFin = FuncionesGrales.formatearFecha( this.locale, '2018/12/02', FECHA_PATTERN ),
    // ===============================


    // ===== Dejar esto =============
    this.fInicio = new Date();
    this.fFin = new Date();
    

    if ( this.fechaInicio && this.fechaFin ) {
      this.fInicio = this.fechaInicio;
      this.fFin = this.fechaFin;
    }

    // ===============================

    this.searchForm.reset({
      fInicio: FuncionesGrales.formatearFecha( this.locale, this.fInicio, FECHA_PATTERN ),
      fFin: FuncionesGrales.formatearFecha( this.locale, this.fFin, FECHA_PATTERN )
    });

  }

  errMsgs: any = { fInicio:[], fFin: [] }

  translations: any = {
    fInicio: { required: 'Por favor especifique Fecha Inicio.'},
    fFin: { required: 'Por favor especifique Fecha Fin.'}
  }

  buscar() {

    this.ctrolError.validateAllFormFields( this.searchForm ) ;
    this.checkFormValidity();

    if ( this.searchForm.valid ) {
        const form = this.searchForm.getRawValue();
        this.buscarByFecha.emit( form );
    }

  }

}
