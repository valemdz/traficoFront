import { Component, OnInit, OnDestroy, Inject, LOCALE_ID } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio.model';
import { VueltasService } from 'src/app/services/service.index';



@Component({
  selector: 'app-vueltas',
  templateUrl: './vueltas.component.html',
  styleUrls: []
})
export class VueltasComponent implements OnInit, OnDestroy {


  constructor( public _vs: VueltasService,
               private activated: ActivatedRoute,
               private router: Router ,
               @Inject(LOCALE_ID) public locale: string ) {
  }

  ngOnInit(): void {
    this.activated.params
      .subscribe( lineas => this._vs.setLineas( lineas ));
    this._vs.loaded = false;  
  }

  ngOnDestroy(): void {
  }

  buscar( formFechas ) {
    //Traigo las fechas del buscador
    this._vs.OnInit( formFechas );
    // this.filter( new Date() );
  }

  volver() {
    this.router.navigate(['/diagr/idaVtaList']);
  }

  tieneVuelta( serv: Servicio ){
    if (  this._vs.getVuelta( serv.servicioPK ) ) {
        return true;
    }    
    return false;
  }



}

