import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';




@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    loggedIn() {
       // return tokenNotExpired();
       return true;
    }

    canActivate() {

        if ( this.loggedIn() && localStorage.getItem('currentUser') ) {
            // logged in so return true
            //this.router.navigate(['']);
            return true;
        }else{
            //not logged in so redirect to login page
            this.router.navigate(['login']);
            return false;
        }      
        
    }

  

}