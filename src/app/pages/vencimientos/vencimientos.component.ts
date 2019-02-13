import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { VencimientosVehiculo, CONSTANTES_VEHICULOS, CONSTANTES_CHOFER, VencimientosChoferes } from 'src/app/models/model.index';
import { UsuarioService, VencimientoService, LoaderService } from 'src/app/services/service.index';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-vencimientos',
  templateUrl: './vencimientos.component.html',
  styles: []
})
export class VencimientosComponent implements OnInit, OnDestroy {
 
  vencimientosSubs: Subscription;

  vencimientosVeh: VencimientosVehiculo[]=[];
  vencimientosCho: VencimientosChoferes[]=[];
  noExisteConfiguracionVencimientos=false;

  constructor( public _us: UsuarioService, public _vs: VencimientoService,
               private loaderService: LoaderService ) { }

  ngOnInit() {

    this.loaderService.displayConjunto(true);

     this.vencimientosSubs = forkJoin(
                      this._vs.getVehiculosConVencimientos$( this._us.usuario.empresa,
                                                             CONSTANTES_VEHICULOS.HABILITADO )
                    , this._vs.getChoferesConVencimientos$( this._us.usuario.empresa,
                                                            CONSTANTES_CHOFER.HABILITADO ) 
                    )
                    .pipe(
                        map( ([ vencVehiculos, vencChoferes]) =>
                              { return { vencVehiculos, vencChoferes }; }
                        ),
                        finalize(() => this.loaderService.displayConjunto(false))
                    )
                    .subscribe( this.okVencimientos.bind(this) ); 
                                                 

  }

  okVencimientos( resp ){
      this.vencimientosVeh = resp.vencVehiculos;          
      this.vencimientosCho = resp.vencChoferes;

      this.noExisteConfiguracionVencimientos=  this.vencimientosVeh.length === 0
                                               &&  this.vencimientosCho.length === 0;
  } 

  ngOnDestroy(): void {
    if ( this.vencimientosSubs ) { this.vencimientosSubs.unsubscribe(); } 
  }


}
