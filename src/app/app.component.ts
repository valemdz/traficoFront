import { Component, Input } from '@angular/core';
import { UserLogueado} from './domain';
import { MiUsuarioService} from './_services/mi.usuario.service';



@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _user: UserLogueado;

  constructor ( private yo:MiUsuarioService){
    //this.usuario =yo.user;
  }

  get user(): UserLogueado{

    this._user = this.yo.user;
    return this._user;
  }
}
