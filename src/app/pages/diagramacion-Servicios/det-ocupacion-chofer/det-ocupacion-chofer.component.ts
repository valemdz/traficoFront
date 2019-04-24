import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChoferOcupacion } from 'src/app/models/model.index';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';

export class ServicioShow{
  constructor(  public conConflicto:boolean=false,
                public servicio:any ){}
}

export class IncidenciaShow{
  constructor(  public conConflicto:boolean=false,
                public incidencia:any ){}
}

export class ViajeShow{
  constructor(  public conConflicto:boolean=false,
                public viaje:any ){}
}


@Component({
  selector: 'app-det-ocupacion-chofer',
  templateUrl: './det-ocupacion-chofer.component.html',
  styleUrls: []
})
export class DetOcupacionChoferComponent implements OnInit {

  fechaInicio:Date;
  fechaFin:Date;
  chofer:ChoferOcupacion;
  servicioShow:ServicioShow[]=[];
  incidenciasShow:IncidenciaShow[]=[];
  viajesShow:ViajeShow[]=[];
  servicioPK;

  constructor( public dialogRef: MatDialogRef<DetOcupacionChoferComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
    this.chofer = this.data.chofer;
    this.fechaInicio = this.data.fechaInicio;
    this.fechaFin = this.data.fechaFin;
    this.servicioPK = this.data.servicioPK;
     
    FuncionesGrales.ordenamientoAscendente( this.chofer.servicios, 'fechaHoraSalida' );
    FuncionesGrales.ordenamientoAscendente( this.chofer.incidencias, 'inicio' );
    FuncionesGrales.ordenamientoAscendente( this.chofer.viajes, 'inicio' );  

    this.chofer.servicios.forEach( serv =>{
      const conflicto = ( this.fechaInicio <= serv.fechaHoraLlegada
                          &&  this.fechaFin >= serv.fechaHoraSalida
                          && JSON.stringify( this.servicioPK ) === JSON.stringify( serv.servicioPK ) ) ;
      this.servicioShow.push( new ServicioShow( conflicto, serv ));  
    });

    this.chofer.incidencias.forEach( inc =>{
      const conflicto = ( this.fechaInicio <= inc.inicio
                          &&  this.fechaFin >= inc.fin );        
      this.incidenciasShow.push( new IncidenciaShow( conflicto, inc ) ); 
    });   

    this.chofer.viajes.forEach( viaje =>{
      const conflicto = ( this.fechaInicio <= viaje.inicio
                          &&  this.fechaFin >= viaje.fin ); 
      this.viajesShow.push( new ViajeShow( conflicto, viaje ));
    });    

  }

}
