import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';

import {Tabs} from './tabs/tabs';
import {Tab} from './tabs/tab';
import {TabChild} from './tabs/tab-child';

import {TableElementsCountComponent} from './table-elements-count/table-elements-count.component';
import {TablePaginationComponent} from './table-pagination/table-pagination.component';
import {TableSortComponent} from './table-sort/table-sort.component';

import { LoaderComponent } from './loader/loader.component';


import {MensajesComponent} from './mensajes-component';
import { AlertComponent } from './alert/alert.component';

import{ UpperCaseText } from './UpperCaseText';
//import{ UpperCaseAtrib   } from './UpperCaseAtrib';

import { PlaceHolderComponent } from './place.holder.component';
import { AddComponenteDirective } from './add.componente.directive';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,   
  ],
  declarations: [ MensajesComponent, 
                  AlertComponent,
                  Tabs, 
                  Tab,
                  TabChild,
                  TableElementsCountComponent,
                  TablePaginationComponent,
                  TableSortComponent,
                  LoaderComponent,
                  UpperCaseText,
                  PlaceHolderComponent,
                  AddComponenteDirective ],
  exports:[ 
    CommonModule,
    ReactiveFormsModule,
    MensajesComponent,
    AlertComponent,
    Tabs, 
    Tab,
    TabChild,
    LoaderComponent,
    TableSortComponent,
    TableElementsCountComponent,
    TablePaginationComponent,
    UpperCaseText,
    PlaceHolderComponent,
    AddComponenteDirective    
  ]
})
export class SharedModule { }
