import { Component, OnInit } from '@angular/core';
import { ModalSiNoService } from 'src/app/services/service.index';


@Component({
  selector: 'app-modal-si-no',
  templateUrl: './modal-si-no.component.html',
  styles: []
})
export class ModalSiNoComponent implements OnInit {

  

  constructor( public _ms: ModalSiNoService ) { }

  ngOnInit() {
  }

  

}
