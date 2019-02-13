import { Component, OnInit, Inject, LOCALE_ID, ViewChild, ElementRef, AfterViewInit, ViewChildren, OnDestroy } from '@angular/core';
import { DiagrService, VueltasService, UsuarioService } from 'src/app/services/service.index';
import { ChoferesConEstadoPipe } from 'src/app/pipes/choferes-con-estado.pipe';
import { ModalSiNoService } from '../modal-si-no/modal-si-no.service';
import { ModalSiNo } from 'src/app/models/modalSiNo.model';
import { Subscription, forkJoin } from 'rxjs';
import { getSingleValueObservable, getDelayedValueObservable, getMultiValueObservable } from './prueba';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
  providers: [ ChoferesConEstadoPipe ]
})
export class PruebaComponent implements OnInit,  OnDestroy  {

  show=false;
  
  value$ = forkJoin(
    getSingleValueObservable(),
    getDelayedValueObservable()
  ).pipe(
    map( ( [ first , second ]) => {
            return { first, second};   
        }
    )
  );

  

  ngOnInit(): void {    
  }

  // Multi value observables must manually
  // unsubscribe to prevent memory leaks.
  ngOnDestroy() {
    
  }

}
