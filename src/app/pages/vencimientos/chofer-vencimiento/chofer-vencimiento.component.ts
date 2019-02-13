import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { VencimientosChoferes, CONSTANTES_CHOFER } from 'src/app/models/model.index';

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
    this.mostrarVencimientos();
  }

  mostrarVencimientos(){      
    for( let venc of this.vencimientosCho ){      
      venc.choferes.forEach( cho => {
          cho.carnets.forEach( carnet =>{
              let hoy = new Date();    
              carnet.vencido = carnet.fechaVenc.getTime() <= hoy.getTime();          
              carnet.descTipo = this.getDescTipo( carnet.tipo );    
          });          
      });
    }          
  } 

  getDescTipo( tipo: number ){      
      const estado = this.estados.find( c => c.codigo === tipo );
      return estado? estado.descripcion:'Sin definir';
  }

}
