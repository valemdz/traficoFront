import { Component, Input  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'control-mensajes',
  template: `<div *ngIf="errores.length" class="alert alert-danger">
                <ul>
                    <li *ngFor="let error of errores">
                    {{error}}
                    </li>
                </ul>
                </div>`
})
export class MensajesComponent {
  @Input() errores:any=[];    

}