import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { VencimientosChoferes, CONSTANTES_CHOFER, Chofer } from 'src/app/models/model.index';

@Component({
  selector: 'app-chofer-vencimiento',
  templateUrl: './chofer-vencimiento.component.html',
  styles: []
})
export class ChoferVencimientoComponent implements OnInit, OnChanges { 

  @Input() vencimientosCho:VencimientosChoferes[];

  estados = CONSTANTES_CHOFER.ESTADOS_CARNETS;

  constructor() { }

  ngOnInit() {  
  }

  ngOnChanges( ): void {      
  }  

  getDescTipo( tipo: number ){      
      const estado = this.estados.find( c => c.codigo === tipo );
      return estado? estado.descripcion:'Sin definir';
  }

  getDiasProximoVencimiento( vencimientos, tipoVencimiento  ){
    let vencimientoSelected = vencimientos.find( v => v.nombreCampo === tipoVencimiento);    
    return vencimientoSelected!= null? vencimientoSelected.diasAntesVencer:0;

  }

}
