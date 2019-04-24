import { Injectable } from '@angular/core';
import { Horario, ChoferOcupacion, ChoferServicio, CONSTANTES_CHOFER, VehiculoPK, VehiculoOcupacion, VehiculoServicio } from 'src/app/models/model.index';
import { VueltasService } from 'src/app/services/service.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';

@Injectable()
export class GenerarChoferesServicioService {

  empresa='***';
  horarios:Horario[]
  choferes = [];
  vehiculos:VehiculoServicio[] =[];

  constructor( public _vs: VueltasService ) { }

  generarVehiculo( horarios:Horario[], empresa:string ){

    this.vehiculos = [];

    var vehiculos = Array.from(new Set( this.horarios.filter( h => h.interno != null )
    .map( h => h.interno) ));  

    vehiculos.forEach( (interno:any) =>{                   
    
        let vehiculosByInterno = this.horarios.filter( h => h.interno === interno );
        FuncionesGrales.ordenamientoAscendente( vehiculosByInterno, 'codigoEtapa' );
        //primera etapa
        let horarioInicio:Horario = vehiculosByInterno[0];                 
        //ultima etapa
        let horarioFin:Horario = vehiculosByInterno[ vehiculosByInterno.length - 1 ];
        const vehiculoPK: VehiculoPK = { vehEmpCodigo: empresa,  vehInterno: interno }
        let vehiculo: VehiculoOcupacion = this._vs.findVehiculosByVehiculoPK( vehiculoPK );

        if( vehiculo != null ){
            const unVehiculo:VehiculoServicio = {
              vehiculoPK: vehiculo.vehiculoPK,        
              etaDesde: horarioInicio.codigoEtapa,	
              etaHasta: horarioFin.codigoEtapa,
              fechaHoraSalida: horarioInicio.fechaHoraSalida,
              fechaHoraLlegada: horarioFin.fechaHoraLlegada,         
            };    
            this.vehiculos.push( unVehiculo ); 
        }                                    
    });    
    return this.vehiculos;
  }

  generarChoferes( horarios:Horario[], empresa:string ){
    this.empresa = empresa;
    this.horarios = horarios;
    this.choferes = [];
    this.generarChoferes1();
    this.generarChoferes2();
    this.generarAux1();
    this.generarAux2();  
    return this.choferes;
  }

  generarChoferes1(){
    
    var choferes1 = Array.from(new Set( this.horarios.filter( h => h.chofer1 != null )
                                                     .map( h => h.chofer1) ));  
    choferes1.forEach( (codigo:any) =>{                   
    
          let choferesByCodigo = this.horarios.filter( h => h.chofer1 === codigo );
          FuncionesGrales.ordenamientoAscendente( choferesByCodigo, 'codigoEtapa' );

          //primera etapa
          let horarioInicio:Horario = choferesByCodigo[0];                 
          //ultima etapa
          let horarioFin:Horario = choferesByCodigo[ choferesByCodigo.length - 1 ];  

          let chofer: ChoferOcupacion = this._vs.getChoferByChoferPK( { cho_emp_codigo: this.empresa,  cho_codigo: codigo } );
          
          const unChofer:ChoferServicio = {
            choferPK: { cho_emp_codigo: this.empresa,  cho_codigo: codigo },    
            tipoChofer: chofer?chofer.tipoChofer:-1,
            etaDesde: horarioInicio.codigoEtapa,	
            etaHasta: horarioFin.codigoEtapa,
            fechaHoraSalida: horarioInicio.fechaHoraSalida,
            fechaHoraLlegada: horarioFin.fechaHoraLlegada,
            nombre:	chofer?chofer.nombre:'*****',
            nombreConTipo:chofer?chofer.nombreConTipo:'',
            ordenChofer: CONSTANTES_CHOFER.PRIMER_CHOFER,
            idAux:chofer?chofer.cho_id_aux:-1  
          };
          this.choferes.push( unChofer);                              
    } ); 

  }

