import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FuncionesGrales } from 'src/app/utiles/funciones.grales';
import { FECHA_HORA_MOSTRAR_PATTERN, FECHA_PATTERN,  } from 'src/app/utiles/const-data-model';
import { CANTIDAD_DIAS_DIAGR_DEFAULT } from '../../utiles/const-data-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MiUsuarioService } from 'src/app/_services/mi.usuario.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styles: []
})
export class PruebaComponent implements OnInit {

  fechas: any = [];
  private urlBase = environment.origin;
  choferesOcupacion: any;

  inicioB = new Date(2018, 10, 21, 8, 0, 0);
  finB: Date = new Date(2018, 10, 22, 9, 30, 0);

  inicio = new Date(2018, 10, 21, 0, 0, 0);
  fin: Date = new Date(2018, 10, 22, 0, 0, 0);


  constructor(   @Inject( LOCALE_ID ) public locale,
                 private yo: MiUsuarioService,
                 private http: HttpClient  ) { }

  ngOnInit() {


    /*this.fin.setDate( this.fin.getDate() + 1 );

    for ( let i = 0; i < CANTIDAD_DIAS_DIAGR_DEFAULT; i++ ) {
        const fecha = new Date( this.inicio.getTime() );
        fecha.setDate( fecha.getDate() + i );
        this.fechas.push( fecha );
    }

    console.log( this.fechas );*/


    this.getChoferesOcupacion( this.yo.getEmpresa(),
                               FuncionesGrales.fromFecha( this.locale, this.inicio, FECHA_PATTERN),
                               FuncionesGrales.fromFecha( this.locale, this.fin, FECHA_PATTERN) )
        .subscribe( this.okChoferes.bind( this ) );

  }



  getChoferesOcupacion( idEmpresa, inicio, fin ) {
    ///api/diagr/empresa/{idEmpresa}/fechaInicio/{inicio}/fechaFin/{fin}/choferesOcupacion
    const url = this.urlBase + `/diagr/empresa/${idEmpresa}/fechaInicio/${inicio}/fechaFin/${fin}/choferesOcupacion`;
    return  this.http.get( url );
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
   //console.log( this.choferesOcupacion );

  }


}
