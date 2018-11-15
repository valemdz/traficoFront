import { Component, OnInit, OnDestroy, Inject, LOCALE_ID } from '@angular/core';
import { VueltasService } from './vueltas.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-vueltas',
  templateUrl: './vueltas.component.html',
  styleUrls: [],
  providers: [ VueltasService ]
})
export class VueltasComponent implements OnInit, OnDestroy {


  constructor( public _vs: VueltasService,
               private activated: ActivatedRoute,
               @Inject(LOCALE_ID) public locale: string ) {
  }

  ngOnInit(): void {
    this.activated.params
      .subscribe( lineas => this._vs.setLineas( lineas ));

  }

  ngOnDestroy(): void {

  }

  buscar( formFechas ) {
    this._vs.setFechas( formFechas );
    //this.filter( new Date() );
  }



}
