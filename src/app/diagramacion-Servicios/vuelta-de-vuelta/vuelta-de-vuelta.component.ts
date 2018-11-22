import { Component, OnInit, Input } from '@angular/core';
import { VueltasService } from '../vueltas/vueltas.service';

@Component({
  selector: 'app-vuelta-de-vuelta',
  templateUrl: './vuelta-de-vuelta.component.html',
  styles: []
})
export class VueltaDeVueltaComponent implements OnInit {

  @Input() servicio;

  constructor(  public _vs: VueltasService ) { }

  ngOnInit() {

  }

}
