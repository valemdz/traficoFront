import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Servicio, Horario, ChoferPK, ChoferOcupacion, CONSTANTES_CHOFER, ChoferServicio, VehiculoOcupacion } from 'src/app/models/model.index';
import { VueltasService } from 'src/app/services/service.index';
import { ChoferesConEstadoPipe } from 'src/app/pipes/choferes-con-estado.pipe';
import { DetOcupacionChoferComponent } from '../det-ocupacion-chofer/det-ocupacion-chofer.component';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { VehiculosConColoresPipe } from 'src/app/pipes/vehiculos-con-colores.pipe';


@Component({
  selector: 'app-chofere-etapas',
  templateUrl: './chofere-etapas.component.html',
  providers:[ ChoferesConEstadoPipe, VehiculosConColoresPipe ],
  styleUrls: ['./chofere-etapas.component.css']
})
export class ChofereEtapasComponent implements OnInit, OnDestroy {  

  servicio:Servicio = null;
  empresa:string;

  horarios:Horario[]; 
  choferes:ChoferServicio[]=[];

  // Las constantes no pueden leerse directamente entonces las asigno a variables locales  
  public  PRIMER_CHOFER = CONSTANTES_CHOFER.PRIMER_CHOFER;
  public  SEGUNDO_CHOFER = CONSTANTES_CHOFER.SEGUNDO_CHOFER;
  public  PRIMER_AUX = CONSTANTES_CHOFER.PRIMER_AUX;
  public  SEGUNDO_AUX = CONSTANTES_CHOFER.SEGUNDO_AUX;


  constructor( public dialogRef: MatDialogRef<ChofereEtapasComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public _vs: VueltasService,
               public dialog: MatDialog  ){ } 

  
  ngOnInit() {
    this.servicio = this.data.servicio; 
    /// Solo si presiona Aceptar se hace efectivo los choferes seleccionados 
    this.clonarHorarios();
    this.empresa = this.servicio.servicioPK?this.servicio.servicioPK.serEmpCodigo:'****';    

    this.setChoferesToHorarios();      

  }

  clonarHorarios(){
      this.horarios = JSON.parse( JSON.stringify( this.servicio.horarios) );
      this.horarios.forEach( h => {
          h.fechaHoraSalida = new Date( h.fechaHoraSalida );
          h.fechaHoraLlegada = new Date( h.fechaHoraLlegada )
      });
  }

  setChoferesToHorarios(){    

    const emp_codigo = this.servicio.servicioPK.serEmpCodigo || '***';

    this.horarios.forEach( h =>{
      
      h.nombreChofer1 = CONSTANTES_CHOFER.CHOFER_SIN_PERSONAL_STR;
      if( h.chofer1 && h.chofer1 > 0 ){        
        h.nombreChofer1 = this.getNombrePersonal( { cho_emp_codigo: emp_codigo, 
                                                    cho_codigo: h.chofer1 } );
      }
      h.nombreChofer2 = CONSTANTES_CHOFER.CHOFER_SIN_PERSONAL_STR;
      if( h.chofer2 && h.chofer2 > 0 ){             
        h.nombreChofer2 = this.getNombrePersonal( { cho_emp_codigo: emp_codigo, 
                                                    cho_codigo: h.chofer2 } );
      }
      h.nombreAux1 = CONSTANTES_CHOFER.CHOFER_SIN_PERSONAL_STR;
      if( h.auxiliar1 && h.auxiliar1 > 0 ){        
        h.nombreAux1 = this.getNombrePersonal( { cho_emp_codigo: emp_codigo, 
                                                 cho_codigo: h.auxiliar1 } );
      }
      h.nombreAux2 = CONSTANTES_CHOFER.CHOFER_SIN_PERSONAL_STR;
      if( h.auxiliar2 && h.auxiliar2 > 0 ){                                                 
        h.nombreAux2 = this.getNombrePersonal( { cho_emp_codigo: emp_codigo, 
                                                 cho_codigo: h.auxiliar2 } );
      }

    });
  }

  getNombrePersonal( choferPK: ChoferPK ){
    const chofer:ChoferOcupacion = this._vs.getChoferByChoferPK( choferPK );         
    return chofer?chofer.nombreConTipo: CONSTANTES_CHOFER.CHOFER_SIN_PERSONAL_STR;
  } 

  
  removeChofer1(  horario: Horario  ){
    horario.chofer1 = null;
    horario.nombreChofer1= CONSTANTES_CHOFER.CHOFER_SIN_PERSONAL_STR;
  }

  removeChofer2( horario: Horario ){
    horario.chofer2 = null;
    horario.nombreChofer2 = CONSTANTES_CHOFER.CHOFER_SIN_PERSONAL_STR;
  }

