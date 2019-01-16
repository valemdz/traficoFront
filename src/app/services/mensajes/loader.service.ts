import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
    private activado:boolean = true; 
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    displayConjunto(value: boolean) {       
        this.activado = !value;
        this.status.next(value);
    }

    display( value: boolean) {       
        if( this.activado ){
            this.status.next(value);
        }        
    }

    setActivado( mostrar ){
        this.activado = mostrar;
    }

    apagarDisplay( ) { 
        this.activado = true;
       if( this.status.getValue ){
          this.status.next(false);        
       }        
    }
}
