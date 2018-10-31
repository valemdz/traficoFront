import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit} from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Usuario, NoAutorizado } from '../../domain';
import { Router } from '@angular/router';
import * as Rx from 'rxjs/Rx';
import { ErrorService } from '../../_services/error.service';
import { Observable } from 'rxjs';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

    loginForm: FormGroup;

    //usuario: any = {};

    //para el ojito del campo password
    @ViewChild('input') el: ElementRef;
    @ViewChild('toggler') toggler: ElementRef;
    @Input() placeholder: string;
    @Input() behaviour: string = 'press';

    loading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private fb: FormBuilder,
        private ctrolError: ErrorService ) {
           this.crearForm();

    }

    ngOnInit() {
        // reset login status
        //para traer cosas del servidor por ejemplo
    }

    crearForm(){
        this.authenticationService.logout();

        /*this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(2)]],
            password: ['',Validators.required]
        });*/

        this.loginForm = this.fb.group({
            username: ['cvp', [Validators.required, Validators.minLength(2)]],
            password: ['456', Validators.required]
        });

        this.loginForm.valueChanges
        .subscribe( data => this.ctrolError.checkFormValidity(this.loginForm, this.errMsgs,  this.translations ) );

    }

    ngOnChanges() {
        this.loginForm.reset({
            username:   '',
            password: '',
            //account.confirm: this.user.account.confirm
         });
    }

    erroresGrales:any=[];

      errMsgs: any = {
        username: [],
        password: []
      };

      translations: any = {
        username:{
          required: 'Por favor especifique un usuario.',
          minlength:'La longitud minima del campo es 2'
        },
        password: {
          required: 'Por favor especifique una contraseña.'
        },
        gral:{}
      };


    //este metodo es para el ojito del campo password
    ngAfterViewInit(): void {

        let __this = this;
        let textbox = __this.el.nativeElement;
        let toggler = __this.toggler.nativeElement;
        let togglerIcon = toggler.childNodes[0];

        if (__this.behaviour === 'press') {
            toggler.addEventListener('mousedown', (e) => {
                textbox.type = 'text';
                togglerIcon.classList.remove('fa-eye');
                togglerIcon.classList.add('fa-eye-slash');
            });
            toggler.addEventListener('mouseup', (e) => {
                textbox.type = 'password';
                togglerIcon.classList.remove('fa-eye-slash');
                togglerIcon.classList.add('fa-eye');
            });
        }

        if (__this.behaviour === 'click') {
            toggler.addEventListener('click', (e) => {
                textbox.type = textbox.type === 'password' ? 'text' : 'password';
                togglerIcon.classList.toggle('fa-eye');
                togglerIcon.classList.toggle('fa-eye-slash');
            });
        }

    }

    login(){
        this.ctrolError.validateAllFormFields( this.loginForm) ;
        this.ctrolError.checkFormValidity(this.loginForm, this.errMsgs,  this.translations);

        if (this.loginForm.valid ) {
          this.loginUsuario();
        }
    }

    loginUsuario() {

        const saveUser = this.prepareSaveUsuario();
        this.loading = true;
        this.authenticationService.login(saveUser.username, saveUser.password)
            .subscribe( this.okLogin.bind(this), this.errorLogin.bind(this) );

    }

    okLogin( login ) {
      console.log(login);

      if ( login &&  login.token ) {
          localStorage.setItem('currentUser', JSON.stringify(login) );
          this.router.navigate(['home']);
      } else {
          this.loading = false;
      }
    }

    errorLogin( err ) {
      this.ctrolError.tratarErrores(err, this.loginForm, this.erroresGrales, this.translations['gral']);
      this.ctrolError.checkFormValidity(this.loginForm, this.errMsgs,  this.translations );
    }



    prepareSaveUsuario(): Usuario {
        const formModel = this.loginForm.value;
        const saveUser: Usuario = {
            username: formModel.username as string,
            password : formModel.password as string

        };
        return saveUser;
    }

}
