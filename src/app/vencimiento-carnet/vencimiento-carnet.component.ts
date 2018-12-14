import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ChoferService } from '../choferes/chofer.service';
import { Carnet, Chofer, VehiculosArray, ListaCarnet, CarnetChofer } from '../domain';
import { Observable } from 'rxjs';
import { MiUsuarioService } from '../_services/mi.usuario.service';
import { FuncionesGrales } from '../utiles/funciones.grales';

@Component({
  selector: 'app-vencimiento-carnet',
  templateUrl: './vencimiento-carnet.component.html',
  styleUrls: ['./vencimiento-carnet.component.css']
})
export class VencimientoCarnetComponent implements OnInit {

vencimientos: any = [];

  constructor(public choSer: ChoferService,
              private me: MiUsuarioService,
              @Inject(LOCALE_ID) public locale: string ) {

  }
  carnetsChofer: any = [];
  carnet: CarnetChofer;

  ngOnInit() {

   const observable: Observable<Carnet>
    = this.choSer.findVencimientos$( this.me.user.empresa);

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
