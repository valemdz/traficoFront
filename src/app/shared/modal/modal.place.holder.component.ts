import { Component, Input, AfterViewInit, ViewChild, OnChanges, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';

import { AddComponenteDirective } from './add.componente.directive';
import { ComponenteItem }      from './componente-item';
import { ComponenteBaseComponent } from './componente.base.component';
import { ModalService } from 'src/app/services/service.index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-place-holder',
  template: `
              <div class="ad-banner">              
                <ng-template ad-host></ng-template>
              </div>
            `
})
export class ModalPlaceHolderComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  
  componentItem: ComponenteItem;  
  @ViewChild(AddComponenteDirective) adHost: AddComponenteDirective;
  subsComp: Subscription;
  
  constructor( private componentFactoryResolver: ComponentFactoryResolver,
               private _ms: ModalService ) {

  }

  ngOnInit(): void {
     this._ms.getComponent()
         .subscribe( ( comp: any) => {
              this.componentItem = comp;
              this.loadComponent();
         }); 
  }

  ngAfterViewInit() {
    //console.log('ngAfterViewInit placeHolder' );	   
  }

  ngOnChanges() {           
   //console.log('ngOnChanges placeHolder' );	     
  }  

  ngOnDestroy() {
    if( this.subsComp ){ this.subsComp.unsubscribe(); }
  }

  loadComponent() {   

    let viewContainerRef = this.adHost.viewContainerRef;  
    viewContainerRef.clear();         

    if( this.componentItem  ){      

      let componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(this.componentItem.component);      
  
      let componentRef = viewContainerRef.createComponent(componentFactory);
      (<ComponenteBaseComponent>componentRef.instance).data = this.componentItem.data;       

    }       

  }
  

}
