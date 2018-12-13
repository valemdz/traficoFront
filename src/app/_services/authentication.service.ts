import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthenticationService {


    constructor( private http: HttpClient ) {
        // set token if saved in local storage
        //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    login(username: string, password: string) {

        const params = new HttpParams()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*' );

        const options = {params};

        return this.login$( username, password , options );
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        console.log('localStorage.removeItem(currentUser');
        localStorage.removeItem('currentUser');
    }

    login$( username: string, password: string, params ): Observable<any> {
       return this.http.post( environment.originLogin,
        JSON.stringify({ username: username, password: password }));
    }


    probarAut(): Observable<any> {
        return this.http.get('/me', null);
    }



}
