import {Injectable} from '@angular/core';
import {Usuario} from './../domain';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UsuarioService{

    // private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) {
    }

    login( usuario: Usuario ) {

        const body = { username: 'CVP', password: '456'};

        this.http
            .post('/auth/login', JSON.stringify(body))
            .subscribe(
            response => console.log(response),
            error => console.error('Error: ' ),
            () => console.log('Authentication Complete')
        );

    }


   private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
   }



}
