import { Directive, Input, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { ConstantesGrales, VencimientoCalculado } from '../models/model.index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Directive({
  selector: '[appColorVencimiento]'
})
export class ColorVencimientoDirective {  

  @Input("appColorVencimiento") parametros:any[]; 

  vencimientos:VencimientoCalculado[];
  tipoVencimiento; 
  vencimientoSelected:VencimientoCalculado; 
  //claseCssVencimiento;

  constructor(  private el: ElementRef,
    private renderer: Renderer2 ) {

  }  

  @HostListener('change') ngOnChanges() {        
    this.vencimientos = this.parametros[0];
    this.tipoVencimiento = this.parametros[1];
    this.calcularVencimientos();
  }    

  calcularVencimientos(){
    this.vencimientoSelected = this.vencimientos.find( v => v.nombreCampo === this.tipoVencimiento);
    
    if( this.vencimientoSelected ){
      if( !( this.vencimientoSelected.fechaVencimiento  instanceof Date )){      
        this.vencimientoSelected.fechaVencimiento = 
                new Date( this.vencimientoSelected.fechaVencimiento ) || new Date();
      }
      
      this.vencimientoSelected.vencido = this.vencimientoSelected.fechaVencimiento.getTime()
                                               <= new Date().getTime(); 
    }    

    this.calcularClaseCss();
    
  }

  calcularClaseCss(){   

    if( !this.vencimientoSelected ){
      this.setClaseCSS( ConstantesGrales.COLORES_VENCIMIENTOS['OK'] );
    } else{
        if( this.vencimientoSelected.vencido  ){
            this.setClaseCSS( ConstantesGrales.COLORES_VENCIMIENTOS['DANGER'] );
        }else if ( this.vencimientoSelected.diasAntesVencer  > 0
          &&  this.vencimientoSelected.diasAntesVencer <= this.vencimientoSelected.cantidadAnticipacion){
            this.setClaseCSS( ConstantesGrales.COLORES_VENCIMIENTOS['WARNING'] );            
        }else{
            this.setClaseCSS( ConstantesGrales.COLORES_VENCIMIENTOS['OK'] );
        }
    }

  }     

  setClaseCSS( claseCssSeleccionada){
    this.removeClasesCSS();
    this.renderer.addClass(this.el.nativeElement, claseCssSeleccionada );
  }

  removeClasesCSS(){
    for( let k in ConstantesGrales.COLORES_VENCIMIENTOS){        
      this.renderer.removeClass( this.el.nativeElement, ConstantesGrales.COLORES_VENCIMIENTOS[k] );
    }
  }

}
