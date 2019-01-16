import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ChoferService, UsuarioService } from 'src/app/services/service.index';

import { CarnetChofer, Carnet } from 'src/app/domain';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';



@Component({
  selector: 'app-vencimiento-carnet',
  templateUrl: './vencimiento-carnet.component.html',
  styleUrls: ['./vencimiento-carnet.component.css']
})
export class VencimientoCarnetComponent implements OnInit {

vencimientos: any = [];

  constructor(public choSer: ChoferService,
              public _us: UsuarioService,
              @Inject(LOCALE_ID) public locale: string ) {

  }
  carnetsChofer: any = [];
  carnet: CarnetChofer;

  ngOnInit() {

   const observable: Observable<Carnet>
    = this.choSer.findVencimientos$( this._us.usuario.empresa);

    observable.subscribe( data => {
      this.carnetsChofer = data;
      this.setCarnets(this.carnetsChofer);
    });
  }




  /*const fEmi = FuncionesGrales.formatearFecha( this.locale, carnet.fechaEmision, 'yyyy-MM-dd' );
  const fVenc = FuncionesGrales.formatearFecha( this.locale, carnet.fechaVenc, 'yyyy-MM-dd');
  */
  setCarnets(carnets: CarnetChofer[]) {
  
for (let i = 0; i < carnets.length; i++) {
    this.carnet = carnets[i];
    console.log('carnets: ', carnets[i]);
  this.carnet.fechaEmisionString = FuncionesGrales.formatearFecha( this.locale, carnets[i].fechaEmision, 'dd-MM-yyyy' );
  this.carnet.fechaVencString = FuncionesGrales.formatearFecha( this.locale, carnets[i].fechaVenc, 'dd-MM-yyyy');
 this.vencimientos.push(this.carnet) ;
 

}
  }


}
