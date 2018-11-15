import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { FECHA_PATTERN_MOMENT, FECHA_PATTERN, CANTIDAD_DIAS_DIAGR_DEFAULT, FECHA_HORA_MOSTRAR_PATTERN } from 'src/app/utiles/const-data-model';
import { DiagrService } from '../diagr.service';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';


@Injectable()
export class VueltasService {

  inicio: Date;
  fin: Date;
  fechas: any = [];

  idLinIda: string;
  idLinVta: string;

  serviciosIda: any = [];
  serviciosVta: any = [];

  choferes: any = [];
  vehiculos: any = [];

  constructor( private _ds: DiagrService,
               private yo: MiUsuarioService,
               @Inject(LOCALE_ID) public locale: string   ) {

    this.inicio = new Date();
    this.fin = new Date();
    this.fin.setDate( this.fin.getDate() + CANTIDAD_DIAS_DIAGR_DEFAULT - 1 );
    this.generarFechas();
  }



  generarFechas() {
    this.fechas = [];
    const DIAS = this.fin.getDate() - this.inicio.getDate() + 1;
    for ( let i = 0; i < DIAS; i++ ) {
      const fecha = new Date( this.inicio.getTime() );
      fecha.setDate( fecha.getDate() + i );
      this.fechas.push( fecha );
    }
  }

  setFechas( formFechas ) {

    this.inicio = FuncionesGrales.toFecha( formFechas.fInicio ,  FECHA_PATTERN_MOMENT );
    this.fin = FuncionesGrales.toFecha( formFechas.fFin ,  FECHA_PATTERN_MOMENT );

    this.generarFechas();
    this.getServiciosIda();
    this.getServiciosVta();
    this.getChoferes();
    this.getVehiculos();

  }

  setLineas( lineas ) {
      this.idLinIda = lineas.idLinIda;
      this.idLinVta = lineas.idLinVta;
  }

  getServiciosIda( ) {
      this._ds.findSerConHorariosByLineaYfecha( this.yo.getEmpresa(),
                                          this.idLinIda,
                                          FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
                                          FuncionesGrales.fromFecha( this.locale, this.fin, FECHA_PATTERN)   )
      .subscribe( this.okServiciosIda.bind( this ), this.errorServiciosIda.bind( this ) );
  }

  okServiciosIda( serviciosIda ) {

      this.serviciosIda = serviciosIda;
      this.serviciosIda.forEach( serv  => {
         serv.servicioPK.serFechaHora = new Date( serv.servicioPK.serFechaHora );
         serv.fechaHolaLlegada = new Date( serv.fechaHolaLlegada );
         serv.fechaHoraSalida = new Date( serv.fechaHoraSalida );
      });

      this.ordenamientoIdaAscendente();
  }

  ordenamientoIdaAscendente() {
    this.serviciosIda.sort(function (a, b) {
      if ( a.servicioPK.serFechaHora > b.servicioPK.serFechaHora ) {
        return 1;
      }
      if (a.servicioPK.serFechaHora < b.servicioPK.serFechaHora ) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  ordenamientoIdaDescendente() {
    this.serviciosIda.sort(function (a, b) {
      if ( a.servicioPK.serFechaHora < b.servicioPK.serFechaHora ) {
        return 1;
      }
      if (a.servicioPK.serFechaHora > b.servicioPK.serFechaHora ) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  errorServiciosIda( err ) {

  }

  getServiciosVta() {
      this._ds.findSerConHorariosByLineaYfecha( this.yo.getEmpresa(),
      this.idLinVta,
      FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
      FuncionesGrales.fromFecha( this.locale, this.fin, FECHA_PATTERN)   )
      .subscribe( this.okServiciosVta.bind( this ), this.errorServiciosIda.bind( this ) );
  }

  okServiciosVta( serviciosVta) {

    this.serviciosVta = serviciosVta;
    console.log( this.serviciosVta );
    this.serviciosVta.forEach( serv  => {
        serv.servicioPK.serFechaHora = new Date( serv.servicioPK.serFechaHora );
        serv.fechaHolaLlegada = new Date( serv.fechaHolaLlegada );
        serv.fechaHoraSalida = new Date( serv.fechaHoraSalida );
        serv.servicioPKStr  = JSON.stringify( serv.servicioPK );
        serv.detalle  = FuncionesGrales.formatearFecha( this.locale, serv.fechaHoraSalida, FECHA_HORA_MOSTRAR_PATTERN );
    });

      console.log('SERV vta');
      console.log( this.serviciosVta );

      //this.ordenamientoIdaAscendente();
  }


  getChoferes() {
    this._ds.finChoferes( this.yo.getEmpresa() )
    .subscribe( cho => {
                          this.choferes =  cho;
                          console.log( this.choferes );
                        } );
  }

  getVehiculos() {

    this._ds.findVehiculos( this.yo.getEmpresa())
    .subscribe( v => { this.vehiculos = v; console.log( this.vehiculos ); });

  }





}
