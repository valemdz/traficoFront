import {Component,Directive, ElementRef} from '@angular/core';


@Directive({
    selector: 'input[type=text],[uppercase]',
    host: {
        '(input)': 'ref.nativeElement.value=$event.target.value.toUpperCase()',
    }

})
export class UpperCaseText {
    constructor(private ref: ElementRef) {
    }
}