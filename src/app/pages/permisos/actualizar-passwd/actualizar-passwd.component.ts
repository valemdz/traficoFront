import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorService, UsuarioService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CustomValidators } from 'src/app/utiles/funciones.grales';


@Component({
  template: ''
})
export class DialogActualizarContraseniaComponent implements OnChanges{
  

  constructor(public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute) {  
      this.openDialog();  
  }

  ngOnChanges(): void {
    this.openDialog();
  }

  openDialog(): void {

    const dialogRef = this.dialog.open( ActualizarPasswdComponent, {
      width: '250px'
    } );

    dialogRef.afterClosed().subscribe( result => {         
         this.router.navigate(['/welcome']);
    });
  }
}


@Component({
  selector: 'pd-actualizar-passwd',
  templateUrl:'./actualizar-passwd.component.html' ,
  styles: []
})
export class ActualizarPasswdComponent {
 
  changeForm:FormGroup;

  constructor( public dialogRef: MatDialogRef<ActualizarPasswdComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private fb:FormBuilder, private ctrolError: ErrorService,
               private usuarioService: UsuarioService, private route:Router  ) {
    this.crearForm();  
  }  

  crearForm(){
    this.changeForm = this.fb.group({
      password:[null,[Validators.required]],
      confirmPassword:[null, [Validators.required]],
      oldPassword:[null,[Validators.required]]
    }); 
    
    this.changeForm.get('confirmPassword').setValidators(
      [ Validators.required,
        CustomValidators.equals( this.changeForm.get('password') ) ] 
    );
    
  }  

  tratarErrores( err ){    
    this.ctrolError.tratarErroresBackEnd( err, this.changeForm, 
                       null );
  }

  cambiarClave(){    
    console.log( this.changeForm );
    if( this.changeForm.valid ){
        this.usuarioService.actualizarPass$( this.preparedChange()).
        subscribe( this.okChange.bind(this), this.tratarErrores.bind(this));
    }
  }

   okChange(){
     this.dialogRef.close( true );     
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

  onClick( ){        
    this.cambiarClave();   
  }


}
