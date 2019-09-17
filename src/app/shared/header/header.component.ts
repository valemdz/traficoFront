import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService, VencimientoService } from 'src/app/services/service.index';
import { timer, Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  INICIO = 3000; /*3''*/
  INTERVALO = 300000;/*3'*/
 
  oculto='oculto'; 

  vencimientosSubscription: Subscription;

  constructor( public _us: UsuarioService, public _vs: VencimientoService ) { }

  ngOnInit() {
      this.vencimientosSubscription = 
      timer( this.INICIO, this.INTERVALO ).subscribe( () => this.comprobarExistenciaVencimiento() );   
  }

  ngOnDestroy(): void {
      if( this.vencimientosSubscription ){ this.vencimientosSubscription.unsubscribe(); }
  }

  comprobarExistenciaVencimiento(){

     console.log(  new Date() );

     this._vs.existenVencimientos$( this._us.usuario.empresa ).subscribe( resp =>{
          if( resp ){ 
            this.oculto = ''
          }else{ 
            this.oculto ='oculto';
          }    
        });

  }

}
