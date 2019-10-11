import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorService, UsuarioService } from 'src/app/services/service.index';
import { Router } from '@angular/router';


@Component({
  selector: 'pd-actualizar-passwd',
  templateUrl:'./actualizar-passwd.component.html' ,
  styles: []
})
export class ActualizarPasswdComponent implements OnInit {
 
  changeForm:FormGroup;

  constructor( private fb:FormBuilder, private ctrolError: ErrorService,
               private usuarioService: UsuarioService, private route:Router  ) {
    this.crearForm();  
  }

  errMsgs: any = {password:[], confirmPassword: [], oldPassword:[] };
  translations: any = { password: { required: 'requerido.' }, 
                        confirmPassword: { required: 'requerido.' },
                        oldPassword: { required: 'requerido.' }  };

  checkFormValidity(){
    this.ctrolError.checkFormValidity(this.changeForm, this.errMsgs,  this.translations);
  }

  crearForm(){
    this.changeForm = this.fb.group({
      password:[null,[Validators.required]],
      confirmPassword:[null, [Validators.required]],
      oldPassword:[null,[Validators.required]]
    });
    this.changeForm.valueChanges
    .subscribe( data => this.checkFormValidity() );

  }

  ngOnInit() {

  }
  

  tratarErrores( err ){    
    this.ctrolError.tratarErroresBackEnd( err, this.changeForm, 
                       this.errMsgs );
  }

  cambiarClave(){
    this.ctrolError.validateAllFormFields( this.changeForm) ;
    this.checkFormValidity();
    if( this.changeForm.valid ){
        this.usuarioService.actualizarPass$( this.preparedChange()).
        subscribe( this.okChange.bind(this), this.tratarErrores.bind(this));
    }
  }

  okChange(){
    this.route.navigate(['/welcome']);
  }

  preparedChange(){
    const form = this.changeForm.getRawValue();
    const change ={
      oldPassword: form.oldPassword,     
      password: form.password,
      confirmPassword: form.confirmPassword
    }    
    return change;
  }


}
