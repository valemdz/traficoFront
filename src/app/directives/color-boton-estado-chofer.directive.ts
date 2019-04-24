import { Directive, OnInit, Input, ElementRef, Renderer2, OnChanges, HostListener } from '@angular/core';
import { VueltasService } from '../services/service.index';
import { ChoferOcupacion, CONSTANTES_CHOFER, ServicioPK, ConstantesGrales } from '../models/model.index';



@Directive({
  selector: '[appColorBotonEstadoChofer]'
})
export class ColorBotonEstadoChoferDirective implements OnInit {
  
 
  @Input("appColorBotonEstadoChofer") parametros:any[];
  classCho;
  choferPK;
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
    this.choferPK = this.parametros[0];
    this.inicio =  this.parametros[1];
    this.fin =  this.parametros[2]; 

    if( this.parametros.length == 4 ){
      this.servicioPK = this.parametros[3];
    }   
    
    this.classCho = ConstantesGrales.SIN_CHOFER_UNIDADES_BOTON;

    if( this.choferPK ){
      const cho:ChoferOcupacion = 
            this._vs.choferesOcupacion.find( v => JSON.stringify( v.choferPK ) === 
                                                    JSON.stringify( this.choferPK  ) );  
      if( cho ){     

            this.classCho = ConstantesGrales.LIBRE_BOTON;

            const incConflicto = cho.incidencias.filter( inc => this.inicio <= inc.fin
              &&  this.fin >= inc.inicio );
            if ( incConflicto && incConflicto.length > 0 )  {
              this.classCho = ConstantesGrales.CON_INCIDENCIAS_BOTON;
            }

            const viajesConflicto = cho.viajes.filter( v => this.inicio <= v.fin
              &&  this.fin >= v.inicio );
            if  ( viajesConflicto && viajesConflicto.length > 0) {
              this.classCho = ConstantesGrales.CON_VIAJES_BOTON;
            }              

            const servConflicto = cho.servicios.filter( serv =>
                  ( this.inicio <= serv.fechaHoraLlegada
                      &&  this.fin >= serv.fechaHoraSalida 
                      &&  JSON.stringify( this.servicioPK  ) !==  JSON.stringify( serv.servicioPK) ) );
            if ( servConflicto && servConflicto.length > 0 ) {                          
              this.classCho = ConstantesGrales.CON_SERVICIOS_BOTON;
            }
      }
      
    }    

    this.renderer.removeClass( this.el.nativeElement, ConstantesGrales.CON_SERVICIOS_BOTON );
    this.renderer.removeClass( this.el.nativeElement, ConstantesGrales.CON_INCIDENCIAS_BOTON );
    this.renderer.removeClass( this.el.nativeElement, ConstantesGrales.LIBRE_BOTON );
    this.renderer.removeClass( this.el.nativeElement, ConstantesGrales.SIN_CHOFER_UNIDADES_BOTON );

    this.renderer.addClass(this.el.nativeElement, this.classCho );

  }

}
