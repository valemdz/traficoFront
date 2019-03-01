import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map, catchError  } from 'rxjs/operators';
import swal from 'sweetalert';
import { of } from 'rxjs/internal/observable/of';
import { Usuario, LoginResponse } from 'src/app/models/model.index';

@Injectable()
export class UsuarioService{

    usuario: Usuario;
    token: string;
    urlBackendLogin = environment.originLogin;

    // private headers = new Headers({'Content-Type': 'application/json'});

    constructor( private http: HttpClient,
        private router: Router  ) {    
        this.cargarStorage();
    }

      guardarStorage( loginResponse: LoginResponse ) {
        
        localStorage.setItem( 'token', loginResponse.token );
        localStorage.setItem( 'usuario', JSON.stringify( loginResponse.usuario ) );    

        this.usuario = loginResponse.usuario;
        this.token = loginResponse.token;    
    }

    logout() {

        localStorage.removeItem( 'token' );
        localStorage.removeItem( 'usuario' );

        this.usuario = null;
        this.token = '';   

        console.log('paso por logout');

        this.router.navigate(['/login']);
    }

    estaLogueado() {
        return ( this.token.length > 5 ) ? true : false;
    }

    cargarStorage() {
        if ( localStorage.getItem('token') ) {
            this.token = localStorage.getItem('token');    
            console.log( localStorage.getItem('usuario') );    
            this.usuario = JSON.parse( localStorage.getItem('usuario') );               
        } else {
            this.token = '';
            this.usuario = null;        
        }
    }

    login$( usuario: Usuario) {        

        return this.http.post( this.urlBackendLogin, usuario )
        .pipe(
        map ( ( resp: any ) => {

          this.guardarStorage( resp );          
            return true;
        })
        ,catchError( err => {
        swal('Error en el login', err.error.mensaje, 'error');
            return of(`Bad Promise: ${err}`)           
        })
        );
    }    
}
