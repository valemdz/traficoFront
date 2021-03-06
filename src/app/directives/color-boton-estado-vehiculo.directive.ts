import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { VueltasService } from '../services/service.index';
import { ServicioPK, ConstantesGrales } from '../models/model.index';

@Directive({
  selector: '[appColorBotonEstadoVehiculo]'
})
export class ColorBotonEstadoVehiculoDirective {

  @Input("appColorBotonEstadoVehiculo") parametros:any[];
  classObj;
  vehiculoPK;
  inicio:Date;
  fin:Date;
  servicioPK: ServicioPK=null;


  constructor( public _vs: VueltasService,
               private el: ElementRef,
               private renderer: Renderer2  ) { }


  ngOnInit(): void {        
    this.setClaseBoton();    
  }
  
  @HostListener('change') ngOnChanges() {    
    this.setClaseBoton();
  }               


  setClaseBoton(){

      this.vehiculoPK = this.parametros[0];
      this.inicio =  this.parametros[1];
      this.fin =  this.parametros[2]; 

      if( this.parametros.length == 4 ){
          this.servicioPK = this.parametros[3];
      }        
      
      let vehi = this._vs.findVehiculosByVehiculoPK( this.vehiculoPK );

      this.classObj = ConstantesGrales.SIN_CHOFER_UNIDADES_BOTON;

      if( vehi ){

              this.classObj = ConstantesGrales.LIBRE_BOTON;

              const incConflicto = vehi.incidencias.filter( inc => this.inicio <= inc.fin
                                                            &&  this.fin >= inc.inicio );
              if ( incConflicto && incConflicto.length > 0 )  {
                  this.classObj = ConstantesGrales.CON_INCIDENCIAS_BOTON;
              }

              const viajesConflicto = vehi.viajes.filter( v => this.inicio <= v.fin
                                                                &&  this.fin >= v.inicio );
              if  ( viajesConflicto && viajesConflicto.length > 0) {
                this.classObj = ConstantesGrales.CON_VIAJES_BOTON;
              }              

              const servConflicto = vehi.servicios.filter( serv => ( this.inicio <= serv.fechaHoraLlegada
                        &&  this.fin >= serv.fechaHoraSalida
                        &&  JSON.stringify( this.servicioPK  ) !==  JSON.stringify( serv.servicioPK) ) );
              if ( servConflicto && servConflicto.length > 0 ) {
                this.classObj = ConstantesGrales.CON_SERVICIOS_BOTON;
              }

      }

      this.renderer.removeClass( this.el.nativeElement, ConstantesGrales.CON_SERVICIOS_BOTON );
      this.renderer.removeClass( this.el.nativeElement, ConstantesGrales.CON_INCIDENCIAS_BOTON );
      this.renderer.removeClass( this.el.nativeElement, ConstantesGrales.LIBRE_BOTON );
      this.renderer.removeClass( this.el.nativeElement, ConstantesGrales.SIN_CHOFER_UNIDADES_BOTON );
  
      this.renderer.addClass(this.el.nativeElement, this.classObj );

  }  

}
