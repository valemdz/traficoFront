import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { FECHA_HORA_MOSTRAR_PATTERN,  } from 'src/app/utiles/const-data-model';
import { CANTIDAD_DIAS_DIAGR_DEFAULT } from '../../utiles/const-data-model';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styles: []
})
export class PruebaComponent implements OnInit {

  fechas: any = [];

  constructor(   @Inject( LOCALE_ID ) public locale  ) { }

  ngOnInit() {

    const inicio = new Date();
    let fin: Date = new Date();
    fin.setDate( fin.getDate() + CANTIDAD_DIAS_DIAGR_DEFAULT  );

    for ( let i = 0; i < CANTIDAD_DIAS_DIAGR_DEFAULT; i++ ) {
        const fecha = new Date( inicio.getTime() );
        fecha.setDate( fecha.getDate() + i );
        this.fechas.push( fecha );
    }

    console.log( this.fechas );

  }

}
