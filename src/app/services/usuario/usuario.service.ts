import {Injectable} from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map, catchError  } from 'rxjs/operators';
import swal from 'sweetalert';
import { of } from 'rxjs/internal/observable/of';
import { Usuario, LoginResponse, ResetPassword } from 'src/app/models/model.index';
import { throwError } from 'rxjs';

@Injectable()
export class UsuarioService{

    usuario: Usuario;
    token: string;
    urlBackendLogin = environment.originLogin;
    originSinApi = environment.originSinApi;

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

        this.limpiarUsuario();
        console.log('paso por logout');
        this.router.navigate(['/login']);
    }

    limpiarUsuario(){
        localStorage.removeItem( 'token' );
        localStorage.removeItem( 'usuario' );

        this.usuario = null;
        this.token = '';  
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
    
    resetPassword$( reset: ResetPassword ){
        return this.http.post( this.originSinApi + '/resetPassword', reset )
        .pipe(
            map( () =>{
                swal("Reseteo de  Contraseña","El mail para reseteo de clave fue enviado a " + reset.emailRecuperacion , "success");                
           }),
           catchError( err => {               
             swal( 'Inconvenientes al enviar el mail!!!', 
                    err.error.errorCode + ' - ' + err.error.errorMessage ,
                    'error');
              return throwError(err);
           })

        )       
    }

    saveReseteoPassword$( passwodReset: {  token:string;
                                           password: string;
                                           confirmPassword: string } ){

        let headers = new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'});   
        
        const body = new HttpParams()
        .set('token', passwodReset.token)
        .set('password', passwodReset.password )
        .set('confirmPassword', passwodReset.confirmPassword );           

        return this.http.post( this.originSinApi + '/changePassReseteada', 
                               body,
                               {headers: headers} )
                        .pipe(
                        map( () =>{
                            swal("Reseteo de  Contraseña","La contraseña fue restablecida con exito!!!" , "success");                
                        }),
                        catchError( err => {                                           
                                return throwError(err);
                            })
            
                        ) ;        

    }

    actualizarPass$( passwordChange: {  password:string;
                                        confirmPassword:string;
                                        oldPassword: string } ){
        
        let headers = new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'});   

        const body = new HttpParams()
        .set('oldPassword', passwordChange.oldPassword)
        .set('password', passwordChange.password )
        .set('confirmPassword', passwordChange.confirmPassword );           

        return this.http.post( this.originSinApi + '/api/usuarios/updatePassword', 
                                body,
                                {headers: headers} )
                        .pipe(
                        map( () =>{
                            swal("Cambio de  Contraseña","La contraseña fue cambiada con exito!!!" , "success");                
                        }),
                        catchError( err => {                                           
                                return throwError(err);
                            })
            
                        ) ;                                            


    }

}
