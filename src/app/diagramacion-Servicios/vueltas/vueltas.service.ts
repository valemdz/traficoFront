import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { FECHA_PATTERN_MOMENT, FECHA_PATTERN, CANTIDAD_DIAS_DIAGR_DEFAULT,
         FECHA_HORA_MOSTRAR_PATTERN, CANTIDAD_DIAS_DIAGR_ADICIONALES_VTA }
          from 'src/app/utiles/const-data-model';
import { DiagrService } from '../diagr.service';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';
import { Vuelta } from 'src/app/models/vuelta.model';
import { Servicio } from 'src/app/models/servicio.model';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import { LoaderService } from 'src/app/_services/loader.service';

@Injectable()
export class VueltasService {

  inicio: Date;
  fin: Date;
  finVuelta: Date;
  fechas: any = [];

  idLinIda: string;
  idLinVta: string;

  serviciosIda: Servicio[] = [];
  serviciosVta: Servicio[] = [];  
  vehiculos: any = [];
  choferesOcupacion: any;
  vueltas:Vuelta[] = [];

  datosVueltasSubs:Subscription;

  loaded = false;


  constructor( private _ds: DiagrService,  private loaderService: LoaderService,
               private yo: MiUsuarioService,
               @Inject(LOCALE_ID) public locale: string   ) {

    this.inicio = new Date();

    this.fin = new Date();
    this.fin.setDate( this.fin.getDate() + CANTIDAD_DIAS_DIAGR_DEFAULT - 1 );

    this.finVuelta = new Date();
    this.finVuelta.setDate( this.finVuelta.getDate()
                      + CANTIDAD_DIAS_DIAGR_DEFAULT
                      + CANTIDAD_DIAS_DIAGR_ADICIONALES_VTA );
    
  }

  OnInit( formFechas ){

      this.loaderService.displayConjunto(true);
      this.loaded = false;


      this.inicio = FuncionesGrales.toFecha( formFechas.fInicio ,  FECHA_PATTERN_MOMENT );
      this.fin = FuncionesGrales.toFecha( formFechas.fFin ,  FECHA_PATTERN_MOMENT );

      this.generarFechas();

      const servIda$ = this.getServiciosIda$();
      const servVta$ = this.getServiciosVta$();
      const vehiculos$ = this.getVehiculos$();
      const choOcupacion$ = this.getChoferesOcupacion$(); 
      const vueltas$ = this.getVueltas$();

      this.datosVueltasSubs = Observable.forkJoin([ servIda$, 
                                                 servVta$, 
                                                 vehiculos$, 
                                                 choOcupacion$,
                                                 vueltas$])
          .subscribe( this.okParalelo.bind(this));
                                                 
  } 

  okParalelo( respuesta ){

    this.okServiciosIda( respuesta[0] );
    this.okServiciosVta( respuesta[1] );
    this.okVehiculos( respuesta[2] );
    this.okChoferes( respuesta[3] ) ;
    this.okVueltas( respuesta[4] );

    this.loaded = true;
    this.loaderService.displayConjunto(false);
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

  setLineas( lineas ) {
      this.idLinIda = lineas.idLinIda;
      this.idLinVta = lineas.idLinVta;
  }

 
  getServiciosIda$() {
      return this._ds.findSerConHorariosByLineaYfecha$( this.yo.getEmpresa(),
                  this.idLinIda,
                  FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
                  FuncionesGrales.fromFecha( this.locale, this.fin, FECHA_PATTERN)  );
      //.subscribe( this.okServiciosIda.bind( this ), this.errorServiciosIda.bind( this ) );
  }



  okServiciosIda( serviciosIda ) { 
      this.serviciosIda = serviciosIda;     
      this.ordenamientoServiciosAscendente(  this.serviciosIda );
      console.log('Serv Ida');                  
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

  getServiciosVta$() {
      return this._ds.findSerConHorariosByLineaYfecha$( this.yo.getEmpresa(),
                  this.idLinVta,
                  FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
                  FuncionesGrales.fromFecha( this.locale, this.finVuelta, FECHA_PATTERN)   );

      //.subscribe( this.okServiciosVta.bind( this ), this.errorServiciosIda.bind( this ) );
  }

  okServiciosVta( serviciosVta) {

    this.serviciosVta = serviciosVta;
    this.serviciosVta.forEach( serv  => {      
        serv.servicioPKStr  = JSON.stringify( serv.servicioPK );
        serv.detalle  = FuncionesGrales.formatearFecha( this.locale, serv.fechaHoraSalida, FECHA_HORA_MOSTRAR_PATTERN );
    });
    this.ordenamientoServiciosAscendente( this.serviciosVta );
    console.log( 'Servicios Vta' );
    console.log( this.serviciosVta );
  } 

  getVehiculos$() {
     return this._ds.findVehiculos$( this.yo.getEmpresa());
  }

  okVehiculos( v ){      
    this.vehiculos = v;
    this.vehiculos.forEach( v => {
        v.vehiculoPKStr = JSON.stringify( v.vehiculoPK );
    });
    console.log( this.vehiculos );  
  }

  getChoferesOcupacion$() {
        return  this._ds.findChoresOcupacion$( this.yo.getEmpresa(),
                          FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
                          FuncionesGrales.fromFecha( this.locale, this.finVuelta, FECHA_PATTERN) );

        //.subscribe( this.okChoferes.bind( this ) );

  }

  okChoferes( data ) {
    this.choferesOcupacion = data;    
    console.log( this.choferesOcupacion );
  }

  getServRetorno( idServRetorno ) {
    return  this.serviciosVta.find( ret => ret.servicioPKStr === idServRetorno );
  }

  getChofer( choferSel ) {
      return this.choferesOcupacion.filter( cho => JSON.stringify( cho.choferPK ) == choferSel )[0];
  }


  getVueltas$(){

    return this._ds.getVueltas$( this.yo.getEmpresa(),
                          this.idLinIda,
                          FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
                          FuncionesGrales.fromFecha( this.locale, this.fin, FECHA_PATTERN) );

      //.subscribe( this.okVueltas.bind( this) );
  }

  getVuelta( idaPK ){
    let vuelta =  this.vueltas.find( v  => JSON.stringify( v.servicio.servicioPK ) == JSON.stringify(idaPK ) );
    return vuelta;
  }

  okVueltas( vueltas ){
    console.log( vueltas );
    this.vueltas = vueltas;
  }

  errorVueltas( err ){
    console.log( err );
  }

  OnDestroy() {
    if( this.datosVueltasSubs ){ 
      this.datosVueltasSubs.unsubscribe();
    }
  }

}
