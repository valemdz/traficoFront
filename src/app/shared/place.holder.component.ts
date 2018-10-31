import { Component, Input, AfterViewInit, ViewChild, OnChanges, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { AddComponenteDirective } from './add.componente.directive';
import { ComponenteItem }      from './componente-item';
import { ComponenteBaseComponent } from './componente.base.component';

@Component({
  selector: 'app-place-holder',
  template: `
              <div class="ad-banner">              
                <ng-template ad-host></ng-template>
              </div>
            `
})
export class PlaceHolderComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() ads: ComponenteItem[];  
  @ViewChild(AddComponenteDirective) adHost: AddComponenteDirective;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngAfterViewInit() {
    //console.log('ngAfterViewInit BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBanner' );	   
  }

  ngOnChanges() {           
    //console.log('ngOnChanges BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBanner' );	 
    this.loadComponent();
  }  

  ngOnDestroy() {
    
  }

  loadComponent() {   

    if( this.ads && this.ads.length >0 ){
      let adItem = this.ads[0];

      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
  
      let viewContainerRef = this.adHost.viewContainerRef;
  
      viewContainerRef.clear();         
  
      let componentRef = viewContainerRef.createComponent(componentFactory);
      (<ComponenteBaseComponent>componentRef.instance).data = adItem.data;       

    }       

  }
  

}
