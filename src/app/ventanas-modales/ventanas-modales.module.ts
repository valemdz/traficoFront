import { NgModule } from '@angular/core';
import { ModalService } from './modal.service';
import { ModalPlaceholderComponent } from './modal.utilidades';
import { SharedModule } from './../shared/shared.module';
import { MyCustomModalComponent } from '../shared/my-custom-modal/my-custom-modal.component';

@NgModule({
  declarations: [ ModalPlaceholderComponent,
                  MyCustomModalComponent,                  
                ],
  imports: [SharedModule],
  exports: [ ModalPlaceholderComponent,
             MyCustomModalComponent,             
            ],
  providers: [ModalService]
})
export class VentanasModalesModule { }
