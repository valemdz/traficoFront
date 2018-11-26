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

  formVueltas: FormGroup;

  constructor(  public _vs: VueltasService,
                private fb: FormBuilder  ) {
      this.crearForm();
  }

  crearForm() {
    this.formVueltas = this.fb.group({
      peliIda: [ null, [ Validators.required ]],
      videoIda: [ null, [ Validators.required ]],
      peliVta: [ null, [ Validators.required ]],
      videoVta: [ null, [ Validators.required ]]
    });
  }

  ngOnInit() {
  }

}
