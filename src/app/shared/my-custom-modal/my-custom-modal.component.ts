
import {Component, ViewChild, ElementRef, Input } from "@angular/core";
import { Chofer } from "src/app/models/model.index";
import { Modal } from "src/app/ventanas-modales/modal.utilidades";
@Component({
    selector: "my-custom-modal",
    templateUrl: './my-custom-modal.component.html',
})
@Modal()
export class MyCustomModalComponent {

    @Input() foo:Chofer;
    @Input() nuevo;

    ok: Function;
    destroy: Function;
    closeModal: Function;
    snacks = ["newyorkers", "mars", "snickers"];

    @ViewChild('closeBtn') closeBtn: ElementRef;

    onCancel(): void{
        this.cerrarModal();
        this.closeModal();
        this.destroy();
    }

    onOk(): void{
        this.cerrarModal();
        this.closeModal();
        this.destroy();
        //this.ok(this.snacks);
    }


    /*******/

    ngOnInit() {
        //this.getChoferesCombo();    
        console.log('ngOnInit******************' + this.foo);
        console.log( this.foo );
        console.log( this.nuevo );
    }

    ngAfterContentInit(){
        console.log('ngAfterContentInit');
    }

    ngAfterContentChecked(){
        console.log('ngAfterContentChecked');
    }

    
    ngAfterViewInit(){
        console.log('ngAfterViewInit');			
    }

    ngAfterViewChecked(){
        console.log('ngAfterViewChecked');	
    }

    ngOnDestroy() {
        console.log('ngOnDestroy');	
     }

    cerrarModal(){
        this.closeBtn.nativeElement.click();
    }  

}