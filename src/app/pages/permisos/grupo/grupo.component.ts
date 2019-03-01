import { Component, OnInit, Inject, Input } from '@angular/core';
import { Grupo } from 'src/app/models/model.index';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styles: []
})
export class GrupoComponent implements OnInit {  
  
  constructor(  public dialogRef: MatDialogRef<GrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Grupo  ) {  }

  ngOnInit() {        
    
  }   

  onNoClick(): void {
    this.dialogRef.close();
  }  

  onClick( ){        
    this.dialogRef.close( this.data );
  }

}
