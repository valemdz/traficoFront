import { Component, OnInit, Input } from '@angular/core';
import { VueltasService } from '../vueltas/vueltas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vuelta-de-vuelta',
  templateUrl: './vuelta-de-vuelta.component.html',
  styles: []
})
export class VueltaDeVueltaComponent implements OnInit {

  @Input() serv;

  servRet;
  choferesIda = [];
  unidadIda;
  choferesVta = [];
  unidadVta;

  formVueltas: FormGroup;

  constructor(  public _vs: VueltasService,
                private fb: FormBuilder  ) {
      this.crearForm();
  }

  crearForm() {
    this.formVueltas = this.fb.group({
      peliIda: [ null, [ Validators.required ]],
      videoIda: [ null, [ Validators.required ]],
      internoIda: [ null, [ Validators.required ]],
      peliVta: [ null, [ Validators.required ]],
      videoVta: [ null, [ Validators.required ]],
      internoVta: [ null, [ Validators.required ]],
    });
  }

  ngOnInit() {
    if ( this.serv ) {
       this.choferesIda = this.serv.choferes.slice();
    }
  }


  salvarForm() {
    if ( this.formVueltas.valid ) {

    }


    console.log( this.prepararVuelta() );
  }

  prepararVuelta() {
    const form = this.formVueltas.getRawValue();
    return {
          peliIda: form.peliIda,
          videoIda: form.videoIda,
          servIda: {
            servicioPK: this.serv.servicioPK,
            choferes: this.choferesIda,
            vehiculo: JSON.parse( form.internoIda )
           },
           peliVta: form.peliVta,
           videoVta: form.videoVta,
           servRet: {
              servicioPK: this.servRet.servicioPK,
              choferes: this.choferesVta,
              vehiculo: JSON.parse( form.internoVta )
           }
    };

  }

  onChangeServRetorno(   idServRetorno ) {
    this.servRet = this._vs.getServRetorno( idServRetorno );
    if ( this.servRet ) {
      this.choferesVta = this.servRet.choferes.slice();
    }
  }

  addChofer( choferes, choferSel ) {

    const chofer = this._vs.getChofer( choferSel );
    const cho = {
      choferPK : chofer.choferPK,
      nombre: '(' + chofer.descTipo + ') ' + chofer.nombre,
    };
    choferes.push( cho );
  }

  removeChofer( choferes, index ) {
    choferes.splice(index, 1);
  }

}
