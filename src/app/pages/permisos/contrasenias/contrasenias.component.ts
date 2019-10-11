import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/model.index';



@Component({
  selector: 'app-contrasenias',
  templateUrl: './contrasenias.component.html',
  styles: ['./contrasenias.component.css']
})
export class ContraseniasComponent implements OnInit {  

  usuario:Usuario;
  contraseniaGrupo: FormGroup;

  constructor(  public dialogRef: MatDialogRef<ContraseniasComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FormBuilder ) { 
        this.createForm();          
  }

  createForm(){
      this.contraseniaGrupo = this.fb.group(
        {
          email:[ null, [ Validators.required, Validators.email ]]          
        }
      );
  }                

  ngOnInit() {   
    this.usuario = this.data.usuario;    
    //const email = this.usuario.personal.email || 'exemplo@gmail.com';  
    this.contraseniaGrupo.reset({
      email: this.usuario.personal.email
    });

  }

  clearEmail(){
    this.contraseniaGrupo.get('email').setValue(null);
  }

  onClick( ){     

    if( this.contraseniaGrupo.valid ){
      const form = this.contraseniaGrupo.getRawValue(); 
      this.dialogRef.close( form.email );
    }     
  }

}