  generarChoferes2(){
    
      var choferes2 = Array.from(new Set( this.horarios.filter( h => h.chofer2 != null )
                                                       .map( h => h.chofer2) ));  
      choferes2.forEach( (codigo:any) =>{                   
      
            let choferesByCodigo = this.horarios.filter( h => h.chofer2 === codigo );
            FuncionesGrales.ordenamientoAscendente( choferesByCodigo, 'codigoEtapa' );
  
            //primera etapa
            let horarioInicio:Horario = choferesByCodigo[0];                 
            //ultima etapa
            let horarioFin:Horario = choferesByCodigo[ choferesByCodigo.length - 1 ];  
  
            let chofer: ChoferOcupacion = this._vs.getChoferByChoferPK( { cho_emp_codigo: this.empresa,  cho_codigo: codigo } );
            
            const unChofer:ChoferServicio = {
              choferPK: { cho_emp_codigo: this.empresa,  cho_codigo: codigo },    
              tipoChofer: chofer?chofer.tipoChofer:-1,
              etaDesde: horarioInicio.codigoEtapa,	
              etaHasta: horarioFin.codigoEtapa,
              fechaHoraSalida: horarioInicio.fechaHoraSalida,
              fechaHoraLlegada: horarioFin.fechaHoraLlegada,
              nombre:	chofer?chofer.nombre:'*****',
              nombreConTipo:chofer?chofer.nombreConTipo:'',
              ordenChofer: CONSTANTES_CHOFER.SEGUNDO_CHOFER,
              idAux:chofer?chofer.cho_id_aux:-1  
            };  
            this.choferes.push( unChofer);                                
      } ); 

  }

  generarAux1(){
    
    let auxiliar1 = Array.from(new Set( this.horarios.filter( h => h.auxiliar1 != null )
                                                     .map( h => h.auxiliar1) ));  
    auxiliar1.forEach( (codigo:any) =>{                   
    
          let choferesByCodigo = this.horarios.filter( h => h.auxiliar1 === codigo );
          FuncionesGrales.ordenamientoAscendente( choferesByCodigo, 'codigoEtapa' );

          //primera etapa
          let horarioInicio:Horario = choferesByCodigo[0];                 
          //ultima etapa
          let horarioFin:Horario = choferesByCodigo[ choferesByCodigo.length - 1 ];  

          let chofer: ChoferOcupacion = this._vs.getChoferByChoferPK( { cho_emp_codigo: this.empresa,  cho_codigo: codigo } );
          
          const unChofer:ChoferServicio = {
            choferPK: { cho_emp_codigo: this.empresa,  cho_codigo: codigo },    
            tipoChofer: chofer?chofer.tipoChofer:-1,
            etaDesde: horarioInicio.codigoEtapa,	
            etaHasta: horarioFin.codigoEtapa,
            fechaHoraSalida: horarioInicio.fechaHoraSalida,
            fechaHoraLlegada: horarioFin.fechaHoraLlegada,
            nombre:	chofer?chofer.nombre:'*****',
            nombreConTipo:chofer?chofer.nombreConTipo:'',
            ordenChofer: CONSTANTES_CHOFER.PRIMER_AUX,
            idAux:chofer?chofer.cho_id_aux:-1  
          };  
          this.choferes.push( unChofer);                                
    } ); 

 }

 generarAux2(){
    
  let auxiliar2 = Array.from(new Set( this.horarios.filter( h => h.auxiliar2 != null )
                                                   .map( h => h.auxiliar2 ) ));  
  auxiliar2.forEach( (codigo:any) =>{                   
  
        let choferesByCodigo = this.horarios.filter( h => h.auxiliar2 === codigo );
        FuncionesGrales.ordenamientoAscendente( choferesByCodigo, 'codigoEtapa' );

        //primera etapa
        let horarioInicio:Horario = choferesByCodigo[0];                 
        //ultima etapa
        let horarioFin:Horario = choferesByCodigo[ choferesByCodigo.length - 1 ];  

        let chofer: ChoferOcupacion = this._vs.getChoferByChoferPK( { cho_emp_codigo: this.empresa,  cho_codigo: codigo } );
        
        const unChofer:ChoferServicio = {
          choferPK: { cho_emp_codigo: this.empresa,  cho_codigo: codigo },    
          tipoChofer: chofer?chofer.tipoChofer:-1,
          etaDesde: horarioInicio.codigoEtapa,	
          etaHasta: horarioFin.codigoEtapa,
          fechaHoraSalida: horarioInicio.fechaHoraSalida,
          fechaHoraLlegada: horarioFin.fechaHoraLlegada,
          nombre:	chofer?chofer.nombre:'*****',
          nombreConTipo:chofer?chofer.nombreConTipo:'',
          ordenChofer: CONSTANTES_CHOFER.SEGUNDO_AUX,
          idAux:chofer?chofer.cho_id_aux:-1  
        };  
        this.choferes.push( unChofer);                                
  } ); 

}
}
