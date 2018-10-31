import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../_services/authentication.service';
import {Me, UserLogueado} from '../../domain';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logueado:UserLogueado;
  me:Me;

  constructor(  private authenticationService: AuthenticationService ) { }

  ngOnInit() {

    this.logueado =  JSON.parse( localStorage.getItem('currentUser') ) ;

  }

  probarAut(){

       this.authenticationService.probarAut()
            .subscribe(me => {
                this.me = me;
            });

       this.logueado =  JSON.parse( localStorage.getItem('currentUser') ) ;

       console.log(this.logueado);

  }

}
