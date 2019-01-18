import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import {Tabs} from './tabs/tabs';
import {Tab} from './tabs/tab';
import {TabChild} from './tabs/tab-child';
import { LoaderComponent } from './loader/loader.component';
import {MensajesComponent} from './mensajes-component';
import { AlertComponent } from './alert/alert.component';
import { SearchByFechaComponent } from './search-by-fecha/search-by-fecha.component';
import { PruebaComponent } from './prueba/prueba.component';
import { ChoferesConEstadoPipe } from '../pipes/choferes-con-estado.pipe';
import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from '../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ModalSiNoComponent } from './modal-si-no/modal-si-no.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { TableElementsCountComponent, 
         TablePaginationComponent, 
         TableSortComponent } from './pagination/pagination.index';
import { ModalPlaceHolderComponent } from './modal/modal.place.holder.component';
import { AddComponenteDirective } from './modal/add.componente.directive';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,       
    ReactiveFormsModule,
    CommonModule,    
    PipesModule,    
    MaterialModule,    
    RouterModule
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
                  ModalPlaceHolderComponent,
                  AddComponenteDirective,
                  SearchByFechaComponent,
                  PruebaComponent,
                  ModalSiNoComponent,
                  ModalSiNoComponent,
                  HeaderComponent,
                  NoPageFoundComponent,
                  AlertComponent  ],
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
    ModalPlaceHolderComponent,
    AddComponenteDirective,
    SearchByFechaComponent,
    PruebaComponent,
    ChoferesConEstadoPipe,
    ModalSiNoComponent,
    HeaderComponent,
    NoPageFoundComponent,
    AlertComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
