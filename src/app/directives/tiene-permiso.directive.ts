import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { UsuarioService } from '../services/service.index';


@Directive({
  selector: '[appTienePermiso]'
})
export class TienePermisoDirective implements OnInit {

  admin='ROLE_ADMIN';

  @Input('appTienePermiso') permisos:string[];

  constructor( private _us: UsuarioService,
               private el: ElementRef,
               private renderer: Renderer2  ) {
  }

  ngOnInit(): void {

    this.permisos.push( this.admin );
    let tienePermiso = false;  

    this.permisos.forEach( p => {
      const encontro =  this._us.usuario.authorities.find( a => a.authority === p  )?true:false;             
      tienePermiso = tienePermiso || encontro ;
    });      

    if ( tienePermiso ){
      this.renderer.removeStyle (this.el.nativeElement, 'display');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }

  }

}
