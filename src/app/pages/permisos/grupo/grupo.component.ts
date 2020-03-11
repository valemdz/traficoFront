import { Component, OnInit, Inject, Input } from '@angular/core';
import { Grupo, Empresa } from 'src/app/models/model.index';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styles: []
})
export class GrupoComponent implements OnInit { 
  
  grupo: Grupo; 
  empresas: Empresa[]=[];
  formGrupo: FormGroup;
  
  constructor(  public dialogRef: MatDialogRef<GrupoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FormBuilder  ) { 
        this.createForm();            
  }

  createForm(){
      this.formGrupo = this.fb.group(
        {
          groupName:[ null, [Validators.required]],
          empresa:[null,[Validators.required]]
        }
      );
  }  

  ngOnInit() {

      this.empresas =  this.data.empresas;
      this.grupo = this.data.grupo;

      const empresaGrupo = this.empresas.find( emp => 
                                                    emp.empCodigo === this.grupo.empresa);
    
      this.formGrupo.reset({
        groupName: this.grupo.groupName,
        empresa: empresaGrupo
      });
  }     

  onClick( ){    
    
    if( this.formGrupo.valid ){

      const form = this.formGrupo.getRawValue();      
      this.grupo.groupName = form.groupName;
      this.grupo.empresa = form.empresa.empCodigo;      

      this.dialogRef.close( this.grupo );
    } 
    
  }

}
