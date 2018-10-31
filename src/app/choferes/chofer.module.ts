import { NgModule, CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import {RouterModule} from '@angular/router';

import {ChoferListComponent } from './chofer-list/chofer-list.component';
import {ChoferService} from './chofer.service';
import {ChoferNuevoComponent } from './chofer-nuevo/chofer-nuevo.component';
import { CarnetListComponent } from './carnet-list/carnet-list.component';
import { IncByChoferComponent } from './inc-by-chofer/inc-by-chofer.component';
import { ChoferRoutingModule } from './chofer-routing.module';


import {TabChild} from '../shared/tabs/tab-child';



@NgModule({
  imports: [
    SharedModule,
    ChoferRoutingModule
  ],
  declarations: [  ChoferListComponent,
    ChoferNuevoComponent ,
    CarnetListComponent, IncByChoferComponent   ],
    providers:[ ChoferService,
        {provide: TabChild, useExisting: forwardRef(() => ChoferNuevoComponent) }, ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class ChoferModule { }
