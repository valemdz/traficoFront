import { Component, Input, OnInit, OnDestroy }  from '@angular/core';

import { ComponenteBaseComponent }      from '../shared/componente.base.component';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  template: `
    <div class="hero-profile">
      <h3>Featured Hero Profile</h3>
      <h4>{{data.name}}</h4>
      
      <p>{{data.bio}}</p>

      <strong>Hire this hero today!</strong>
    </div>
  `
})
export class HeroProfileComponent implements ComponenteBaseComponent, OnInit, OnDestroy, OnChanges {
  @Input() data: any;
  @Input()ref:any;
  constructor(  ) { 
        console.log('Crearrrrr  Hero ' ); 
    
    }

    ngOnChanges() {           

    console.log('ngOnChanges' );	 
    }  


    ngOnInit() {
        //this.getChoferesCombo();    
        console.log('ngOnInit****************** Hero ' );
        
    }

    ngAfterContentInit(){
        console.log('ngAfterContentInit Hero');
    }

    ngAfterContentChecked(){
        console.log('ngAfterContentChecked Hero');
    }


    ngAfterViewInit(){
        console.log('ngAfterViewInit Hero');			
    }

    ngAfterViewChecked(){
        console.log('ngAfterViewChecked Hero');	
    }

    ngOnDestroy() {
        console.log('ngOnDestroyyyyyyyyyyyyyyyyyyyyy Hero');	
    }

}




