import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class RespuestaModalService {

    private subject = new Subject<any>();

    /*sendMessage(mostrar: boolean) {
        this.subject.next({ mostrarGrilla: mostrar });
    }*/

    sendMessage(mostrar: boolean) {
        this.subject.next(mostrar);
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
