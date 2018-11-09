import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdaVtaListService } from '../ida-vta-list/ida-vta-list.service';
import { Subscription } from 'rxjs';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';
import { ErrorService } from 'src/app/_services/error.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-enlace-lineas',
  templateUrl: './enlace-lineas.component.html',
  styleUrls: ['./enlace-lineas.component.css']
})
export class EnlaceLineasComponent implements OnInit, OnDestroy {

  lineasSubs: Subscription;
  saveSubs: Subscription;
  formIdaVuelta: FormGroup;
  comboLineas: any [] = [];

  @Output() actualizarPadre: EventEmitter<void> = new EventEmitter();

  constructor( private yo: MiUsuarioService,
               private fb: FormBuilder,
               private _ivs: IdaVtaListService,
               private ctrolError: ErrorService,
               private router: Router ) {   this.crearForm(); }

  ngOnInit() {
    this.lineasSubs = this._ivs.getLineasByEmpresa$( this.yo.getEmpresa() )
    .subscribe( this.okLineas.bind( this ), this.errorLlamada.bind( this )  );
  }

  crearForm() {
    this.formIdaVuelta = this.fb.group({
       lineaPKIda: [null, [ Validators.required ] ],
       lineaPKVta: [null, [ Validators.required ] ]
    });

    this.formIdaVuelta.valueChanges
    .subscribe( data => this.ctrolError.checkFormValidity( this.formIdaVuelta,
                                                           this.errMsgs,
                                                           this.translations ) );
  }

  erroresGrales:any=[];

  errMsgs: any = {
    lineaPKIda: [],
    lineaPKVta: []
  };

  translations: any = { lineaPKIda:{ required: 'Por favor especifique un Linea Ida.' },
                        lineaPKVta: { required: 'Por favor especifique una Linea Vta.' },
                        gral:{}};

  ngOnDestroy(): void {
    if ( this.lineasSubs ) { this.lineasSubs.unsubscribe();  }
    if( this.saveSubs ) { this.saveSubs.unsubscribe(); }
  }

  okLineas( lineas ) {
    this.comboLineas = lineas;
    this.comboLineas.forEach( item => {
        item.linNombre = `${item.lineaPK.linCodigo} - ${item.linNombre}`;
        item.lineaPK = JSON.stringify( item.lineaPK );
    });
  }

  salvarEnlaceLineas() {

    this.ctrolError.validateAllFormFields( this.formIdaVuelta ) ;
    this.ctrolError.checkFormValidity( this.formIdaVuelta, this.errMsgs,  this.translations );


    if ( this.formIdaVuelta.valid ) {
      const enlace = this.prepararEnlace();
      this.saveSubs = this._ivs.saveEnlaceLineas$( enlace )
                      .subscribe( this.okSaveEnlace.bind( this ), this.errorLlamada.bind( this ) ) ;
    }

  }

  okSaveEnlace() {
    this.limpiarForm();
    this.actualizarPadre.emit();
  }

  errorLlamada( err ) {
    this.ctrolError.tratarErrores( err, null, null, null );
  }


  prepararEnlace() {
    const form = this.formIdaVuelta.getRawValue();
    return { empCodigo: this.yo.getEmpresa(),
             idaPK: JSON.parse( form.lineaPKIda ),
             vueltaPK: JSON.parse( form.lineaPKVta ) };
  }

  limpiarForm() {
    this.formIdaVuelta.reset({
      lineaPKIda: null,
      lineaPKVta: null
    });
  }

  volver() {
    this.router.navigate(['home']);
  }


}
