import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { ComponenteItem } from 'src/app/shared/modal/componente-item';

@Injectable()
export class ModalService {

    private subjectComponent =  new Subject<ComponenteItem>();
    private subjectRespuesta = new Subject<any>();
  
    sendRespuesta( respuesta: any ) {
        this.subjectRespuesta.next( respuesta );
    }

    clearRespuesta() {
        this.subjectRespuesta.next();
    }

    getRespuesta(): Observable<any> {
        return this.subjectRespuesta.asObservable();
    }

    sendComponent( comp: ComponenteItem){
        this.subjectComponent.next( comp );
    }

    getComponent(){
        return this.subjectComponent.asObservable();
    }

    clearComponent(){
     this.subjectComponent.next();
    }
}
