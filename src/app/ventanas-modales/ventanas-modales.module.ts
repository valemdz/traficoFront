import { NgModule } from '@angular/core';
import { ModalService } from './modal.service';
import { ModalPlaceholderComponent } from './modal.utilidades';
import { MyCustomModalComponent } from '../my-custom-modal/my-custom-modal.component';
import { DiagrChoferesComponent } from '../viajes/diagr-choferes/diagr-choferes.component';
import { SharedModule } from './../shared/shared.module';
import { DiagrAuxiliaresComponent } from '../viajes/diagr-auxiliares/diagr-auxiliares.component';


@NgModule({
  declarations: [ ModalPlaceholderComponent,
                  MyCustomModalComponent,
                  DiagrChoferesComponent,
                  DiagrAuxiliaresComponent
                ],
  imports: [SharedModule],
  exports: [ ModalPlaceholderComponent,
             MyCustomModalComponent,
             DiagrChoferesComponent,
             DiagrAuxiliaresComponent
            ],
  providers: [ModalService]
})
export class VentanasModalesModule { }
