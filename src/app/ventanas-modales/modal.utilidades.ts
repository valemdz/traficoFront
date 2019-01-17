import {Component, ViewChild, OnInit, ViewContainerRef,  Injector, } from "@angular/core";
import {Observable, Subject, BehaviorSubject, ReplaySubject} from "rxjs";
import { ModalService } from './modal.service';



// this is the modal-placeholder, it will container the created modals
@Component({
    selector: "modal-placeholder",
    template: `<div #modalplaceholder></div>`
})
export class ModalPlaceholderComponent implements OnInit {
    @ViewChild("modalplaceholder", {read: ViewContainerRef}) viewContainerRef;

    constructor(private modalService: ModalService, private injector: Injector) {

    }
    ngOnInit(): void {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    }
}

// These 2 items will make sure that you can annotate
// a modalcomponent with @Modal()
export class ModalContainer {
    destroy: Function;
    componentIndex: number=9999999999999999999999999999;
    closeModal(): void {
        this.destroy();
    }
}
export function Modal() {
    return function (target) {
        Object.assign(target.prototype,  ModalContainer.prototype);
    };
}

