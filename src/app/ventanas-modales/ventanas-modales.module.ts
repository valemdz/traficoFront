import { NgModule } from '@angular/core';
import { ModalService } from './modal.service';
import { ModalPlaceholderComponent } from './modal.utilidades';
import { MyCustomModalComponent } from '../my-custom-modal/my-custom-modal.component';
import { SharedModule } from './../shared/shared.module';
import { DiagrChoferesComponent } from '../pages/viajes/diagr-choferes/diagr-choferes.component';
import { DiagrAuxiliaresComponent } from '../pages/viajes/diagr-auxiliares/diagr-auxiliares.component';


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
