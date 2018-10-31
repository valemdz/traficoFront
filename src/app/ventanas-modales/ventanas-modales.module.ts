import { NgModule } from '@angular/core';
import { ModalService } from './modal.service';
import { ModalPlaceholderComponent } from './modal.utilidades';
import { MyCustomModalComponent } from "../my-custom-modal/my-custom-modal.component";
import { DiagrChoferesComponent } from '../viajes/diagr-choferes/diagr-choferes.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({ 
  declarations: [ ModalPlaceholderComponent,
                  MyCustomModalComponent,
                  DiagrChoferesComponent
                ],
  imports:[SharedModule],
  exports: [ ModalPlaceholderComponent,
             MyCustomModalComponent, 
             DiagrChoferesComponent], 
  providers: [ModalService] 
})
export class VentanasModalesModule { }
