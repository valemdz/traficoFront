import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { FECHA_HORA_MOSTRAR_PATTERN, FECHA_PATTERN, FECHA_PATTERN_MOMENT,  } from 'src/app/utiles/const-data-model';
import { CANTIDAD_DIAS_DIAGR_DEFAULT } from '../../utiles/const-data-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';
import { DiagrService } from 'src/app/diagramacion-Servicios/diagr.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styles: []
})
export class PruebaComponent implements OnInit {

  fechas: any = [];
  private urlBase = environment.origin;
  choferesOcupacion: any;

  vueltas=[];

  /*inicioB = new Date(2018, 10, 21, 8, 0, 0);
  finB: Date = new Date(2018, 10, 22, 9, 30, 0);

  inicio = new Date(2018, 10, 21, 0, 0, 0);
  fin: Date = new Date(2018, 10, 22, 0, 0, 0);*/


  constructor(   @Inject( LOCALE_ID ) public locale,
                 private yo: MiUsuarioService,
                 private http: HttpClient,
                 private _ds: DiagrService  ) { }

  ngOnInit() {

    this.getVueltas();

  }

  
  getVueltas(){

    let inicio = FuncionesGrales.formatearFecha( this.locale, '2018/11/30', FECHA_PATTERN );
    let fin = FuncionesGrales.formatearFecha( this.locale, '2018/12/02', FECHA_PATTERN );

    this._ds.getVueltas$( this.yo.getEmpresa(),
                          "100",
                          inicio,
                           fin )
                          .subscribe( this.okVueltas.bind( this) );
  }

  okVueltas( vueltas ){
    
    this.vueltas = vueltas;

    let probar = FuncionesGrales.toFecha( '2018-12-03', FECHA_PATTERN_MOMENT );

    console.log( probar );

    let mayores = this.vueltas.filter( v => probar < v.servicio.servicioPK.serFechaHora  );

    console.log( mayores );

  }

 


}
