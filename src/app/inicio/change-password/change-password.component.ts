import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { UsuarioService, ErrorService } from 'src/app/services/service.index';
import { CustomValidators } from 'src/app/utiles/funciones.grales';

@Component({
  selector: 'pd-change-password',
  templateUrl:'./change-password.component.html',
  styles: []
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  
  token;
  changeForm:FormGroup;  

  constructor( private fb:FormBuilder, private ctrolError: ErrorService,
               private _us: UsuarioService, 
               private route:Router,
               private _activate: ActivatedRoute ) {
    this.crearForm();  
  }

  errMsgs: any = {password:[], confirmPassword: [] };
  translations: any = { password: { required: 'requerido.' }, 
                        confirmPassword: { required: 'requerido.', notEquals:'Contraseña y confirmación no coinciden.' }  };

  checkFormValidity(){
    this.ctrolError.checkFormValidity(this.changeForm, this.errMsgs,  this.translations);
  }

  crearForm(){
    this.changeForm = this.fb.group({
      password:['',[Validators.required]],
      confirmPassword:['', [Validators.required]]
    });

    this.changeForm.get('confirmPassword').setValidators(
      [ Validators.required,
        CustomValidators.notEquals( this.changeForm.get('password') ) ] 
    );

    this.changeForm.valueChanges
    .subscribe( data => this.checkFormValidity() );

  }

  ngOnInit() {
    this._us.limpiarUsuario();
    this._activate.params.subscribe(params => {      
      this.token = params['token'];      
    });
  }

  okToken(){
  }

  tratarErrores( err ){    
    this.ctrolError.tratarErroresBackEnd( err, this.changeForm, 
                       this.errMsgs );
  }

  cambiarClave(){
    this.ctrolError.validateAllFormFields( this.changeForm) ;
    this.checkFormValidity();
    if( this.changeForm.valid ){
       this._us.saveReseteoPassword$( this.preparedChange() )
               .subscribe( this.okChange.bind(this), this.tratarErrores.bind(this));
    }
  }

  okChange(){
    this.route.navigate(['/login']);
  }

  preparedChange(){
    const form = this.changeForm.getRawValue();
    const change ={      
      token:this.token,
      password: form.password,
      confirmPassword: form.confirmPassword
    }    
    return change;
  }

  ngOnDestroy(): void {
   
  }

}
