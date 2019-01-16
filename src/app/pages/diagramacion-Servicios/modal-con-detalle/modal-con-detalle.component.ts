import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ViewChild, ElementRef, Input } from "@angular/core";
import { ComboInyector } from '../ComboInjector';

@Component({
  selector: 'app-modal-con-detalle',
  templateUrl: './modal-con-detalle.component.html',
  styleUrls: ['./modal-con-detalle.component.css']
})
export class ModalConDetalleComponent implements OnInit, OnDestroy {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  @Input() data: any;


    

  constructor(  ) { 
      console.log('Crearrrrr  Modal ' ); 
      
  }
  

  ngOnInit() {
      //this.getChoferesCombo();    
      console.log('ngOnInit****************** Modal ' );
      
  }

  ngAfterContentInit(){
      console.log('ngAfterContentInit Modal');
  }

  ngAfterContentChecked(){
      console.log('ngAfterContentChecked Modal');
  }


  ngAfterViewInit(){
      console.log('ngAfterViewInit Modal');			
  }

  ngAfterViewChecked(){
      console.log('ngAfterViewChecked Modal');	
  }

  ngOnDestroy() {
      console.log('ngOnDestroyyyyyyyyyyyyyyyyyyyyy Modal');	
  }

  cerrarModal(){
      console.log('cerrarModal');
      this.closeBtn.nativeElement.click();
      this.ngOnDestroy();
  }  

  onCancel(): void{
    this.cerrarModal();   
  }

  onOk(): void{
      this.cerrarModal();
      //this.ok(this.snacks);
  }

}