  removeAux1( horario: Horario ){
    horario.auxiliar1 = null;
    horario.nombreAux1 = CONSTANTES_CHOFER.CHOFER_SIN_PERSONAL_STR;
  }

  removeAux2( horario: Horario ){
    horario.auxiliar2 = null;
    horario.nombreAux2 = CONSTANTES_CHOFER.CHOFER_SIN_PERSONAL_STR;
  }

  setChofer1( chofer:ChoferOcupacion, horarios: Horario[] ){        
    horarios.forEach( h =>{
        h.chofer1 = chofer.choferPK.cho_codigo;
        h.nombreChofer1= chofer.nombreConTipo;    
    });    
  }

  setChofer2( chofer:ChoferOcupacion, horarios: Horario[] ){     
    horarios.forEach( h =>{
      h.chofer2 = chofer.choferPK.cho_codigo;
      h.nombreChofer2 = chofer.nombreConTipo;    
    });    
  }

  setAux1( chofer:ChoferOcupacion, horarios: Horario[] ){      
    horarios.forEach( h =>{
      h.auxiliar1 = chofer.choferPK.cho_codigo;
      h.nombreAux1 = chofer.nombreConTipo;
    });      
  }

  setAux2( chofer:ChoferOcupacion, horarios: Horario[] ){      
    horarios.forEach( h =>{
      h.auxiliar2 = chofer.choferPK.cho_codigo;
      h.nombreAux2 =chofer.nombreConTipo;
    });        
  }  

  getHorarios( codigoEtapa ){
    return this.horarios.filter( h => h.codigoEtapa >= codigoEtapa );
  }

  seleccionoChofer( chofer, tipoChofer, horario: Horario ){ 
     let horarios = this.getHorarios( horario.codigoEtapa );  
     if( tipoChofer == this.PRIMER_CHOFER ){
        this.setChofer1( chofer, horarios );
     }else if( tipoChofer == this.SEGUNDO_CHOFER){
        this.setChofer2( chofer, horarios );
     }else if( tipoChofer == this.PRIMER_AUX ){
        this.setAux1( chofer, horarios );
     }else if( tipoChofer == this.SEGUNDO_AUX){
        this.setAux2( chofer, horarios );
     }
  }

  seleccionoVehiculo( vehiculo: VehiculoOcupacion, horario: Horario ){
    let horarios = this.getHorarios( horario.codigoEtapa );
    horarios.forEach( h => h.interno = vehiculo.vehiculoPK.vehInterno );
  }

  removeChofer( tipoChofer, horario: Horario ){
    if( tipoChofer == this.PRIMER_CHOFER ){
        this.removeChofer1( horario );
    }else if( tipoChofer == this.SEGUNDO_CHOFER){
        this.removeChofer2( horario );
    }else if( tipoChofer == this.PRIMER_AUX ){
        this.removeAux1( horario );
    }else if( tipoChofer == this.SEGUNDO_AUX){
        this.removeAux2( horario );
    }
  } 

  removeVehiculo( horario: Horario ){
      horario.interno = null;
  }

  enviarHorarios(){
    this.dialogRef.close( this.horarios );
  }

  detOcupChofer( ordenChofer, codigoChofer ){      

    const horariosByChofer = this.getHorariosByOrdenChofer( ordenChofer, codigoChofer );
    FuncionesGrales.ordenamientoAscendente( horariosByChofer, 'codigoEtapa' );
    //primera etapa
    let horarioInicio:Horario = horariosByChofer[0];                 
    //ultima etapa
    let horarioFin:Horario = horariosByChofer[ horariosByChofer.length - 1 ];

    const chofer:ChoferOcupacion = this._vs.getChoferByChoferPK( { cho_emp_codigo: this.empresa,
                                                                   cho_codigo: codigoChofer } );

    const dialogRef = this.dialog.open( DetOcupacionChoferComponent, { 
      width: '600px',
      height: '400px',     
      data:{ chofer: chofer,
             fechaInicio: horarioInicio.fechaHoraSalida,
             fechaFin: horarioFin.fechaHoraSalida,
             servicioPK: this.servicio.servicioPK }      
    });

  }

  getHorariosByOrdenChofer( ordenChofer, codigoChofer ){    
    if( ordenChofer === this.PRIMER_CHOFER ){
      return this.horarios.filter( h => h.chofer1 === codigoChofer);
    }else if( ordenChofer === this.SEGUNDO_CHOFER ){  
      return this.horarios.filter( h => h.chofer2 === codigoChofer);
    }else if( ordenChofer === this.PRIMER_AUX ){
      return this.horarios.filter( h => h.auxiliar1 === codigoChofer);
    }else if( ordenChofer === this.SEGUNDO_AUX ){
      return this.horarios.filter( h => h.auxiliar2 === codigoChofer);
    }
  }

  ngOnDestroy(): void {
    
  }

}
