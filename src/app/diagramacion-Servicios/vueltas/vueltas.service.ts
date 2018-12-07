import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { FECHA_PATTERN_MOMENT, FECHA_PATTERN, CANTIDAD_DIAS_DIAGR_DEFAULT,
         FECHA_HORA_MOSTRAR_PATTERN, CANTIDAD_DIAS_DIAGR_ADICIONALES_VTA }
          from 'src/app/utiles/const-data-model';
import { DiagrService } from '../diagr.service';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';


@Injectable()
export class VueltasService {

  inicio: Date;
  fin: Date;
  finVuelta: Date;
  fechas: any = [];

  idLinIda: string;
  idLinVta: string;

  serviciosIda: any = [];
  serviciosVta: any = [];

  choferes: any = [];
  vehiculos: any = [];

  choferesOcupacion: any;

  vueltas:any = [];


  constructor( private _ds: DiagrService,
               private yo: MiUsuarioService,
               @Inject(LOCALE_ID) public locale: string   ) {

    this.inicio = new Date();

    this.fin = new Date();
    this.fin.setDate( this.fin.getDate() + CANTIDAD_DIAS_DIAGR_DEFAULT - 1 );

    this.finVuelta = new Date();
    this.finVuelta.setDate( this.finVuelta.getDate()
                      + CANTIDAD_DIAS_DIAGR_DEFAULT
                      + CANTIDAD_DIAS_DIAGR_ADICIONALES_VTA );

    this.generarFechas();
  }

  generarFechas() {
    this.fechas = [];
    //const DIAS = this.fin.getDate() - this.inicio.getDate() + 1;
    const DIAS = FuncionesGrales.diffDias( this.inicio, this.fin ) + 1 ;
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
    //this.getChoferes();
    this.getVehiculos();
    this.getChoferesOcupacion();
    this.getVueltas();

  }

  setLineas( lineas ) {
      this.idLinIda = lineas.idLinIda;
      this.idLinVta = lineas.idLinVta;
  }

  getServiciosIda( ) {
      this._ds.findSerConHorariosByLineaYfecha$( this.yo.getEmpresa(),
                                          this.idLinIda,
                                          FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
                                          FuncionesGrales.fromFecha( this.locale, this.fin, FECHA_PATTERN)   )
      .subscribe( this.okServiciosIda.bind( this ), this.errorServiciosIda.bind( this ) );
  }

  okServiciosIda( serviciosIda ) {     

      this.serviciosIda = serviciosIda;

      serviciosIda.forEach( serv  => {
      serv.servicioPK.serFechaHora = new Date( serv.servicioPK.serFechaHora );
      serv.fechaHoraLlegada = new Date( serv.fechaHoraLlegada );
      serv.fechaHoraSalida = new Date( serv.fechaHoraSalida );
      });
      this.ordenamientoServiciosAscendente(  this.serviciosIda );

      
      console.log(' serv Ida');
      console.log(this.serviciosIda);      
  }



  ordenamientoServiciosAscendente( servicios ) {
    servicios.sort(function (a, b) {
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

  ordenamientoServiciosDescendente( servicios ) {
      servicios.sort(function (a, b) {
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
      this._ds.findSerConHorariosByLineaYfecha$( this.yo.getEmpresa(),
      this.idLinVta,
      FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
      FuncionesGrales.fromFecha( this.locale, this.finVuelta, FECHA_PATTERN)   )
      .subscribe( this.okServiciosVta.bind( this ), this.errorServiciosIda.bind( this ) );
  }

  okServiciosVta( serviciosVta) {

    this.serviciosVta = serviciosVta;

    this.serviciosVta.forEach( serv  => {
        serv.servicioPK.serFechaHora = new Date( serv.servicioPK.serFechaHora );
        serv.fechaHoraLlegada = new Date( serv.fechaHoraLlegada );
        serv.fechaHoraSalida = new Date( serv.fechaHoraSalida );
        serv.servicioPKStr  = JSON.stringify( serv.servicioPK );
        serv.detalle  = FuncionesGrales.formatearFecha( this.locale, serv.fechaHoraSalida, FECHA_HORA_MOSTRAR_PATTERN );
    });

    this.ordenamientoServiciosAscendente( this.serviciosVta );

    console.log( 'Servicios Vta' );
    console.log( this.serviciosVta );
  }


  getChoferes() {
    this._ds.finChoferes$( this.yo.getEmpresa() )
    .subscribe( cho => {
                          this.choferes =  cho;
                          console.log( this.choferes );
                        } );
  }

  getVehiculos() {

    this._ds.findVehiculos$( this.yo.getEmpresa())
    .subscribe( v => {
                         this.vehiculos = v;
                         this.vehiculos.forEach( v => {
                             v.vehiculoPKStr = JSON.stringify( v.vehiculoPK );
                         });
                         console.log( this.vehiculos );
                     });

  }

  getChoferesOcupacion() {
         this._ds.findChoresOcupacion$( this.yo.getEmpresa(),
                          FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
                          FuncionesGrales.fromFecha( this.locale, this.finVuelta, FECHA_PATTERN) )
        .subscribe( this.okChoferes.bind( this ) );

  }

  okChoferes( data ) {
    this.choferesOcupacion = data;
    for ( let cho of this.choferesOcupacion) {
       for ( let serv of  cho.servicios ) {
         serv.servicioPK.serFechaHora = new Date( serv.servicioPK.serFechaHora );
         serv.fechaHoraSalida = new Date( serv.fechaHoraSalida );
         serv.fechaHoraLlegada = new Date( serv.fechaHoraLlegada );
       }
       for ( let inc of cho.incidencias ) {
           inc.inicio = new Date( inc.inicio );
           inc.fin = new Date( inc.fin );
       }
       for ( let v of cho.viajes ) {
         v.inicio = new Date( v.inicio );
         v.fin = new Date( v.fin );
       }       
    }
    console.log( this.choferesOcupacion );
  }

  getServRetorno( idServRetorno ) {
    return  this.serviciosVta.filter( ret => ret.servicioPKStr === idServRetorno )[0];
  }

  getChofer( choferSel ) {
      return this.choferesOcupacion.filter( cho => JSON.stringify( cho.choferPK ) == choferSel )[0];
  }


  getVueltas(){

    this._ds.getVueltas$( this.yo.getEmpresa(),
                          this.idLinIda,
                          FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
                          FuncionesGrales.fromFecha( this.locale, this.fin, FECHA_PATTERN) )
                          .subscribe( this.okVueltas.bind( this) );
  }

  okVueltas( vueltas ){
    console.log( vueltas );
    this.vueltas = vueltas;
  }

  errorVueltas( err ){
    console.log( err );
  }

}
