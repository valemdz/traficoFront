import { Injectable, Inject, LOCALE_ID } from '@angular/core';

import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { Observable, Subscription, of } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import { DiagrService } from './diagr.service';
import { LoaderService } from '../mensajes/loader.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Servicio, Vuelta, CONSTANTES_VIAJE, ConstantesGrales, CONSTANTES_VEHICULOS } from 'src/app/models/model.index';
import { map, catchError } from 'rxjs/operators';



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
  choferesOcupacion: any;
  vueltas:Vuelta[] = [];
  vehiOcupacion:any;

  datosVueltasSubs:Subscription;

  loaded = false;


  constructor( private _ds: DiagrService,  
               private loaderService: LoaderService,
               private _us: UsuarioService,
               @Inject(LOCALE_ID) public locale: string   ) {

    this.inicio = new Date();
    this.fin = new Date();
    this.fin.setDate( this.fin.getDate() + CONSTANTES_VIAJE.CANTIDAD_DIAS_DIAGR_DEFAULT - 1 );

    this.finVuelta = new Date( this.fin.getTime());
    this.finVuelta.setDate( this.finVuelta.getDate()                     
                                + CONSTANTES_VIAJE.CANTIDAD_DIAS_DIAGR_ADICIONALES_VTA );  
  }

  setFechas( formFechas ){
    this.inicio = FuncionesGrales.toFecha( formFechas.fInicio ,  ConstantesGrales.FECHA_PATTERN_MOMENT );
    this.fin = FuncionesGrales.toFecha( formFechas.fFin ,  ConstantesGrales.FECHA_PATTERN_MOMENT );
    this.finVuelta = new Date( this.fin.getTime());
    this.finVuelta.setDate( this.finVuelta.getDate()                     
                                + CONSTANTES_VIAJE.CANTIDAD_DIAS_DIAGR_ADICIONALES_VTA );    
  }

  OnInit( formFechas ){
      this.setFechas( formFechas );      
      this.loaded = false;      
      this.generarFechas();
      this.llamadaEnParalelo();                                                 
  } 

  /*llamadaEnParalelo(){
    this.loaderService.displayConjunto(true);
    const servIda$ = this.getServiciosIda$();
    const servVta$ = this.getServiciosVta$();      
    const choOcupacion$ = this.getChoferesOcupacion$(); 
    const vueltas$ = this.getVueltas$();
    const vehOcupacion$ = this.getVehiculosOcupacion$();

    this.datosVueltasSubs = Observable.forkJoin([ servIda$, 
                                                  servVta$,                                                  
                                                  choOcupacion$,
                                                  vueltas$,
                                                  vehOcupacion$])
        .subscribe( this.okParalelo.bind(this));
  }*/

  llamadaEnParalelo(){
    this.loaderService.displayConjunto(true);
    const servIda$ = this.getServiciosIda$().pipe( map( (res) => res ), catchError(  error => of([]) )) ;
    const servVta$ = this.getServiciosVta$().pipe( map( (res) => res ), catchError(  error => of([]) )) ;      
    const choOcupacion$ = this.getChoferesOcupacion$().pipe( map( (res) => res ), catchError(  error => of([]) )) ; 
    const vueltas$ = this.getVueltas$().pipe( map( (res) => res ), catchError(  error => of([]) )) ;
    const vehOcupacion$ = this.getVehiculosOcupacion$().pipe( map( (res) => res ), catchError(  error => of([]) )) ;

    this.datosVueltasSubs = Observable.forkJoin([ servIda$, 
                                                  servVta$,                                                  
                                                  choOcupacion$,
                                                  vueltas$,
                                                  vehOcupacion$])
        .subscribe( this.okParalelo.bind(this));
  }

  okParalelo( respuesta ){

    this.okServiciosIda( respuesta[0] );
    this.okServiciosVta( respuesta[1] );    
    this.okChoferes( respuesta[2] ) ;
    this.okVueltas( respuesta[3] );
    this.okVehiculosOcupacion( respuesta[4] );

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
      return this._ds.findSerConHorariosByLineaYfecha$( this._us.usuario.empresa,
                  this.idLinIda,
                  FuncionesGrales.fromFecha( this.locale, this.inicio, ConstantesGrales.FECHA_PATTERN),
                  FuncionesGrales.fromFecha( this.locale, this.fin, ConstantesGrales.FECHA_PATTERN)  );
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
      return this._ds.findSerConHorariosByLineaYfecha$( this._us.usuario.empresa,
                  this.idLinVta,
                  FuncionesGrales.fromFecha( this.locale, this.inicio, ConstantesGrales.FECHA_PATTERN),
                  FuncionesGrales.fromFecha( this.locale, this.finVuelta, ConstantesGrales.FECHA_PATTERN)   );

      //.subscribe( this.okServiciosVta.bind( this ), this.errorServiciosIda.bind( this ) );
  }

  okServiciosVta( serviciosVta) {

    this.serviciosVta = serviciosVta;
    this.serviciosVta.forEach( serv  => {      
        serv.servicioPKStr  = JSON.stringify( serv.servicioPK );
        serv.detalle  = FuncionesGrales.formatearFecha( this.locale, serv.fechaHoraSalida, ConstantesGrales.FECHA_HORA_MOSTRAR_PATTERN );
    });
    this.ordenamientoServiciosAscendente( this.serviciosVta );
    console.log( 'Servicios Vta' );
    console.log( this.serviciosVta );
  } 

  getVehiculos$() {
     return this._ds.findVehiculos$( this._us.usuario.empresa );
  } 

  getChoferesOcupacion$() {
        return  this._ds.findChoresOcupacion$( this._us.usuario.empresa,
                          FuncionesGrales.fromFecha( this.locale, this.inicio, ConstantesGrales.FECHA_PATTERN),
                          FuncionesGrales.fromFecha( this.locale, this.finVuelta, ConstantesGrales.FECHA_PATTERN) );

        //.subscribe( this.okChoferes.bind( this ) );

  }

  getVehiculosOcupacion$() {
     // Trae todos lo vehiculos con ocupacion
     return  this._ds.findVehiculosOcupacion$( this._us.usuario.empresa,
                          FuncionesGrales.fromFecha( this.locale, this.inicio, ConstantesGrales.FECHA_PATTERN),
                          FuncionesGrales.fromFecha( this.locale, this.finVuelta, ConstantesGrales.FECHA_PATTERN) );                          
  }

  okChoferes( data ) {
    this.choferesOcupacion = data;    
    console.log('choferes', this.choferesOcupacion );
  }

  getServRetorno( idServRetorno ) {
    return  this.serviciosVta.find( ret => ret.servicioPKStr === idServRetorno );
  }

  getChofer( choferSel ) {
      return this.choferesOcupacion.find( cho => JSON.stringify( cho.choferPK ) == choferSel );
  }

  getChoferByNombreConTipo( choferNombre ) {
    return this.choferesOcupacion.find( cho => cho.nombreConTipo == choferNombre );
  }

  getVueltas$(){

    return this._ds.getVueltas$( this._us.usuario.empresa,
                          this.idLinIda,
                          FuncionesGrales.fromFecha( this.locale, this.inicio, ConstantesGrales.FECHA_PATTERN),
                          FuncionesGrales.fromFecha( this.locale, this.fin, ConstantesGrales.FECHA_PATTERN) );

      //.subscribe( this.okVueltas.bind( this) );
  }

  getFullVueltas$() {

    return this._ds.getFullVueltas$( this._us.usuario.empresa,
                           FuncionesGrales.fromFecha( this.locale, this.inicio, ConstantesGrales.FECHA_PATTERN),
                          FuncionesGrales.fromFecha( this.locale, this.fin, ConstantesGrales.FECHA_PATTERN) );

  }

  getVuelta( idaPK ){
    let vuelta =  this.vueltas.find( v  => JSON.stringify( v.servicio.servicioPK ) == JSON.stringify(idaPK ) );
    return vuelta;
  }

  okVueltas( vueltas ){
    console.log( vueltas );
    this.vueltas = vueltas;
  }

  okVehiculosOcupacion( vehiculos){
     this.vehiOcupacion = vehiculos;
     this.vehiOcupacion = 
              this.vehiOcupacion.filter(  v => v.estado === CONSTANTES_VEHICULOS.HABILITADO );
     console.log( 'okVehiculosOcupacion ');
     console.log( this.vehiOcupacion );
  }

  errorVueltas( err ){
    console.log( err );
  }

  OnDestroy() {
    if( this.datosVueltasSubs ){ 
      this.datosVueltasSubs.unsubscribe();
    }
  }

  ///============== Operaciones sobre array Vueltas ========================

  addVuelta( vuelta: Vuelta ){    
    this.vueltas.push( vuelta ); 
  }

  removeVuelta( vuelta: Vuelta ){    
    if( vuelta ){
        const idx = this.vueltas.findIndex( (v:any)  => v.id === vuelta.id );
        if ( idx > -1 ) {
            this.vueltas.splice( idx, 1);
        }    
    }       
  }

  replaceVuelta( vuelta: Vuelta ){    
    if( vuelta ){
        const idx = this.vueltas.findIndex( (v:any)  => v.id === vuelta.id );
        if ( idx > -1 ) {
            this.vueltas[ idx ] = vuelta;
        }        
    }     
  }

}
