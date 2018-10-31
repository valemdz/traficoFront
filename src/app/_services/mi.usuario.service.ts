import { Injectable } from '@angular/core';
import { UserLogueado } from '../domain';


@Injectable()
export class MiUsuarioService{

    private _user: UserLogueado;

    get user(): UserLogueado{

        this._user = JSON.parse(localStorage.getItem('currentUser')); 
        return this._user;

    }

    getEmpresa(){

        const usr = this.user;       

        if( usr != null ){
            return usr.empresa;
        }else{
           console.log('usuario nulo') 
           return 'NDef' ;
        }
    }


}

